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

const getQbyTags = (tags, cb) => {
  let urls = tags.map(skill => {
    return '/api/questions/tag/'+skill
  })

  let promises = urls.map(url => axios.get(url))

  axios.all(promises)
  .then(response => {
    // console.log(response, "WHAT IS THE RESPONSE?")
    var skillquestions = response.reduce(function(acc, response){ 
      return acc.concat(response.data)
    }, [])

    // console.log(skillquestions)
    cb(skillquestions)
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

const getAllOnlineQ = (cb) => {
  axios
  .get('/api/questions/online')
  .then(response => {
    cb(response.data)
  })
  .catch(error => {
    console.error('axios error', error)
  });
}

// old method of using sockets to retrieve onlineQ
const getOnlineQ = (questions, context, cb) => {
  // console.log(questions, "QUESTIONS IN FILTER ONLINE")

  context.props.socket.emit('checkOnline', { questions});
  context.props.socket.on('onlineQs', onlineqs => {
    console.log(onlineqs, "WHO IS ONLINE")
    cb(onlineqs)
  });
}

const getTagletsbyQ = (qid, cb) => {
  axios
  .get('/api/tags/taglets/question/'+qid)
  .then(response => {
    cb(response.data)
  })
  .catch(error => {
    console.error('axios error', error)
  });
}

export { 
  getAllQ, 
  getQbyTag, 
  getUserQ, 
  getOnlineQ,
  getAllOnlineQ,
  getQbyTaglet, 
  getQbyTags, 
  getTagletsbyQ

}