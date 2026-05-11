import express from 'express';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/generate', async (req, res) => {
  const { name, issue, target_authority, language } = req.body;

  try {
    const prompt = `
      Write a formal grievance letter for a government scheme issue.
      Applicant Name: ${name}
      Issue: ${issue}
      Target Authority: ${target_authority}
      Language: ${language || 'English'}

      The letter should be professional, include a subject line, body detailing the issue, and a request for resolution.
      If the language is not English, translate it accordingly.
      Return the result as a JSON object: {"letter": "..."}
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' }
    });

    res.json({ success: true, letter: JSON.parse(response.choices[0].message.content).letter });
  } catch (error) {
    console.error('Grievance Assistant Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
