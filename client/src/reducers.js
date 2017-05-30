import { SET_USER_ID } from './actions'

const DEFAULT_STATE = {
  userid: ''
}

const setUserID = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { userid: action.userid })
  return newState
}

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type){
    case SET_USER_ID: 
      return setUserID(state, action)
    default:
      return state
  }
}

export default rootReducer