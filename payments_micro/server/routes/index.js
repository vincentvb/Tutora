const express = require('express');
const router = express.Router();
const stripe = require("stripe")(require('../../config/stripe.json')['secretKey']);

router.route('/')
	.get((req, res) => {
		res.status(200);
	})
	.post((req, res) => {
	  let options = {
	    amount: req.body.amount,
	    currency: 'usd',
	    source: req.body.token.id
	  };
		stripeCharge(options, (err, result) => {
		  if (err) {
		    console.log('err: ', err);
		    res.send(err);
		  } else {
		    console.log('result: ', result);
		    res.send(result);
		  }
		});  
	})

module.exports = router;

const stripeCharge = (options, callback) => {
  stripe.charges.create(options, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};