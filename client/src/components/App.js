import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import AskQuestion from './AskQuestion.js';
import Index from './Index.js';
import $ from 'jquery';
import { Provider, connect } from 'react-redux'
import { getUserInfo } from '../actionCreators.js';
import Classroom from './Classroom.js'
import Nav from './Nav.js'
import QuestionPage from '../containers/QuestionPage.js'

class App extends React.Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.getUserID()
  }

  render () {
    // console.log('props in render:', this.props);
    return (
      <div>
        <Nav />
        <h1> Hello World </h1>

        <p><Link to='/askquestion' className='ask-question'> Ask Question </Link></p>

        <QuestionPage />

        <Route path='/' component={Index} />
        <Route path='/classroom' component={Classroom} />
        <Route path='/askquestion' component={AskQuestion} />
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  userid: state.userid
});


const mapDispatchToProps = dispatch => ({
  getUserID: userid => dispatch(getUserInfo())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
