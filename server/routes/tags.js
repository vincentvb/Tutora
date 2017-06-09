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

router.route('/taglets')
  .get(TagsController.getAllTaglets)
  ;

router.route('/taglets/:tagId')
  .get(TagsController.getAllTagletsByTag)
  ;

module.exports = router;