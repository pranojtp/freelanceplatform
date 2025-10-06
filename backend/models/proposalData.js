
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'projects', required: true },
  proposedSolution: { type: String, required: true },
  proposalAmount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected'], 
    default: 'pending' 
  }
}, { timestamps: true });

const Proposal = mongoose.model('proposals', schema);
module.exports = Proposal;
