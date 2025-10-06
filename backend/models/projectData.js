
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  projectDescription: { type: String, required: true },
  estimatedAmount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'completed'],
    default: 'open'
  },
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }, // 👈 make this optional
}, { timestamps: true });

const Project = mongoose.model('projects', projectSchema);
module.exports = Project;
