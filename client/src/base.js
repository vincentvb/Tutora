import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider, connect } from 'react-redux'
import Index from './components/Index.js';
import Classroom from './components/Classroom.js'
import AskQuestion from './components/AskQuestion.js';

import store from './store';
import App from './components/App.js'



injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>

      <Provider store={store}>
        <App />
      </Provider>
  </MuiThemeProvider>, document.getElementById('root'));
