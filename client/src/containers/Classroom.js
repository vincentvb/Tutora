import React from 'react';
import axios from 'axios';
import {Card, CardHeader} from 'material-ui/Card';
import { ChatFeed, Message } from 'react-chat-ui'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList} from 'material-ui/GridList';
import Chat from '../components/Chat.js';
import { connect } from 'react-redux'
const Video = require('twilio-video');


class Classroom extends React.Component {
  constructor(props) {
    super(props);


  }

componentDidMount() {
  console.log("PROPS", this.props);
  var location = this.props.location
  console.log("LOCATION", location.state.room);
  axios.get('/apiKey', {
  params: {
    location: location.state.room,
    user: this.props.user.display
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
  }, function(error) {
      console.error('Unable to connect to Room: ' +  error.message);
  });
  })


}


  render() {

    return (
      <div className="container">
      
      <div style={styles.header} className="row">
        My Classroom

      </div>

      <div className="row">
        <div style={styles.chat} className="col-md-4 col-xs-4">
          <Chat />
        </div>
        <div id="videoTrack" className="col-md-8 col-xs-8 media-container"></div>
        <div id="audioTrack" className="col-md-8 col-xs-8 media-container"></div>

        </div>
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
    backgroundColor: 'gray',
    color: 'white',
    verticalAlign: 'middle',
    position: 'relative'
  },
  videotext: {
    position: 'absolute',
    top: '50%',
    transform: "translateY('-50%')"
  }
}
