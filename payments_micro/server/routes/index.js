const express = require('express');
const router = express.Router();

router.route('/')
	.get((req, res) => {
		res.status(200);
	})
	.post((req, res) => {
		res.sendStatus(201);
	})

module.exports = router;