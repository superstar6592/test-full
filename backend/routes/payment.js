const express = require('express');
const { createCheckoutSession } = require('../controllers/paymentControllers');

const router = express.Router();

router.post('/create-checkout-session', createCheckoutSession);
// router.get('/payment-status', getPaymentStatus);

module.exports = router;
