import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AskQuestion from './components/AskQuestion.js';
import Index from './components/Index.js';

const App = () => (
  <div>
    <Route path='/' component={Index} />
    <Route path='/askquestion' component={AskQuestion} />
  </div>
)

export default App;

injectTapEventPlugin();

ReactDOM.render(<MuiThemeProvider muiTheme={getMuiTheme()}>
  <BrowserRouter><App /></BrowserRouter></MuiThemeProvider>, document.getElementById('root'));

