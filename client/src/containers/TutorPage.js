import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import QuestionList from '../components/QuestionList.js'
import { getUserQuestions, getProfileSkills } from '../actionCreators.js';
import Modal from 'react-modal';
import TutorSkills from '../components/TutorSkills.js';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class TutorPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {}
  }

  render(){

  }

}

export default TutorPage