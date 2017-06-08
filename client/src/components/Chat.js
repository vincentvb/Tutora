import React from 'react';
import axios from 'axios';
import {Card, CardHeader} from 'material-ui/Card';
import { ChatFeed, Message } from 'react-chat-ui'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList} from 'material-ui/GridList';
import { connect } from 'react-redux'

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages : [
        { id: 1, message: "I'm the recipient! (The person you're talking to)" },
        { id: 0, message: "I'm you -- the blue bubble!" }
      ],
      is_typing: false,
      userChatInput: ''
    }
    this.chatInput = this.chatInput.bind(this);
    this.postChat = this.postChat.bind(this);
    this.postChatEnter = this.postChatEnter.bind(this);

    // To handle logic around who the sender and the receiver is
    this.messageCache = {};
    this.cacheInput = this.cacheInput.bind(this);
    this.checkIfExist = this.checkIfExist.bind(this);
  }

  cacheInput(message) {
    var d = new Date();
    var messageWithSec = message + d.getSeconds();
    this.messageCache[messageWithSec] = messageWithSec;
  }

  checkIfExist(message) {
    var d = new Date();
    var messageWithSec = message + d.getSeconds();
    return messageWithSec in this.messageCache;
  }

  componentWillMount(){
    var roomName = this.props.location;
    this.setState({currentRoom: roomName.split('&')[0]})
    this.socket = io.connect();
    this.socket.on('connect', (socket) => {
      this.socket.emit('roomJoin', {
        room: roomName.split("&")[0],
        user_id: roomName.split("&")[1]
      });
    });

    this.socket.on('newMessage', (userMessage) => {
      if (this.checkIfExist(userMessage)) {
        var newMessages = this.state.messages.slice();
        newMessages.push({id: 0, message: userMessage});
        this.setState({messages: newMessages});
        this.refs.a.scrollTop = this.refs.a.scrollHeight;
        this.setState({userChatInput: ''});
      } else {
        var newMessages = this.state.messages.slice();
        newMessages.push({id: 1, message: userMessage});
        this.setState({messages: newMessages});
        this.refs.a.scrollTop = this.refs.a.scrollHeight;
        this.setState({userChatInput: ''});
        this.cacheInput(userMessage);
      }

    });
  }

  componentDidMount() {

    this.refs.a.scrollTop = this.refs.a.scrollHeight;
  }

  chatInput(event) {
    this.setState({
      userChatInput: event.target.value
    });
  }

  postChat() {
    this.socket.emit('chatMessage', {message: this.state.userChatInput, room: this.state.currentRoom});
    this.setState({userChatInput: ''})
    this.refs.a.scrollTop = this.refs.a.scrollHeight;
    this.refs.b.input.value = '';

    this.cacheInput(this.state.userChatInput);
  }

  postChatEnter(e) {
    e.preventDefault();
    this.socket.emit('chatMessage', {message: this.state.userChatInput, room: this.state.currentRoom});
    this.setState({userChatInput: ''})
    this.refs.a.scrollTop = this.refs.a.scrollHeight;
    this.refs.b.input.value = '';

    this.cacheInput(this.state.userChatInput);
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.postChatEnter}>
        <Card>
          <CardHeader
            title="Chat"
          />
          <div style={styles.chat} ref = "a">
            <ChatFeed
              messages={this.state.messages}
              isTyping={this.state.is_typing}
              hasInputField={false}
              bubblesCentered={false}
              bubbleStyles={styles.bubbleStyles}
            />
          </div>
          <TextField
            style = {style}
            className="chatinput"
            onChange={this.chatInput}
            id="chat"
            floatingLabelText="Say something"
            ref = "b"
          />
          <RaisedButton
            label = "Post"
            primary = {true}
            style = {style2}
            onClick={this.postChat}
           />
        </Card>
        </form>
      </div>
    )
  }
}

const styles = {

  chat: {
    height:200,
    overflow: "scroll"
  },
  bubbleStyles: {
    text: {
      fontSize: 12
    },
    chatbubble: {
      borderRadius: 20,
      padding: 10,
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 5
    }
  }
}

const style = {
  margin: 15,
  width: '65%'
};

const style2 = {
  margin: 12
};

const mapStateToProps = (state) => ({
  location: state.location
});


export default connect(mapStateToProps, null)(Chat);
