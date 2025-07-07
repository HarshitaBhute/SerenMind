const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');
const { Configuration, OpenAIApi } = require('openai');

// OpenAI config
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_KEY
}));

// Save Mood Entry
router.post('/', async (req, res) => {
  const { emoji, note, userId, date } = req.body;
  try {
    const mood = new Mood({ emoji, note, userId, date });
    await mood.save();
    res.status(200).json({ message: 'Mood saved', mood });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save mood' });
  }
});

// Generate Journaling Prompt using OpenAI
router.post('/prompt', async (req, res) => {
  const { mood } = req.body;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Suggest a journaling prompt for someone feeling ${mood}.`,
      max_tokens: 50,
    });
    res.json({ prompt: completion.data.choices[0].text.trim() });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate prompt' });
  }
});

module.exports = router;
