'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST || '127.0.0.1'
});

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

// please note, and I realize that this is super confusing, that tags = categories and taglets = tags on the UI
app.use('/api', routes.api);
app.use('/api/tags', routes.tags);
app.use('/api/profiles', routes.profiles);
app.use('/api/questions', routes.questions);

app.use('/', routes.auth);



client.on('connect', () => {
  console.log("redis connected");
})

// http.listen(3000, () => {
//   console.log("listening on 3000 (or 80 if you are running me Docker)")
// })

var server = https.createServer(options, app).listen(3000, function(){
  console.log("listening on 3000");
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('userData', (data) => {
    socket.join(data.room);
    socket.userId = data.user_id
    socket.room = data.room;
    client.set(socket.userId, "online");

  })

  socket.on('roomJoin', (data) => {
    // console.log(data);
    socket.userId = data.user_id
    socket.join(data.room);
    socket.room = data.room
})

  socket.on('connectionRequest', (data) => {
    io.to('home').emit('alertMessage', {
      receivingUser: data.receivingUser,
      roomName: data.roomName
    })
  })

  socket.on('updateQuestions', () => {
    io.to('home').emit('updateQuestions');
  })

  socket.on('checkOnline', (user) => {
    // console.log("checkONLINEUSER", user);
    var id = user.question.profile_id.toString();
    // console.log(id);
    client.get(id, (err, res) => {
      // console.log(res);
      if (res === "online") {
      io.to('home').emit('userOnline', {
        user
       })
     }

   })
  })

  socket.on('chatMessage', (data) => {
    io.to(data.room).emit('newMessage', data.message);
  })

  socket.on('disconnect', () => {
    if (socket.userId) {
      client.set(socket.userId, "offline")
      setTimeout(() => {
        client.get(socket.userId, (err, reply) => {
          if (reply === "offline") {
            client.del(socket.userId)
            io.to('home').emit('delete')
            io.to('home').emit('updateQuestions')
            // console.log("UPDATE QUESTIONS");
          }
        })
      }, 5000)
     }
  })
  console.log('a user connected');
})

module.exports = app;
