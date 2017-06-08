import React from 'react';
import axios from 'axios';
import {Card, CardHeader} from 'material-ui/Card';
import { ChatFeed, Message } from 'react-chat-ui'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {GridList} from 'material-ui/GridList';
import Chat from '../components/Chat.js';
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog';
import { Redirect } from 'react-router-dom'

const Video = require('twilio-video');

const imageStyle = {
  position: "fixed",
  width: "100%",
  height: "100%"
}



class Classroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      redirect: false
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.redirect = this.redirect.bind(this);
  }





  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };
  redirect() {
    this.setState({redirect: true})
  }

componentDidMount() {
  console.log("PROPS", this.props);
  var location = this.props.location
  console.log("LOCATION", location.state.room);
  var randomUser = (Math.random() * 99999).toString();
  axios.get('/apiKey', {
  params: {
    location: location.state.room,
    user: this.props.user.display || randomUser
  }
})
  .then((response) => {
    console.log("DATA", response.data)
    var room
    Video.connect(response.data, {name: location.state.room}).then((room) => {
     var room = room
     console.log('Successfully joined a Room: ', room);
     var tracks = Array.from(room.localParticipant.tracks.values())
      document.getElementById('videoTrack').appendChild(tracks[1].attach())
      // tracks[1].attach(this.refs.remoteMedia)
     room.on('trackAdded', function(track, participant) {
      var tracks = Array.from(participant.tracks.values())
      console.log("TRACKS", tracks)
      if (tracks[1]) {
      var id1 = document.getElementById('videoTrack')
      var id2 = document.getElementById('audioTrack');
      id1.removeChild(id1.childNodes[0]);
      id1.appendChild(tracks[1].attach());
      id2.removeChild(id2.childNodes[0]);
      id2.appendChild(tracks[0].attach());
     }
    })
     room.on('participantDisconnected', (participant) => {
      this.handleOpen();

     })
  }, function(error) {
      console.error('Unable to connect to Room: ' +  error.message);
  });
  })


}


  render() {
  const buttonStyle = {
        position: "absolute",
        top: "0px",
        right: "0px",
        color: "white"
  }
  const buttonActions = [
    <FlatButton
          label="Stay Here"
          primary={true}
          onTouchTap={this.handleClose}
    />,
    <FlatButton
        label="Leave"
        primary={true}
        onTouchTap={this.redirect}
        />
    ]

    if (this.state.redirect) {
      return (
         <Redirect to={{
          pathname: '/'
        }}/>
      )
    }

    return (
     <div>
     <img src ="https://pixabay.com/get/e835b60d2bf2073ed1534705fb0938c9bd22ffd41db8174891f9c078a2/black-1072366_1920.jpg" style={imageStyle} />
      <FlatButton onTouchTap = {this.redirect} style = {buttonStyle} label="Return To Home" />

      <div className="container">
      
        <div style={styles.header} className="row">
          My Classroom

        </div>

        <div className="row">
          <div style={styles.chat} className="col-md-4 col-xs-4">
            <Chat />
          </div>
          <div style={styles.video} id="videoTrack" className="col-md-8 col-xs-8 media-container"></div>
          <div id="audioTrack" className="col-md-8 col-xs-8 media-container"></div>

          </div>
      </div>
        <Dialog
          title="Your partner has left! Leave or stay?"
          actions={buttonActions}
          modal={true}
          open={this.state.open}
        >
        </Dialog>
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userid,
  answerer: state.answerer, 
  questioner: state.questioner
});

export default connect(mapStateToProps, null)(Classroom)

const styles = {
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Vibur',
    textAlign: 'center',
    margin: 30
  },
  chat: {
    // borderColor: 'green',
    // borderWidth: 5,
    // borderStyle: 'solid'
  },
  video: {
    // borderColor: 'red',
    // borderWidth: 5,
    // borderStyle: 'solid',
    height: 420,

  },
  videotext: {
    position: 'absolute',
    top: '50%',
    transform: "translateY('-50%')"
  }
}
