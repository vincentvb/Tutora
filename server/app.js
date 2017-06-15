'use strict';
const express = require('express');
const path = require('path');
const Promise = require('bluebird');
const middleware = require('./middleware');
const routes = require('./routes');
const client = require('./redis.js')

const app = express();
const http = require('http');
const https = require('https');
const fs = require('fs');

var options = {
  key: fs.readFileSync('./server/client-key.pem'),
  cert: fs.readFileSync('./server/client-cert.pem')
};

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(middleware.bodyParser.json({limit: '50mb'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', routes.api);
app.use('/api/tags', routes.tags);
app.use('/api/profiles', routes.profiles);
app.use('/api/questions', routes.questions);
app.use('/api/payments', routes.payments);
app.use('/api/dashboard', routes.dashboard);

app.use('/', routes.auth);

var server = https.createServer(options, app).listen(3000, function(){
  console.log("listening on 3000");
});

module.exports = app;
module.exports = client;
