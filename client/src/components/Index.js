import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import AskQuestion from './AskQuestion.js';


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	id: 2
    };
  }

  componentWillMount() {
	  this.socket = io.connect();
    console.log(this.socket);

	  this.socket.on('connect', (socket) => {
	    this.socket.emit('userData', {
        room: 'home',
	    	message: 'User connected!',
	    	user_id: this.state.id
	    });
	  });

    this.socket.on('new message', (e) => {
      console.log('message recieved');
      this.recieveMessage(e);
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
  	return (
		  <div>
		    <h2> Questions </h2>
		    <AskQuestion/>
		  </div>
		)
  }
}

export default Index;
