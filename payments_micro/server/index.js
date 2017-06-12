const PORT = 1337;
const express = require('express');
const app = express();
const routes = require('./routes');
const middleware = require('./middleware');
const db = require('../db');
const bodyParser = require('body-parser');

const http = require('http');
app.use(bodyParser.json({limit: '50mb'}));

var server = http.createServer(app).listen(PORT, function(){
  console.log("Payments service listening on " + PORT);
});

app.use('/api', routes);