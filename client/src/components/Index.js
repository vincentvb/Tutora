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
import { setRoomLocation } from '../actionCreators.js';
import UserDashBoard from './UserDashBoard.js';
import FilterQuestion from './FilterQuestion.js';
import { getOnlineQ , getAllQ} from '../network.js';



class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      id: "",
      open: false,
      snackBar: true,
      snackBarQuestion: false,
      funds: 0
    };
    this.redirect = this.redirect.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.broadcastSocket = this.broadcastSocket.bind(this);
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
    this.handleFilterQuestion = this.handleFilterQuestion.bind(this);

  }

  broadcastSocket (userId, questionId) {
    console.log(questionId, "QUESTION ID")
    console.log(userId, "STATE QUESTIONER ID")

    this.socket.emit('connectionRequest', {
      receivingUser: userId,
      requestUser: this.props.userid,
      roomName: this.state.roomName,
      questionId: questionId
   })
   this.setState({redirect: true})
}

  getUserInfo () {
    var context = this;
    axios
    .get('/getuserinfo')
      .then(response => {
        context.setState({id: response.data.id})
        axios
        .get('/api/payments/' + response.data.id)
        .then(paymentsRespons => {
          context.setState({funds: paymentsRespons.data.funds})
        })
      })
      .catch(error => {
        console.log(error);
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
    this.setState({open: false});
  };

  handleFilterQuestion(){
    this.setState({ filter: value })
  }

  componentWillReceiveProps(nextProps) {
    // Logic to throw user to signup2 if they don't have a role:
    var referedWebSite = document.referrer;
    var endpoint = referedWebSite.split('/');
    endpoint = endpoint[endpoint.length - 1];
    if(nextProps.userid.type === null && endpoint !== 'signup2') {
      window.location = "/signup2";
    }
  }

  componentWillMount() {
    this.getUserInfo();
    this.socket = io.connect();
    // this.socket = io.connect(process.env.SOCKET_SERVER || '');
    var randomRoom = Math.random() * 9999999
    this.setState({roomName: randomRoom})
    console.log(this.socket);

    this.socket.on('alertMessage', (alert) => {
      console.log(alert);
      this.setState({questionId: alert.questionId})
      this.setState({roomName: alert.roomName})
      this.setState({requestUser: alert.requestUser})
      if (alert.receivingUser === this.state.id) {
        this.setState({open: true})
      }
    });

  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  redirect() {
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

    if (this.state.redirect) {
      var roomName = JSON.stringify(this.state.roomName)
      var search = roomName + "&" + this.props.userid.id;
      this.props.setRoomLocation(search)
      console.log(this.state.roomName, "ROOMNAME");
      var room = this.state.roomName
      var questionId = this.state.questionId
      var requestUser = this.state.requestUser
      console.log("REQUEST USER", requestUser)
      return (
        <Redirect to={{
          pathname: '/classroom',
          state: {room, questionId, userType: this.props.userid.type, requestUser}
        }}/>
      )
    } else if (this.props.userid.id && this.state.id !== "") {
      const buttonStyle = {
        position: "absolute",
        top: "0px",
        right: "0px",
        color: "white"
    }
     const buttonStyle2  = {
        position: "absolute",
        top: "0px",
        left: "0px",
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
      <img src ="/assets/Questionmark.jpeg" style={imageStyle} />

        <Snackbar
          open={this.state.snackBar}
          message={this.props.userid.type === "tutor" ? "Browse Student Questions and Engage!" : "Post a Question and Get the Answers You Need!"}
          action="close"
          autoHideDuration={15000}
          onActionTouchTap={this.handleSnackBarClose}
          />
        <a href="/logout"> <FlatButton style = {buttonStyle} label="Logout" /> </a>
        <Link to ={{pathname: '/dashboard', state: {user: this.props.userid}}} > <FlatButton style = {buttonStyle2} label="DashBoard" /> </Link>
        <div style={{marginLeft: "5%"}}>
        
        <div className="container"> 
          <div className="indextext"> Welcome, {this.props.userid.display}! </div>

        <div className="filter"> 
          {this.props.userid.type === "tutor" ? <FilterQuestion socket={this.socket} filter={this.state.filter} handleFilterQuestion={this.handleFilterQuestion} /> : null}

        </div>

        <QuestionPage socket = {this.socket} userinfo={this.props.userid} id={this.state.id} broadcastSocket = {this.broadcastSocket} />
        <AskQuestion socket = {this.socket} id={this.state.id} funds={this.state.funds} />
        <Dialog
          title="We found a tutor for your question!"
          actions={actions}
          modal={false}
          open={this.state.open}
          autoScrollBodyContent={true}
          autoDetectWindowHeight = {true}
        >
          <UserDashBoard user = {this.state.requestUser} modal = {true} />
          Accept and go to the classroom or wait.
        </Dialog>

        </div>
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
  questionlist: state.questions
});

const mapDispatchToProps = dispatch => ({
  setRoomLocation: location => dispatch(setRoomLocation(location)), 
  setQ: questions => dispatch(setQ(questions))
})

export default connect(mapStateToProps, mapDispatchToProps)(Index);