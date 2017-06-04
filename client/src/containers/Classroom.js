import React from 'react';
import axios from 'axios';
import {Card, CardHeader} from 'material-ui/Card';
import { ChatFeed, Message } from 'react-chat-ui'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList} from 'material-ui/GridList';
import Chat from '../components/Chat.js';
import { connect } from 'react-redux'

class Classroom extends React.Component {
  constructor(props) {
    super(props);
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
        <div style={styles.video} className="col-md-8 col-xs-8">
          <h1 className="videotext" style={styles.videotext} >Video Placeholder </h1>
        </div>
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
    fontSize: 20,
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
