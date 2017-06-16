import axios from 'axios';
import $ from 'jquery';

var userId

var setUserID = function (userid){
  return { type: 'SET_USER_ID', userid }
}

var setUserQ = function (userquestions){
  return { type: 'SET_USER_Q', userquestions }
}

var setTags = function (tags){
  return { type: 'SET_Q_CATEGORIES', tags }
}

var setTaglets = function (taglets){
  return { type: 'SET_Q_TAGLETS', taglets }
}

var setProfileSkills = function (skills){
  return { type: 'SET_PROFILE_SKILLS', skills }
}

export function setFilter(filter){
  return { type: 'SET_FILTER', filter }
}

export function setQ(questionlist){
  return { type: 'SET_QUESTION_LIST', questionlist }
}

export function getProfileSkills(profileid){
  return dispatch => {
    axios
      .get('/api/tags/profile/'+profileid)
      .then(skills => {
        var skillsarr = skills.data.map(skill => skill.tags.value)
        dispatch(setProfileSkills(skillsarr))
      })
      .catch(error => {
        console.error('axios error', error)
      });
  };
}

export function getUserInfo (){
  return dispatch => {
    axios
      .get('/getuserinfo')
      .then(response => {
        userId = response.data.id;
        dispatch(setUserID(response.data))
      })
      .catch(error => {
        console.error('axios error', error)
      });
    
  };
}

export function getTags(){
  return dispatch => {
    axios
      .get('/api/tags')
      .then(tags => {
        dispatch(setTags(tags.data))
      })
      .catch(error => {
        console.log('Error while retrieving tags', error)
      });
    
  };
}

export function getTaglets(){
  return dispatch => {
    axios
      .get('/api/tags/taglets')
      .then(taglets => {
        dispatch(setTaglets(taglets.data))
      })
      .catch(error => {
        console.log('Error while retrieving taglets', error)
      });
    
  };
}

export const setRoomLocation = (location) => {
  return { type: 'SET_LOCATION', location}
}

export const setQuestioner = (questionerid) => {
  return { type: 'SET_QUESTIONER', questionerid}
}

export const setAnswerer = (answerername) => {
  return { type: 'SET_ANSWERER', answerername}
}




