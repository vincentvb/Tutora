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
  ;

module.exports = router;
