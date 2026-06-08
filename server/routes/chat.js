const express = require('express');
const Groq = require('groq-sdk');
const { buildContext } = require('../utils/contextBuilder');
const authMiddleware = require('../middleware/auth');  // check your exact filename

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    const context = await buildContext(req.user.id, req.user.role);

    const response = await groq.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: [
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