import { SET_USER_ID } from './actions'

export function setUserID (userid){
  return { type: SET_USER_ID, userid }
}