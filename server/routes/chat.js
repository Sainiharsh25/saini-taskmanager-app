const express = require('express');
const Groq = require('groq-sdk');
const { buildContext } = require('../utils/contextBuilder');

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/', async (req, res) => {
  try {
    const { message, history = [], userId, role } = req.body;

    const context = await buildContext(userId, role);

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',      messages: [
        {
          role: 'system',
          content: `You are a helpful project assistant for TaskFlow.
Answer questions about tasks, deadlines, and projects.
Only use the data below. Be concise. Use bullet points for lists.
If something is not in the data, say you don't have that info.

${context}`
        },
        ...history.slice(-6),
        { role: 'user', content: message }
      ],
    });

    res.json({ reply: response.choices[0].message.content });

  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;