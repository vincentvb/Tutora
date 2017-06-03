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
import axios from 'axios';
import { connect } from 'react-redux'

const backgroundStyles = {
  backgroundImage: "url(https://static.pexels.com/photos/356079/pexels-photo-356079.jpeg)"
}


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
    this.getUserInfo = this.getUserInfo.bind(this);
    this.broadcastSocket = this.broadcastSocket.bind(this);
  }



  broadcastSocket (userId) {

    this.socket.emit('connectionRequest', {
      receivingUser: userId,
      requestUser: this.state.id,
      roomName: this.state.roomName
   })
   this.setState({redirect: true})
}

  getUserInfo () {
    var context = this;
    axios
    .get('/getuserinfo')
      .then(response => {
        context.setState({id: response.data.id})
      })
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  componentWillMount() {

    this.getUserInfo();
	  this.socket = io.connect();
    var randomRoom = Math.random() * 9999999
    this.setState({roomName: randomRoom})
    console.log(this.socket);

	  this.socket.on('connect', (socket) => {
	    this.socket.emit('userData', {
        room: 'home',
	    	message: 'User connected!',
	    	user_id: this.state.id
	    });
	  });

    this.socket.on('alertMessage', (alert) => {
      console.log(alert);
      this.setState({roomName: alert.roomName})
      if (alert.receivingUser === this.state.id) {
        this.setState({open: true})
      }
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  redirect() {
    console.log("IN REDIRECT");
    this.setState({redirect: true})
  }


  render() {

    // console.log(this.props.userid, "USER INFO FROM REDUX")

    if (this.state.redirect) {
      var roomName = JSON.stringify(this.state.roomName)
      var userId = this.state.id;
      console.log("USERID", userId)
      return (
        <Redirect to={{
          pathname: '/classroom',
          search: roomName + "&" + userId
        }}/>
      )
    }
    else if (this.props.userid.id) {
    const buttonStyle = {
      position: "absolute",
      top: "0px",
      right: "0px",
      color: "white"

    }
    const actions = [
      <FlatButton
        label="Reject invitation"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Take me to the classroom"
        primary={true}
        onTouchTap={this.redirect}
      />
    ];

  	return (
		  <div style = {{backgroundImage: "url(https://static.pexels.com/photos/356079/pexels-photo-356079.jpeg)", backgroundSize: "100%"}}>
        <a href="/logout"> <FlatButton style = {buttonStyle} label="Logout" /> </a>

        <Nav />
        <div style={{marginLeft: "5%"}}>
        <QuestionPage userinfo={this.props.userid} id={this.state.id} broadcastSocket = {this.broadcastSocket} />

		    <AskQuestion id={this.state.id}/>

        <Dialog
          title="We found a tutor for your question!"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Accept and go to the classroom or wait.
        </Dialog>
      </div>
		  </div>
		)

   }
 else {
    return null
  }
 }
}

const mapStateToProps = (state) => ({
  userid: state.userid
});

export default connect(mapStateToProps)(Index);
