import express from 'express';
import twilio from 'twilio';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: '.env.local' });

const router = express.Router();
const { MessagingResponse } = twilio.twiml;

router.post('/', async (req, res) => {
  const { Body, From } = req.body;
  const twiml = new MessagingResponse();

  try {
    // 1. Identify user by From (phone number)
    // 2. Fetch profile from Supabase
    // 3. If "Hi" or "Eligible", return matching schemes
    // 4. Use Bhashini API for translations if needed (mocked here)

    let responseMessage = "";
    if (Body.toLowerCase().includes('hi')) {
       responseMessage = "Namaste! Welcome to SchemeAI. Send 'eligible' to see schemes matching your profile.";
    } else if (Body.toLowerCase().includes('eligible')) {
       responseMessage = "Checking your eligibility... \n1. PM-Kisan (Eligible)\n2. TN Old Age Pension (Eligible)\nReply with scheme number for details.";
    } else {
       responseMessage = "Sorry, I didn't quite get that. Try 'Hi' or 'Eligible'.";
    }

    twiml.message(responseMessage);
    res.type('text/xml').send(twiml.toString());
  } catch (error) {
    console.error('WhatsApp Bot Error:', error);
    twiml.message("Sorry, I'm having some trouble processing your request.");
    res.type('text/xml').send(twiml.toString());
  }
});

export default router;
