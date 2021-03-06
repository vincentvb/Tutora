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

const tags = (state=[], action) => {
  switch(action.type) {
    case ('SET_Q_CATEGORIES') : return action.tags
    default : return state
  }
}

const taglets = (state=[], action) => {
  switch(action.type) {
    case ('SET_Q_TAGLETS') : return action.taglets
    default : return state
  }
}

const skills = (state=[], action) => {
  switch(action.type) {
    case ('SET_PROFILE_SKILLS') : return action.skills
    default : return state
  }
}

const filter = (state=[], action) => {
  switch(action.type) {
    case ('SET_FILTER') : return action.filter
    default : return state
  }
}

const questionlist = (state=[], action) => {
  switch(action.type){
    case ('SET_QUESTION_LIST') : return action.questionlist
    default : return state
  }
}


const userq = (state= [], action) => {
  // if (action.type === 'SET_USER_Q'){
  //   console.log(action.userquestions, "USERQ CHECK ON REDUCER")
  // }
  switch(action.type) {
    case ('SET_USER_Q') : return action.userquestions
    default : return state
  }
};

const location = (state= '', action) => {
  switch(action.type) {
    case ('SET_LOCATION') : return action.location
    default : return state
  }
};

const questioner = (state= '', action) => {
  switch(action.type) {
    case ('SET_QUESTIONER') : return action.questionerid
    default : return state
  }
};

const answerer = (state= '', action) => {
  switch(action.type) {
    case ('SET_ANSWERER') : return action.answerername
    default : return state
  }
};

const rootReducer = combineReducers( { userid, userq, location, questioner, answerer, tags, skills, taglets, filter, questionlist } );


export default rootReducer

