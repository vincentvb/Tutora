const express = require('express');
const middleware = require('../middleware');
const models = require('../../db/Bookshelf.js');
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const router = express.Router();

router.route('/apiKey')
  .get((req, res) => {
    console.log(req.query);
    var ACCOUNT_SID = 'AC1c2aab71bacbf1f4c7bed20987f9fc3d';
    var API_KEY_SID = 'SKe413562b5713ff07fd06ec292a3bb37f';
    var API_KEY_SECRET = 'lwiKJToOsV3gx0O2XDfoaaBwUxcsdBvx';

    // Create an Access Token
    var accessToken = new AccessToken(
      ACCOUNT_SID,
      API_KEY_SID,
      API_KEY_SECRET
    );

    // Set the Identity of this token
    accessToken.identity = req.query.user;

    // Grant access to Video
    var grant = new VideoGrant();
    accessToken.addGrant(grant);

    // Serialize the token as a JWT
    var jwt = accessToken.toJwt();
    console.log(jwt);
    res.send(jwt);
    
  })

router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    res.render('index.ejs');
  });

router.route('/login')
  .get((req, res) => {
    res.render('landingPage.ejs', { message: req.flash('incorrect') });
  })
  .post(middleware.passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/landingPage',
    failureFlash: true
  }));

router.route('/landingPage')
  .get((req, res) => {
    res.render('landingPage.ejs')
  })
  .post(middleware.passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/landingPage',
    failureFlash: true
  }));

  router.route('/redirectsignup')
    .get((req, res) => {
      console.log("IN HERE");
      res.redirect('/')
    });

router.route('/signup2')
  .get((req, res) => {
    res.render('signup2.ejs')
  })
  .post(middleware.auth.update, (req, res) => {
    res.redirect('/')
  });

router.route('/getuserinfo')
  .get(middleware.auth.verify, (req, res) => {
    res.send(JSON.stringify(req.user))
  });

router.get('/getConnectionInfo', (req, res) => {
  console.log(req.query.id)
  models.getUser(req.query.id, res);
})

router.route('/profile')
  .get(middleware.auth.verify, (req, res) => {
    console.log(req.user);
    res.render('profile.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

router.route('/edit')
  .get(middleware.auth.verify, (req, res) => {
      res.render('edit.ejs', {
      user: req.user
    });
  });


router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

router.get('/auth/google', middleware.passport.authenticate('google', {
  scope: ['email', 'profile']
}));

router.get('/auth/google/callback', middleware.passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/landingPage'
}));

router.get('/auth/facebook', middleware.passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback', middleware.passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/landingPage',
  failureFlash: true
}));

router.get('/register/google', middleware.passport.authenticate('google', {
  scope: ['email', 'profile']
}));

router.get('/register/google/callback', middleware.passport.authenticate('google', {
  successRedirect: '/signup2',
  failureRedirect: '/landingPage'
}));

router.get('/register/facebook', middleware.passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/register/facebook/callback', middleware.passport.authenticate('facebook', {
  successRedirect: '/signup2',
  failureRedirect: '/landingPage',
  failureFlash: true
}));

router.get('*', middleware.auth.verify, (req, res) => {
    res.render('index.ejs');
  });


module.exports = router;
