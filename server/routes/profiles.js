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
  .put(ProfileController.updateProfile)

  // .delete(ProfileController.deleteOne)
  ;

router.route('/updateProfile')
  .post(ProfileController.updateProfile)

// router.route('/update/:id')
// 	.put(ProfileController.updateProfileById)

router.route('/updatePicture/:id')
  .put(ProfileController.updatePicture)

module.exports = router;
