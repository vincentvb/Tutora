import React from 'react';
import axios from 'axios';
import {Card, CardHeader} from 'material-ui/Card';
import { ChatFeed, Message } from 'react-chat-ui'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList} from 'material-ui/GridList';

class Classroom extends React.Component {
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
    console.log(this.state.messages);
  }

  componentWillMount(){
    this.socket = io.connect();

    this.socket.on('connect', (socket) => {
      this.socket.emit('roomJoin', {
        room: 'class#',
        user_id: this.state.id
      });
    });

    this.socket.on('newMessage', (userMessage) => {
      console.log(userMessage);
      var newMessages = this.state.messages.slice();
      newMessages.push({id: 0, message: userMessage})
      this.setState({messages: newMessages})
      this.refs.a.scrollTop = this.refs.a.scrollHeight;
      this.setState({userChatInput: ''})
    })
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
    this.socket.emit('chatMessage', {message: this.state.userChatInput, room: 'class#'});
    this.setState({userChatInput: ''})
    this.refs.a.scrollTop = this.refs.a.scrollHeight;
    this.refs.b.input.value = '';
  }

  postChatEnter(e) {
    e.preventDefault();
    this.socket.emit('chatMessage', {message: this.state.userChatInput, room: 'class#'});
    this.setState({userChatInput: ''})
    this.refs.a.scrollTop = this.refs.a.scrollHeight;
    this.refs.b.input.value = '';
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    return (
      <div>
      <form onSubmit={this.postChatEnter}>
      <Card style={styleCard}>
        <CardHeader
          title="Chat"
        />
        <div 
          style={divstyle}
          ref = "a"
        >
          <ChatFeed
            messages={this.state.messages}
            isTyping={this.state.is_typing}
            hasInputField={false}
            bubblesCentered={false}
            bubbleStyles={
              {
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

const styleCard = {
  width: '40%'
};

const style = {
  margin: 15,
  width: '65%'
};

const style2 = {
  margin: 12
};

const divstyle = {
  height:200,
  overflow: "scroll"
}

export default Classroom;
