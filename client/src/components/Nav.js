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



class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
    this.handleToggle = this.handleToggle.bind(this);
  }

handleToggle () {this.setState({open: !this.state.open})};

handleClose () {this.setState({open: false})};


render() {
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
        <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
        <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
    </Drawer>
    </MuiThemeProvider>
  </div>

  )
}
}

export default Nav
