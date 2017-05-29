'use strict';
const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers').Questions;

router.route('/')
  .get(QuestionController.getAll)
  .post(QuestionController.postQuestion)
  ;

router.route('/:id')
  .get(QuestionController.getOne)
  ;

module.exports = router;