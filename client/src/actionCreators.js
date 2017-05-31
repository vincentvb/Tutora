import axios from 'axios';
import { SET_USER_ID } from './actions'

var setUserID = function (userid){
  return { type: SET_USER_ID, payload: userid }
}

var getUserInfo = function (){
  return (dispatch: Function) => {
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