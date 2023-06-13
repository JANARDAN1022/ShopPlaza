const express = require('express')
const {processPayment,StripeApiKey,getTotalAmount} = require('../Controllers/PaymentControllers');
const { authenticate } = require('../middlewares/Auth');

const router = express.Router();

router.route('/process/Stripe').post(authenticate,processPayment);
router.route('/stripeapikey').get(StripeApiKey);
router.route('/TotalAmount/:id').get(getTotalAmount);


module.exports = router;