import express from 'express';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Mock Data for API Setu
const MOCK_SCHEMES = [
  {
    id: '1',
    title: 'PM-Kisan Samman Nidhi',
    description: 'Income support to all landholding farmers families.',
    category: 'Farmers',
    state: 'Central',
    eligibility_criteria: { land: true, occupation: 'farming' }
  },
  {
    id: '2',
    title: 'Post-Matric Scholarship',
    description: 'Financial assistance to SC/ST students for higher education.',
    category: 'Students',
    state: 'Central',
    eligibility_criteria: { caste: ['SC', 'ST'], age_min: 17 }
  },
  {
    id: '3',
    title: 'Tamil Nadu Old Age Pension',
    description: 'Monthly pension for senior citizens in Tamil Nadu.',
    category: 'Senior Citizens',
    state: 'Tamil Nadu',
    eligibility_criteria: { state: 'Tamil Nadu', age_min: 60 }
  }
];

router.post('/', async (req, res) => {
  const { name, age, income, state, caste, occupation, disability_status } = req.body;

  try {
    // 1. Fetch relevant schemes (using mock data here, can be replaced with real API call)
    // 2. Filter by state and basic criteria
    const filteredSchemes = MOCK_SCHEMES.filter(s => 
      s.state === 'Central' || s.state.toLowerCase() === state.toLowerCase()
    );

    // 3. Analyze eligibility using GPT-4
    const prompt = `
      User Profile:
      Name: ${name}
      Age: ${age}
      Income: ${income}
      State: ${state}
      Caste: ${caste}
      Occupation: ${occupation}
      Disability Status: ${disability_status ? 'Yes' : 'No'}

      Analyze the following schemes and determine eligibility for each. 
      Return only a JSON array of objects with keys: "scheme_id", "is_eligible" (boolean), "reason" (brief string explanation).

      Schemes:
      ${JSON.stringify(filteredSchemes.map(s => ({ id: s.id, title: s.title, description: s.description })))}
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' }
    });

    const analysis = JSON.parse(response.choices[0].message.content).schemes || [];

    const results = filteredSchemes.map(scheme => {
      const match = analysis.find(a => a.scheme_id === scheme.id);
      return {
        ...scheme,
        is_eligible: match ? match.is_eligible : false,
        reason: match ? match.reason : 'Unable to determine eligibility'
      };
    });

    res.json({ success: true, schemes: results });
  } catch (error) {
    console.error('Eligibility Engine Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
