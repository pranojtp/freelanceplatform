// routes/taskRoutes.js

const express = require('express');
const router = express.Router();
// Assuming Task model is in '../models/taskData'
const Task = require('../models/taskdata'); 
const Proposal = require('../models/proposalData'); 
const verifyToken = require('../middleware/verifyToken'); // Your provided middleware

// ----------------------------------------------------------------------
// Custom Middleware to Check Freelancer Ownership of a Project
// ----------------------------------------------------------------------
const verifyFreelancerOwnership = async (req, res, next) => {
    // 1. Determine the projectId. It can come from the URL param or the request body.
    let projectId = req.params.projectId;

    // If projectId is missing (e.g., from a PATCH/DELETE task route), try to get it from the Task itself
    if (!projectId && req.params.taskId) {
        try {
            const task = await Task.findById(req.params.taskId);
            if (!task) {
                return res.status(404).json({ message: 'Task not found for authorization check.' });
            }
            projectId = task.projectId;
        } catch (error) {
            return res.status(500).json({ message: 'Error finding task for ownership check.' });
        }
    }
    
    if (!projectId) {
        return res.status(400).json({ message: 'Project ID is required for task management.' });
    }

    // 2. Look up the accepted proposal to find the assigned freelancer
    try {
        const proposal = await Proposal.findOne({ 
            project: projectId, 
            status: 'accepted' 
        });

        if (!proposal) {
            return res.status(404).json({ message: 'No accepted proposal found for this project.' });
        }

        // 3. Compare the assigned freelancer ID with the ID from the token
        if (proposal.freelancer.toString() !== req.userId) {
            return res.status(403).json({ message: 'Forbidden: You are not the assigned freelancer for this project.' });
        }

        next(); // Authorization successful
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Authorization check failed during database lookup.', error: err.message });
    }
};

// ----------------------------------------------------------------------
// Kanban Task Routes
// ----------------------------------------------------------------------

// 📌 GET all tasks for a specific project (The Kanban Board view)
// Route: /api/tasks/:projectId
router.get('/:projectId', verifyToken, verifyFreelancerOwnership, async (req, res) => {
    try {
        const tasks = await Task.find({ projectId: req.params.projectId }).sort({ createdAt: 1 });
        
        // Group tasks by status for easy frontend rendering
        const kanbanData = {
            'To Do': tasks.filter(t => t.kanbanStatus === 'To Do'),
            'In Progress': tasks.filter(t => t.kanbanStatus === 'In Progress'),
            'Awaiting Review': tasks.filter(t => t.kanbanStatus === 'Awaiting Review'),
            'Done': tasks.filter(t => t.kanbanStatus === 'Done'),
        };
        
        res.status(200).json(kanbanData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch tasks', error: err.message });
    }
});

// 📌 CREATE a new task (Freelancer only)
// Route: /api/tasks/add
router.post('/add', verifyToken, verifyFreelancerOwnership, async (req, res) => {
    try {
        if (req.role !== 'freelancer') {
            return res.status(403).json({ message: 'Only freelancers can create tasks.' });
        }
        
        const { projectId, title, description, kanbanStatus, priority, dueDate } = req.body;

        const newTask = new Task({
            projectId,
            freelancerId: req.userId,
            title,
            description,
            kanbanStatus: kanbanStatus || 'To Do',
            priority,
            dueDate
        });

        const savedTask = await newTask.save();
        res.status(201).json({ message: 'Task added successfully', task: savedTask });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create task', error: err.message });
    }
});


// 📌 UPDATE task status (For drag-and-drop on Kanban)
// Route: /api/tasks/update-status/:taskId
router.patch('/update-status/:taskId', verifyToken, verifyFreelancerOwnership, async (req, res) => {
    try {
        if (req.role !== 'freelancer') {
            return res.status(403).json({ message: 'Only freelancers can update task status.' });
        }

        const { kanbanStatus } = req.body;

        if (!['To Do', 'In Progress', 'Awaiting Review', 'Done'].includes(kanbanStatus)) {
            return res.status(400).json({ message: 'Invalid kanbanStatus value' });
        }
        
        // verifyFreelancerOwnership ensures only the assigned freelancer can update this task
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.taskId, 
            { kanbanStatus }, 
            { new: true, runValidators: true }
        );
        
        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
            
        res.status(200).json({ message: 'Task status updated successfully', task: updatedTask });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update task status', error: err.message });
    }
});

module.exports = router;