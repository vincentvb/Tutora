'use strict';
const express = require('express');
const router = express.Router();
const axios = require('axios');

var payService = undefined;

if (process.env.DOCKER) {
	payService = 'http://payments:1337/api';
} else {
	payService = 'http://localhost:1337/api';
}

router.route('/')
  .get(
  	function (req, res) {
	  	axios.get(payService + '/')
	  		.then((response) => {
	  			console.log('A GET on web for /api/payments');
	  			res.status(200).send(response.data)
	  		})
	  		.catch((error) => {
	  			console.log(error);
	  			res.sendStatus(404)
	  		})
  	}
	)
	.post(
		function (req, res) {
			axios.post(payService + '/', {
				amount: req.body.amount,
				source: req.body.token.id,
				userID: req.body.userID
			})
				.then((response) => {
					console.log('A POST on web for /api/payments');
					res.status(201);
				})
				.catch((error) => {
					console.log('Error with posting payment to payment microservice: ', error);
					res.sendStatus(404).send(error);
				})
		}
	)

router.route('/:userID')
	.get(
		function (req, res) {
	  	axios.get(payService + '/' + req.params.userID)
	  		.then((response) => {
	  			console.log('A GET for user on web for /api/payments', req.params.userID);
	  			res.status(200).send(response.data)
	  		})
	  		.catch((error) => {
	  			console.log(error);
	  			res.sendStatus(404)
	  		})
		}
	)

module.exports = router;
