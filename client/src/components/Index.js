import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import AskQuestion from './AskQuestion.js';
import Classroom from '../containers/Classroom.js'
import Nav from './Nav.js'
import QuestionPage from '../containers/QuestionPage.js'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { setRoomLocation } from '../actionCreators.js'


const backgroundStyles = {
  backgroundImage: "url('../public/assets/Questionmark.jpeg')"
  // backgroundImage: "url(https://static.pexels.com/photos/356079/pexels-photo-356079.jpeg)"
}


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    	id: "",
      open: false,
      snackBar: true,
      snackBarQuestion: false
    };
    this.redirect = this.redirect.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.broadcastSocket = this.broadcastSocket.bind(this);
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
  }




  broadcastSocket (userId) {
    console.log(this.props.questionerid, "QUESTIONER ID")
    console.log(userId, "STATE QUESTIONER ID")

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
      .then(response => {

      })
  }


  handleSnackBarClose () {
    this.setState({
      snackBar: false,
    });
  };

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    // also reset the Answerer to null
    this.setState({open: false});

  };

  componentWillMount() {

    this.getUserInfo();
	  this.socket = io.connect();
    var randomRoom = Math.random() * 9999999
    this.setState({roomName: randomRoom})
    console.log(this.socket);

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
    if (this.state.id !== "") {
        this.socket.emit('userData', {
          room: 'home',
          message: 'User connected!',
          user_id: this.state.id
        });
      };
    // console.log(this.props.userid)

    // console.log(this.props.userid, "USER INFO FROM REDUX")

    if (this.state.redirect) {
      var roomName = JSON.stringify(this.state.roomName)
      var search = roomName + "&" + this.props.userid.id;
      this.props.setRoomLocation(search)
      return (
        <Redirect to={{
          pathname: '/classroom'
        }}/>
      )
    }
    else if (this.props.userid.id && this.state.id !== "") {
    const buttonStyle = {
      position: "absolute",
      top: "0px",
      right: "0px",
      color: "white"

    }
    const snackBarStyle = {
      top: 0,
      bottom: 'auto',
      left: (window.innerWidth - 288) / 2,
      transform: this.props.errorMessage ?
          'translate3d(0, 0, 0)' :
          `translate3d(0, -50px, 0)`
    }
    const imageStyle = {
      position: "fixed",
      width: "100%",
      height: "100%"
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
		  <div>
        <img src ="https://static.pexels.com/photos/356079/pexels-photo-356079.jpeg" style = {imageStyle} />
        <Snackbar
          open={this.state.snackBar}
          message={this.props.userid.type === "tutor" ? "Browse Student Questions and Engage!" : "Post a Question and Get the Answers You Need!"}
          action="close"
          autoHideDuration={15000}
          onActionTouchTap={this.handleSnackBarClose}
          />
        <a href="/logout"> <FlatButton style = {buttonStyle} label="Logout" /> </a>

        <Nav user={this.props.userid}/>
        <div style={{marginLeft: "5%"}}>
        <QuestionPage socket = {this.socket} userinfo={this.props.userid} id={this.state.id} broadcastSocket = {this.broadcastSocket} />

		    <AskQuestion socket = {this.socket} id={this.state.id}/>


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
  userid: state.userid,
  questionerid: state.questioner
});

const mapDispatchToProps = dispatch => ({
  setRoomLocation: location => dispatch(setRoomLocation(location))
})

export default connect(mapStateToProps, mapDispatchToProps)(Index);
