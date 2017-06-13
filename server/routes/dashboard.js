'use strict';
const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers').Dashboard;


router.route('/rating')
  .get(DashboardController.getRating)
  ;

router.route('/profileInfo')
  .get(DashboardController.getProfileInfo)
  ;

 router.route('/student')
  .get(DashboardController.getStudent)


module.exports = router; 