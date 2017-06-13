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
    io.to('home').emit('newonlineuser', socket.userId );


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
      requestUser: data.requestUser,
      roomName: data.roomName,
      questionId: data.questionId
    })
  })

  socket.on('updateQuestions', () => {
    io.to('home').emit('updateQuestions');
  })


  //  maybe refactor to a reverse index 
  socket.on('checkOnline', (user) => {
    console.log(user, "CHECK ONLINE QUESTION")

    Promise.map(user.questions, (question) => {
      return client.getAsync(question.profile_id)
      .then(res => {
        if (res === "online") {
          return question
        }
      })
    })
    .then(questions => {
      // console.log(questions, "IN CHECK ONLINE");
      questions = questions.filter(function(question){
        return question !== undefined;
      });

      console.log(questions, "I FOUND THE ONLINE QUESTIONS")
      io.to('home').emit('onlineQs', questions )
    })
    .catch(err => console.log(err))

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
            io.to('home').emit('deleteOfflineQs')
            // console.log("UPDATE QUESTIONS");
          }
        })
      }, 1000)
     }
  })
  console.log('a user connected');
})

module.exports = app;
module.exports = client;
