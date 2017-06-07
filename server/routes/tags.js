'use strict';
const express = require('express');
const router = express.Router();
const TagsController = require('../controllers').Tags;

router.route('/')
  .get(TagsController.getAll)
  ;

router.route('/:profileId')
  .get(TagsController.getAllTagsbyProfile)
  ;

module.exports = router;