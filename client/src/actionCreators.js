import axios from 'axios';
// import { SET_USER_ID } from './actions';
import $ from 'jquery';

// console.log(SET_USER_ID, "setuserid")

var setUserID = function (userid){
  return { type: 'SET_USER_ID', userid: userid }
}

var getUserInfo = function (){
  return dispatch => {
    $.get('/getuserinfo')
     .done((data) => {
        console.log(data)
        dispatch(setUserID(data))
        // console.log(props);
        // context.props.getUserID(data);
        // this.setState({userid: data})
     })
     .fail((err)=> {
        console.error(err)
     })
    
  };
}

export default getUserInfo

// axios
//       .get('/getuserinfo')
//       .then(response => {
//         console.log(response.data, "RESPONSE DATA");
//         dispatch(setUserID(response.data))
//       })
//       .catch(error => {
//         console.error('axios error', error)
//       });