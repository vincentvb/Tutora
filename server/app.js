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
const http = require('http').Server(app);
const io = require('socket.io')(http)


app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', routes.api);
app.use('/api/profiles', routes.profiles);
app.use('/api/questions', routes.questions);
app.use('/', routes.auth);


client.on('connect', () => {
  console.log("redis connected");
})

http.listen(3000, () => {
  console.log("listening on 3000")
})

io.on('connection', (socket) => {
  socket.on('userData', (data) => {
    socket.join(data.room);
    socket.userId = data.user_id
    socket.room = data.room;
    client.set(socket.userId, "online");

  })

  socket.on('roomJoin', (data) => {
    console.log(data);
    socket.userId = data.user_id
    client.set(socket.userId, "in chat")
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



  socket.on('chatMessage', (data) => {
    io.to(data.room).emit('newMessage', data.message);
  })

  socket.on('disconnect', () => {
    if (socket.userId && socket.room === 'home') {
      client.set(socket.userId, "offline")
      setTimeout(() => {
        console.log(socket.userId);
        client.get(socket.userId, (err, reply) => {
          if (reply === "offline");
            client.del(socket.userId)
        })
      }, 10000)
     }
  })
  console.log('a user connected');
})


module.exports = app;
