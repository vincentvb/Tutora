'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Profiles;

router.route('/')
  .get(ProfileController.getAll)
  // .post(ProfileController.create)
  ;

router.route('/:id')
  .get(ProfileController.getOne)
  .put(ProfileController.update)

  // .delete(ProfileController.deleteOne)
  ;

router.route('/updateProfile')
  .post(ProfileController.update)

router.route('/update/:id')
	.put(ProfileController.updateProfile)

module.exports = router;
