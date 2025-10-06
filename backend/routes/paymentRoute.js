const express = require('express');
const router = express.Router();
// 💡 Import Razorpay instead of Stripe
const Razorpay = require('razorpay');
const crypto = require('crypto'); // Needed for signature verification

const Invoice = require('../models/invoiceData');
const verifyToken = require('../middleware/verifyToken');

// 💡 Instantiate Razorpay
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,        // Use environment variables for security
    key_secret: process.env.RAZORPAY_KEY_SECRET, // Your Key Secret
});

// ---------------------------------------------------------------------
// 1. Create Razorpay Order API (Replaces Stripe Checkout Session)
// ---------------------------------------------------------------------
router.post('/create-order/:invoiceId', verifyToken, async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.invoiceId);
        if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

        // Razorpay expects the amount in the smallest currency unit (e.g., paise for INR)
        const amountInPaise = Math.round(invoice.totalAmount * 100);

        const options = {
            amount: amountInPaise,
            currency: 'INR', // 💡 Change to your desired currency, e.g., 'USD' or 'INR'
            receipt: `receipt_${invoice._id.toString()}`,
            notes: {
                invoice_id: invoice._id.toString(),
                user_id: req.user.userId, // Assuming verifyToken adds user data to req
            }
        };

        const order = await razorpayInstance.orders.create(options);

        // Send the order details to the frontend to initiate the payment
        res.status(200).json({
            success: true,
            orderId: order.id,
            currency: order.currency,
            amount: order.amount, // Amount in paise
            key: process.env.RAZORPAY_KEY_ID // Send public key to frontend
        });

    } catch (err) {
        console.error("Error creating Razorpay order:", err);
        res.status(500).json({ message: 'Failed to create payment order', error: err.message });
    }
});

// ---------------------------------------------------------------------
// 2. Verify Payment Signature and Update Invoice Status (New Endpoint)
// ---------------------------------------------------------------------
// This endpoint is called by the frontend's Razorpay handler function
router.post('/verify-payment', async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        invoiceId // We expect the frontend to pass the invoice ID back
    } = req.body;

    // 1. Generate the expected signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest('hex');

    // 2. Compare the generated signature with the one received from Razorpay
    if (expectedSignature === razorpay_signature) {
        try {
            // Signature is valid, now update the invoice status
            const invoice = await Invoice.findById(invoiceId);
            if (!invoice) return res.status(404).json({ success: false, message: 'Invoice not found' });

            invoice.status = 'Paid';
            // You can also save the razorpay_payment_id for your records
            invoice.paymentId = razorpay_payment_id; 
            await invoice.save();

            // Send success response to the frontend
            return res.status(200).json({ success: true, message: 'Payment verified and invoice updated.' });

        } catch (err) {
            console.error("Error updating invoice status:", err);
            return res.status(500).json({ success: false, message: 'Payment verified, but failed to update invoice status.' });
        }
    } else {
        // Signature mismatch indicates a potentially tampered request
        return res.status(400).json({ success: false, message: 'Payment verification failed: Invalid Signature.' });
    }
});


module.exports = router;