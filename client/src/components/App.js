import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import AskQuestion from './AskQuestion.js';
import Index from './Index.js';
import $ from 'jquery';
import axios from 'axios';
import { Provider, connect } from 'react-redux'
import { getUserInfo } from '../actionCreators.js';
import Classroom from '../containers/Classroom.js'
import Nav from './Nav.js'
import QuestionPage from '../containers/QuestionPage.js'
import TutorSkills from './TutorSkills.js'

class App extends React.Component {
  constructor(props){
    super(props)

  }

  componentWillMount(){
    this.props.getUserID();

  }

  render () {
    // console.log('userid prop in App:', this.props.userid)

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Index} />
            <Route path='/classroom' component={Classroom} />
            <Route path='/tutorskills' component={TutorSkills} />
            <Route exact path='/askquestion' component={AskQuestion} />
          </Switch>
        </BrowserRouter>
      </div>
    )

  }

}



const mapDispatchToProps = dispatch => ({
  getUserID: userid => dispatch(getUserInfo())
})

export default connect(null, mapDispatchToProps)(App);
