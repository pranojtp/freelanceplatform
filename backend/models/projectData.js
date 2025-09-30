const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  projectDescription: { type: String, required: true },
  estimatedAmount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',   // must match your User model name
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'completed'],
    default: 'open'
  }
},);

const Project = mongoose.model('projects', projectSchema);
module.exports = Project;
