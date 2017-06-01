import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import AskQuestion from './AskQuestion.js';
import Classroom from './Classroom.js'
import Nav from './Nav.js'
import QuestionPage from '../containers/QuestionPage.js'


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    	id: 2
    };
    this.redirect = this.redirect.bind(this);
  }

  componentWillMount() {
	  this.socket = io.connect();
    console.log(this.socket);

	  this.socket.on('connect', (socket) => {
	    this.socket.emit('userData', {
        room: 'home',
	    	message: 'User connected!',
	    	user_id: this.state.id
	    });
	  });


  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  redirect() {
    this.setState({redirect: true})
  }

  render() {
    if (this.state.redirect) {
      console.log("IN HERE");
      return (
      <Redirect to = "/classroom" />
      )
    }
    else {
  	return (
		  <div>
        <Nav />
        <h1> Hello World </h1>
        <QuestionPage />
		    <h2> Questions </h2>
        <p onClick={this.redirect}>Clickity click</p>
		    <AskQuestion/>
		  </div>
		)

   }
 }
}

export default Index;
