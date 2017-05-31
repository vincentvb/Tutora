import { combineReducers } from 'redux';

const DEFAULT_STATE = {
  userid: {}
}

const userid = (state= {}, action) => {
  switch(action.type) {
    case ('SET_USER_ID') : return action.userid
    default : return state
  }
  // if (action.type === 'SET_USER_ID'){
  //   return Object.assign({}, state, { userid: action.userid });
  // }
  // return state;
};


const rootReducer = combineReducers( { userid } );


export default rootReducer

