const express = require("express");
const router = express.Router();
const Task = require("../models/taskdata");
const Project = require("../models/projectData");
const verifyToken = require("../middleware/verifyToken");

const VALID_STATUSES = ["To Do", "In Progress", "Awaiting Review", "Done"];

// Middleware: verify freelancer owns the project
// improved verifyFreelancerOwnership
const verifyFreelancerOwnership = async (req, res, next) => {
  try {
    const projectId = req.body.projectId || req.params.projectId;
    if (!projectId) return res.status(400).json({ message: "Project ID required" });

    // use .lean() to get plain object for safer logging
    const project = await Project.findById(projectId).lean();
    if (!project) return res.status(404).json({ message: "Project not found" });

    // debug log - remove or lower log level in production
    console.log('verifyFreelancerOwnership -> projectId:', projectId);
    console.log('project doc (excerpt):', {
      _id: project._id,
      freelancer: project.freelancer,
      freelancerId: project.freelancerId, // in case schema uses this
      client: project.client
    });
    console.log('req.userId, req.role:', req.userId, req.role);

    // handle multiple possible field names for freelancer
    const freelancerField = project.freelancer ? project.freelancer :
                            project.freelancerId ? project.freelancerId : null;

    if (!freelancerField) {
      return res.status(400).json({ message: "Project has no assigned freelancer" });
    }

    if (freelancerField.toString() !== req.userId) {
      return res.status(403).json({ message: "You are not assigned to this project" });
    }

    req.project = project;
    next();
  } catch (err) {
    console.error("verifyFreelancerOwnership error:", err);
    // res.status(500).json({ message: "Authorization failed", error: err.message });
  }
};

// ==========================
// Route 1: Add a new task
// ==========================
router.post("/add", verifyToken, verifyFreelancerOwnership, async (req, res) => {
  try {
    console.log('POST /tasks/add body:', req.body, 'user:', req.userId, 'role:', req.role);

    if (req.role !== "freelancer")
      return res.status(403).json({ message: "Only freelancers can add tasks" });

    const { projectId, title, description, priority, dueDate } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const task = new Task({
      projectId,
      freelancerId: req.userId,
      title,
      description: description || "",
      kanbanStatus: "To Do",
      priority: priority || "Medium",
      dueDate: dueDate || null,
    });

    const savedTask = await task.save();
    console.log('Task saved:', savedTask._id);
    res.status(201).json({ message: "Task added successfully", task: savedTask });
  } catch (err) {
    console.error("Add task error:", err);
    res.status(500).json({ message: "Failed to add task", error: err.message });
  }
});


// ==========================
// Route 2: Get all tasks for a project
// ==========================
router.get("/:projectId", verifyToken, verifyFreelancerOwnership, async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId }).sort({ createdAt: 1 });
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Fetch tasks error:", err);
    res.status(500).json({ message: "Failed to fetch tasks", error: err.message });
  }
});

// ==========================
// Route 3: Update task Kanban status
// ==========================
router.patch("/update-status/:taskId", verifyToken, async (req, res) => {
  try {
    const { kanbanStatus } = req.body;

    if (!VALID_STATUSES.includes(kanbanStatus))
      return res.status(400).json({ message: "Invalid Kanban status" });

    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Ensure freelancer owns this task
    if (task.freelancerId.toString() !== req.userId)
      return res.status(403).json({ message: "Not authorized to update this task" });

    task.kanbanStatus = kanbanStatus;
    await task.save();

    res.status(200).json({ message: "Task status updated", task });
  } catch (err) {
    console.error("Update task status error:", err);
    res.status(500).json({ message: "Failed to update task", error: err.message });
  }
});

module.exports = router;
