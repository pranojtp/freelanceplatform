const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  proposal: { type: mongoose.Schema.Types.ObjectId, ref: 'proposals', required: true },
  totalAmount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'Paid',], 
    default: 'pending' 
  }
}, { timestamps: true });

const Proposal = mongoose.model('invoices', schema);
module.exports = Proposal;