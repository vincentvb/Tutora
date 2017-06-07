'use strict';
const express = require('express');
const router = express.Router();
const TagsController = require('../controllers').Tags;

router.route('/')
  .get(TagsController.getAll)
  ;

router.route('/profile/:profileId')
  .get(TagsController.getAllTagsbyProfile)
  ;

router.route('/question/:questionId')
  .get(TagsController.getAllTagsbyQ)
  ;

module.exports = router;