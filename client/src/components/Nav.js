import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {
  indigo500,
} from 'material-ui/styles/colors';
import {Link} from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import FontIcon from 'material-ui/FontIcon';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import styles from '../style.js';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import ActionList from 'material-ui/svg-icons/action/list';
import axios from 'axios';



class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
    this.handleToggle = this.handleToggle.bind(this);
    this.handleProfileRedirect = this.handleProfileRedirect.bind(this);
  }

handleToggle () {this.setState({open: !this.state.open})};

handleClose () {this.setState({open: false})};

handleProfileRedirect () {
  axios
    .get('/redirectsignup');
}


render() {
console.log("NAV PROPS", this.props.user);
var mediumIcon = {
    width: 48,
    height: 48,
    color: "white"
  }
var medium = {
    width: 96,
    height: 96
  }
return(
  <div>
    <IconButton
      onTouchTap = {this.handleToggle}
      iconStyle = {mediumIcon}
      style = {medium}
    >
      <ActionList />
    </IconButton>
    <MuiThemeProvider>
      <Drawer
        docked={false}
        width={200}
        open={this.state.open}
        onRequestChange={(open) => this.setState({open})}
      >
        <img src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50" style={{align: "center"}}/>
        <p style={{textAlign: "center"}}>{this.props.user.display}</p>
        <a href = "/profile"> <MenuItem onTouchTap={this.handleProfileRedirect}>Profile Page</MenuItem> </a>
    </Drawer>
    </MuiThemeProvider>
  </div>

  )
}
}

export default Nav
