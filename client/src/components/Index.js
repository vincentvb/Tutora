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
	  
	  var socket = io.connect();

	  socket.on('connect', function () {
	    socket.emit('hi, my userID is: ', this.state.id);
	  });

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