import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import AskQuestion from './AskQuestion.js';
import Index from './Index.js';
import $ from 'jquery';
import { Provider, connect } from 'react-redux'
import getUserInfo from '../actionCreators.js';
import Classroom from './Classroom.js'


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
        <h1> Hello World </h1>
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
