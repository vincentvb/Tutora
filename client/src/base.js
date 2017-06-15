import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider, connect } from 'react-redux'
import store from './store';
import App from './components/App.js';
import Style from '!style-loader!css-loader!./style.css';
import {IntlProvider} from 'react-intl';


injectTapEventPlugin();

ReactDOM.render(
	<IntlProvider locale="en">
	  <MuiThemeProvider muiTheme={getMuiTheme()}>
	      <Provider store={store}>
	        <App />
	      </Provider>
	  </MuiThemeProvider>
  </IntlProvider>, document.getElementById('root'));
