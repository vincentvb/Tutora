const Balances = require('../../db/models/payments.js');
const Promise = require("bluebird");

module.exports.getAll = (req, res) => {
	return Balances.where({}).fetchAll()
	.then(payments => {
		console.log('Returning all payments.');
		res.status(200).send(payments);
	})
	.error((error) => {
		console.log(error);
		res.sendStatus(500);
	})
};

module.exports.transferPayment = (req, res) => {
  let options = {
    amount: req.body.amount,
    currency: 'usd',
    source: req.body.token.id
  };

  return stripeCharge(options)
  .then(() => {
  	Balances.where({user_id: req.body.userID}).fetch()
  })
  .then((paymentRecord) => {
  	paymentRecord.save({
  		funds: funds += req.body.amount
  	}, {method : 'update'})
  })
  .then(() => {
  	res.status(201)
  })
  .error((error) => {
  	console.log('there was an error with transfering money ', error);
  	res.sendStatus(500);
  })
};

module.exports.getBalance = (req, res) => {
	Balances.where({user_id: req.params.userID}).fetch()
	.then((paymentData) => {
		res.status(200).send(paymentData.funds);
	})
	.error((error) => {
		console.log(error)
		res.sendStatus(500);
	})
};

module.exports.newUser = (req, res) => {
	return Balances.forge({
		user_id: req.params.userID,
		funds: 0
	}).save()
	.then(result => {
		console.log('new user added to payments service with the user id: ', req.params.userID, ' the result was: ', result);
		res.status(200).send(result)
	})
	.error((error) => {
		console.log(error);
		res.status(500).send(err);
	})
};

// Helper functions
const stripeCharge = function(options) {
	return new Promise(function(resolve, reject) {
		stripe.charges.create(options, function(err, result) {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};
