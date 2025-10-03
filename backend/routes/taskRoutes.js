const express = require('express');
const router = express.Router();
const Task = require('../models/taskData');
const Project = require('../models/projectData');
const verifyToken = require('../middleware/verifyToken');

const VALID_STATUSES = ['To Do','In Progress','Awaiting Review','Done'];

// Middleware: ensure user is assigned freelancer of the project
const verifyProjectAssignment = async (req, res, next) => {
  try {
    const projectId = req.body.projectId || req.params.projectId || 
      (req.params.taskId && (await Task.findById(req.params.taskId)).projectId);
    if (!projectId) return res.status(400).json({ message: 'Project ID required' });

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (!project.freelancer || project.freelancer.toString() !== req.userId) {
      return res.status(403).json({ message: 'Forbidden: you are not assigned to this project' });
    }

    req.project = project;
    next();
  } catch (err) {
    console.error('verifyProjectAssignment error:', err);
    res.status(500).json({ message: 'Authorization failed', error: err.message });
  }
};

// Create Task
router.post('/add', verifyToken, verifyProjectAssignment, async (req, res) => {
  try {
    if (req.role !== 'freelancer') return res.status(403).json({ message: 'Only freelancers can add tasks' });

    const { projectId, title, description, kanbanStatus, priority, dueDate } = req.body;
    if (!title || !projectId) return res.status(400).json({ message: 'projectId and title required' });

    const status = VALID_STATUSES.includes(kanbanStatus) ? kanbanStatus : 'To Do';

    const newTask = new Task({
      projectId,
      freelancerId: req.userId,
      title,
      description: description || '',
      kanbanStatus: status,
      priority: priority || 'medium',
      dueDate: dueDate || null
    });

    const saved = await newTask.save();
    res.status(201).json({ message: 'Task added', task: saved });
  } catch (err) {
    console.error('Failed to create task:', err);
    res.status(500).json({ message: 'Failed to create task', error: err.message });
  }
});

// Get tasks grouped by status
router.get('/:projectId', verifyToken, verifyProjectAssignment, async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId }).sort({ createdAt: 1 });

    const grouped = {};
    VALID_STATUSES.forEach(s => grouped[s] = tasks.filter(t => t.kanbanStatus === s));

    res.status(200).json(grouped);
  } catch (err) {
    console.error('Failed to fetch tasks:', err);
    res.status(500).json({ message: 'Failed to fetch tasks', error: err.message });
  }
});

// Update task status
router.patch('/update-status/:taskId', verifyToken, async (req, res) => {
  try {
    const { kanbanStatus } = req.body;
    if (!VALID_STATUSES.includes(kanbanStatus)) return res.status(400).json({ message: 'Invalid status' });

    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const project = await Project.findById(task.projectId);
    if (!project || project.freelancer.toString() !== req.userId) {
      return res.status(403).json({ message: 'Forbidden: you cannot update this task' });
    }

    task.kanbanStatus = kanbanStatus;
    await task.save();
    res.status(200).json({ message: 'Task updated', task });
  } catch (err) {
    console.error('Failed to update task status:', err);
    res.status(500).json({ message: 'Failed to update task', error: err.message });
  }
});

module.exports = router;
