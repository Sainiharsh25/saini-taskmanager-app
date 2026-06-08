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
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are a helpful project assistant for TaskFlow, a team task management app.

ROLES IN THIS APP:
- Admin: manages the team, assigns tasks to Taskers and Team Members, monitors overall progress
- Team Member: works on assigned tasks, collaborates on projects
- Tasker: receives and completes assigned tasks

CURRENT USER ROLE: ${role || 'Admin'}

GUIDELINES:
- Give short, clear, actionable answers
- For Admin: focus on task assignments, team workload, overdue tasks, and project progress
- For Team Member / Tasker: focus on their own assigned tasks and deadlines
- If asked "what should I do", suggest role-appropriate actions
- Never dump raw data or list all team members unless specifically asked
- Never say "your role is not specified"
- Use a friendly, professional tone
- Format responses cleanly with bullet points only when listing multiple items

LIVE PROJECT DATA:
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