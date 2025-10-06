
const express = require('express');
const router = express.Router();
const Project = require('../models/projectData');
const verifyToken = require('../middleware/verifyToken');

// 📌 Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const data = await Project.find().populate('client', 'username email');
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Data not found");
  }
});

// 📌 Get projects created by logged-in client
router.get('/my-projects', verifyToken, async (req, res) => {
  try {
    if (req.role !== 'client') {
      return res.status(403).json({ message: 'Only clients can view their projects' });
    }

    const projects = await Project.find({ client: req.userId })
      .sort({ createdAt: -1 })
      .populate('client', 'username email');

    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
  }
});

// 📌 Add project (clients only)
router.post('/add', verifyToken, async (req, res) => {
  try {
    if (req.role !== 'client') {
      return res.status(403).json({ message: 'Only clients can add projects' });
    }

    const { projectName, projectDescription, estimatedAmount, dueDate } = req.body;

    const project = new Project({
      projectName,
      projectDescription,
      estimatedAmount: Number(estimatedAmount) || undefined,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      client: req.userId  // 👈 take clientId from token, not frontend
    });

    const saved = await project.save();
    await saved.populate('client', 'username email');

    res.status(201).json({ message: 'Project added successfully', project: saved });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Validation error", details: error.message });
    }
    res.status(500).json({ message: 'Failed to add project', error: error.message });
  }
});

// 📌 Delete project (only owner client can delete)
router.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    if (req.role !== 'client') {
      return res.status(403).json({ message: 'Only clients can delete projects' });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.client.toString() !== req.userId) {
      return res.status(403).json({ message: "You can only delete your own projects" });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Project removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove the project", error: err.message });
  }
});

module.exports = router;
