const express = require('express');
const router = express.Router();
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY'); // Replace with your Stripe secret key
const Invoice = require('../models/invoiceData');
const verifyToken = require('../middleware/verifyToken');

// Create Stripe checkout session
router.post('/create-checkout-session/:invoiceId', verifyToken, async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.invoiceId);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Invoice #${invoice._id.slice(-5)}`,
            },
            unit_amount: Math.round(invoice.totalAmount * 100), // Stripe amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/payment-success/${invoice._id}`,
      cancel_url: `http://localhost:3000/payment-cancelled`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create payment session', error: err.message });
  }
});

router.post('/payment-success/:invoiceId', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.invoiceId);
    if (!invoice) return res.status(404).send('Invoice not found');

    invoice.status = 'Paid';
    await invoice.save();

    res.send('Invoice marked as Paid');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to update invoice');
  }
});


module.exports = router;
