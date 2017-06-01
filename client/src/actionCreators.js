import axios from 'axios';
import $ from 'jquery';

var setUserID = function (userid){
  return { type: 'SET_USER_ID', userid }
}

var setUserQ = function (userquestions){
  return { type: 'SET_USER_Q', userquestions }
}

export function getUserInfo (){
  return dispatch => {
    axios
      .get('/getuserinfo')
      .then(response => {
        dispatch(setUserID(response.data))
      })
      .catch(error => {
        console.error('axios error', error)
      });
    
  };
}

export function getUserQuestions (){
  return dispatch => {
    axios
      .get('/api/questions/user/2')
      .then(response => {
        console.log(response.data, "GETUSERQ")
        dispatch(setUserQ(response.data))
      })
      .catch(error => {
        console.error('axios error', error)
      });
  }
}





