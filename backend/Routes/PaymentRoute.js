const express = require('express')
const {processPayment,StripeApiKey,FinalAmount} = require('../Controllers/PaymentControllers');
const { authenticate } = require('../middlewares/Auth');

const router = express.Router();

router.route('/process/Stripe').post(authenticate,processPayment);
router.route('/stripeapikey').get(StripeApiKey);
router.route('/FinalAmount/:id').get(FinalAmount);


module.exports = router;