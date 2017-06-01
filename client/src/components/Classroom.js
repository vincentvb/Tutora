import React from 'react';
import axios from 'axios';
import {Card, CardHeader} from 'material-ui/Card';
import { ChatFeed, Message } from 'react-chat-ui'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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

    console.log(this.state.messages);
  }

  chatInput(event) {
    this.setState({
      userChatInput: event.target.value
    });
  }

  postChat() {
    var newMessages = this.state.messages.slice();
    newMessages.push({ id: 0, message: this.state.userChatInput })
      this.setState({messages: newMessages
    });
    this.setState({userChatInput: ''});
  }

  render() {
    return (
      <div>
      <Card style={styleCard}>
        <CardHeader
          title="Chat"
          subtitle="For tutors and students"
        />
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
                margin: 15
              }
            }
          }
        />
        <TextField
          style = {style}
          className="chatinput"
          onChange={this.chatInput}
          id="chat"
          floatingLabelText="Say something"
        />
        <RaisedButton
          label = "Post"
          primary = {true}
          style = {style2}
          onClick={this.postChat}
         />
      </Card>
      </div>
    )
  }
}

const styleCard = {
  width: '50%'
};

const style = {
  margin: 15
};

const style2 = {
  margin: 12
};

export default Classroom;