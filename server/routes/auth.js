const express = require('express');
const middleware = require('../middleware');

const router = express.Router();

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
    successRedirect: '/profile',
    failureRedirect: '/landingPage',
    failureFlash: true
  }));


router.route('/profile')
  .get(middleware.auth.verify, (req, res) => {
    res.render('profile.ejs', {
      user: req.user // get the user out of session and pass to template
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

router.route(unless('/api/*'), '*')
  .get(middleware.auth.verify, (req, res) => {
    res.render('index.ejs');
  });

function unless(path, middleware) {
  return function(req, res, next) {
    if (path === req.path) {
        return next();
    } else {
        return middleware(req, res, next);
    }
  };
}

module.exports = router;

