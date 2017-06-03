const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient();
const models = require('../../db/models');

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/landingPage');
};

module.exports.update = (req, res, done) => {
  return models.Profile.where({ email: req.user.email }).fetch()
  .then(profile => {
     profile.save({type: req.body.type}, {method: 'update'});
  })
  .error(err => {
    console.error(err)
  })
};

module.exports.session = session({
  store: new RedisStore({
    client: redisClient,
    host: 'localhost',
    port: 6379
  }),
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false
});
