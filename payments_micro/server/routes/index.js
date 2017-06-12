const express = require('express');
const router = express.Router();
const PaymentController = require('../middleware/index.js');
const stripe = require("stripe")(require('../../config/stripe.json')['secretKey']);

router.route('/')
	.get(PaymentController.getAll)
	.post(PaymentController.transferPayment)

router.route('/:userID')
	.get(PaymentController.getBalance)
	.post(PaymentController.newUser)

module.exports = router;