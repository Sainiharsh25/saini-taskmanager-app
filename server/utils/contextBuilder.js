const Task = require('../models/Task');
const User = require('../models/User');

async function buildContext(userId, role) {
  const now = new Date();

  let tasks = [];
  let teamInfo = '';

  try {
    tasks = await Task.find().sort({ createdAt: -1 }).limit(20);
  } catch (e) {
    console.log('Task fetch error:', e.message);
  }

  try {
    if (role === 'Admin') {
      const members = await User.find({}).select('name role').lean();
      teamInfo = `\nTEAM MEMBERS: ${members.map(m => `${m.name} (${m.role})`).join(', ')}`;
    }
  } catch (e) {
    console.log('User fetch error:', e.message);
  }

  const overdue = tasks.filter(t => t.deadline && t.deadline < now);

  return `
TODAY: ${now.toDateString()}

TASKS (${tasks.length} total, ${overdue.length} overdue):
${tasks.map(t =>
  `- [${t.priority ?? 'no priority'}] "${t.title}" | due: ${t.deadline?.toDateString() ?? 'no date'} | status: ${t.status}`
).join('\n') || 'No tasks found'}
${teamInfo}
  `.trim();
}

module.exports = { buildContext };