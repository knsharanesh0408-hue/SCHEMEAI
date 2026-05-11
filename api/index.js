import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
const { Client } = pkg;
import fs from 'fs';

dotenv.config({ path: '.env.local' });

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database Initialization Check
async function ensureDbInitialized() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.warn('DATABASE_URL not set, skipping auto-init');
    return;
  }

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    // Check if a core table exists
    const res = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      );
    `);

    if (!res.rows[0].exists) {
      console.log('Database not initialized. Running init.sql...');
      const sqlPath = path.join(__dirname, '..', 'sql', 'init.sql');
      const sql = fs.readFileSync(sqlPath, 'utf8');
      await client.query(sql);
      console.log('Database initialized successfully.');
    }
  } catch (err) {
    console.error('Database initialization error:', err);
  } finally {
    await client.end();
  }
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Import other routes dynamically
import eligibilityRouter from './routes/eligibility.js';
import grievanceRouter from './routes/grievance.js';
import whatsappRouter from './routes/whatsapp.js';
import cronRouter from './routes/cron.js';
import statusRouter from './routes/status.js';

app.use('/api/eligibility', eligibilityRouter);
app.use('/api/grievance', grievanceRouter);
app.use('/api/whatsapp', whatsappRouter);
app.use('/api/cron', cronRouter);
app.use('/api/status', statusRouter);

// Export for Vercel
export default app;

// Local development server
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  ensureDbInitialized().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
}
