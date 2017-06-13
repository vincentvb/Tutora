const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient({
  host: process.env.REDIS_HOST || '127.0.0.1'
});
const models = require('../../db/models');

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/landingPage');
};

module.exports.update = (req, res, done) => {
  console.log('fucking update')
  return models.Profile.where({ email: req.user.email }).fetch()
  .then(profile => {
     return profile.save({type: req.body.type}, {method: 'update'});
  })
  .then((res) => {
    console.log('Inside of res');
    done(null, res);
  })
  .error(err => {
    console.log(err)
    done(err, null);
  })
};

module.exports.session = session({
  store: new RedisStore({
    client: redisClient,
    host: process.env.REDIS_HOST || 'localhost',
    port: 6379
  }),
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false
});
