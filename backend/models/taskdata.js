const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "projects", required: true },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  kanbanStatus: { 
    type: String,
    enum: ["To Do", "In Progress", "Awaiting Review", "Done"],
    default: "To Do"
  },
  priority: { type: String },
  dueDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("tasks", taskSchema);
