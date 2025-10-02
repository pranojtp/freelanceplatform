const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoiceData');
const Proposal = require('../models/proposalData');
const verifyToken = require('../middleware/verifyToken');

// 📌 Create Invoice (Freelancer only)
router.post('/create', verifyToken, async (req, res) => {
  try {
    const { proposalId, totalAmount, dueDate } = req.body;

    if (req.role !== 'freelancer') {
      return res.status(403).json({ message: 'Only freelancers can create invoices' });
    }

    const proposal = await Proposal.findById(proposalId);
    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    if (proposal.status !== 'accepted') {
      return res.status(400).json({ message: 'Invoice can only be created for accepted proposals' });
    }

    const invoice = new Invoice({
      freelancer: req.userId,
      client: proposal.client,
      proposal: proposal._id,
      totalAmount,
      dueDate,
    });

    await invoice.save();

    res.status(201).json({ message: 'Invoice created successfully', invoice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create invoice', error: err.message });
  }
});

// 📌 Get My Invoices (Freelancer)
router.get('/my-invoices', verifyToken, async (req, res) => {
  try {
    if (req.role !== 'freelancer') {
      return res.status(403).json({ message: 'Only freelancers can view their invoices' });
    }

    const invoices = await Invoice.find({ freelancer: req.userId })
      .populate('proposal', 'proposalAmount proposedSolution status')
      .populate('client', 'username email');

    res.status(200).json(invoices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch invoices', error: err.message });
  }
});

// 📌 Get invoices received by Client
router.get('/client-invoices', verifyToken, async (req, res) => {
  try {
    if (req.role !== 'client') {
      return res.status(403).json({ message: 'Only clients can view their invoices' });
    }

    const invoices = await Invoice.find({ client: req.userId })
      .populate('proposal', 'proposalAmount proposedSolution status')
      .populate('freelancer', 'username email');

    res.status(200).json(invoices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch client invoices', error: err.message });
  }
});

// 📌 Client marks invoice as Paid
router.put('/mark-paid/:id', verifyToken, async (req, res) => {
  try {
    if (req.role !== 'client') {
      return res.status(403).json({ message: 'Only clients can mark invoices as paid' });
    }

    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

    if (invoice.client.toString() !== req.userId) {
      return res.status(403).json({ message: 'You can only update your invoices' });
    }

    invoice.status = 'Paid';
    await invoice.save();

    res.status(200).json({ message: 'Invoice marked as Paid', invoice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update invoice', error: err.message });
  }
});


module.exports = router;
