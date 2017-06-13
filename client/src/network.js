'use strict'

import React from 'react';
import axios from 'axios';

const getAllQ = (cb) => {
  axios
  .get('/api/questions/')
  .then(response => {
    cb(response.data)
  })
  .catch(error => {
    console.error('axios error', error)
  });
}

const getUserQ = (userid, cb) => {
  axios
    .get('/api/questions/user/'+userid)
    .then(response => {
      cb(response.data)
    })
    .catch(error => {
      console.error('axios error', error)
    });
}

const getQbyTag = (tag, cb) => {
  axios
  .get('/api/questions/tag/'+tag)
  .then(response => {
    // console.log(response.data, "RESPONSE DATA FROM Q BY TAG CALL")
    cb(response.data)
  })
  .catch(error => {
    console.error('axios error', error)
  });
}

const getQbyTaglet = (tagletid, cb) => {
  axios
  .get('/api/questions/taglet/'+tagletid)
  .then(response => {
    cb(response.data)
  })
  .catch(error => {
    console.error('axios error', error)
  });
}

const getOnlineQ = (questions, context, cb) => {
  // console.log(questions, "QUESTIONS IN FILTER ONLINE")

  context.props.socket.emit('checkOnline', { questions});
  context.props.socket.on('onlineQs', onlineqs => {
    console.log(onlineqs, "WHO IS ONLINE")
    cb(onlineqs)
  });
}

export { 
  getAllQ, 
  getQbyTag, 
  getUserQ, 
  getOnlineQ,
  getQbyTaglet

}