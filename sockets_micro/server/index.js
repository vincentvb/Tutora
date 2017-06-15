const PORT = 3030;
const express = require('express');
const app = express();
const client = require('./redis.js')
const https = require('https');
const fs = require('fs');

var options = {
  key: fs.readFileSync('./server/client-key.pem'),
  cert: fs.readFileSync('./server/client-cert.pem')
};

var server = https.createServer(options, app).listen(PORT, function(){
  console.log("Socket service running on " + PORT);
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('userData', (data) => {
    socket.join(data.room);
    socket.userId = data.user_id
    socket.room = data.room;
    client.set(socket.userId, "online");
    client.sadd("online", socket.userId);
    io.to('home').emit('newonlineuser', socket.userId );
  })

  socket.on('roomJoin', (data) => {
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

  socket.on('postedQ', question => {
    io.to('home').emit('postedQ', question);
  })
 
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
            client.srem("online", socket.userId)
            io.to('home').emit('delete')
            io.to('home').emit('re-renderQs')
            console.log("somebody logged off");
          }
        })
      }, 1000)
     }
  })
  console.log('a user connected');
})
