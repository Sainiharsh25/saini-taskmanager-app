import Task from '../models/Task.js';
import Project from '../models/Project.js';
import User from '../models/User.js';

export async function buildContext(userId, role) {
  const now = new Date();

  const tasks = await Task.find({ assignedTo: userId, status: { $ne: 'done' } })
    .populate('project', 'name')
    .sort({ deadline: 1 })
    .limit(20);

  const projects = await Project.find({ members: userId })
    .select('name status deadline');

  let teamInfo = '';
  if (role === 'Admin') {
    const members = await User.find({}).select('name role').lean();
    teamInfo = `\nTEAM MEMBERS: ${members.map(m => `${m.name} (${m.role})`).join(', ')}`;
  }

  const overdue = tasks.filter(t => t.deadline && t.deadline < now);
  const upcoming = tasks.filter(t => t.deadline && t.deadline >= now);

  return `
TODAY: ${now.toDateString()}

OPEN TASKS (${tasks.length} total, ${overdue.length} overdue):
${tasks.map(t =>
  `- [${t.priority ?? 'no priority'}] "${t.title}" | project: ${t.project?.name ?? 'none'} | due: ${t.deadline?.toDateString() ?? 'no date'} | status: ${t.status}`
).join('\n')}

PROJECTS: ${projects.map(p => `${p.name} (${p.status})`).join(', ') || 'none'}
${teamInfo}
  `.trim();
}