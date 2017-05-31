import axios from 'axios';
import $ from 'jquery';

var setUserID = function (userid){
  return { type: 'SET_USER_ID', userid }
}

var getUserInfo = function (){
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

export default getUserInfo

