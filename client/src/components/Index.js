import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import AskQuestion from './AskQuestion.js';
import Classroom from './Classroom.js'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	id: 2,
      open: false
    };
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
	  // this.socket = io.connect();
    // console.log(this.socket);
    //
	  // this.socket.on('connect', (socket) => {
	  //   this.socket.emit('userData', {
    //     room: 'home',
	  //   	message: 'User connected!',
	  //   	user_id: this.state.id
	  //   });
	  // });
    //
    // this.socket.on('new message', (e) => {
    //   console.log('message recieved');
    //   this.recieveMessage(e);
    // });
  }

  componentWillUnmount() {
    // this.socket.disconnect();
  }

  render() {
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
		    <h2> Questions </h2>
		    <AskQuestion/>
        <Classroom/>
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

export default Index;
