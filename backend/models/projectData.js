const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  projectDescription: { type: String, required: true },
  estimatedAmount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',   // must match your User model name
    required: true
  }
},); 

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
