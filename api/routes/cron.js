import express from 'express';
import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const router = express.Router();

router.get('/check', async (req, res) => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return res.status(500).json({ error: 'Config error' });

  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

  try {
    await client.connect();
    // Daily check for schemes closing in < 15 days
    const result = await client.query(`
      SELECT title, closing_date, category 
      FROM schemes 
      WHERE closing_date BETWEEN NOW() AND NOW() + INTERVAL '15 days'
    `);

    // In production, sync this with a 'notifications' table or send SMS
    res.json({ success: true, expiring_schemes: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.end();
  }
});

export default router;
