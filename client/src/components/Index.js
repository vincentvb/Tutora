import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import AskQuestion from './AskQuestion.js';
import Classroom from './Classroom.js'
import Nav from './Nav.js'
import QuestionPage from '../containers/QuestionPage.js'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    	id: 2,
      open: false
    };
    this.redirect = this.redirect.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

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
      return (
      <Redirect to = "/classroom" />
      )
    }
    else {
    const actions = [
      <FlatButton
        label="Reject invitation"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Take me to the classroom"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

  	return (
		  <div>
        <Nav />
        <h1> Hello World </h1>
        <QuestionPage />
		    <h2> Questions </h2>
        <p onClick={this.redirect}>Clickity click</p>
		    <AskQuestion/>

        {/* Delete me (RaisedButton) when you hook up the Dialog Modal to render automatically */}
        <RaisedButton label="Modal Dialog" onTouchTap={this.handleOpen} />
        <Dialog
          title="We found a tutor for your question!"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Accept and go to the classroom or wait.
        </Dialog>
		  </div>
		)

   }
 }
}

export default Index;
