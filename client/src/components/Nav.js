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
import styles from '../style.js'

const Nav = () => (
  <div>
  <MuiThemeProvider>
          <Toolbar
            style = {styles.toolbarStyle}>
            
          
          <ToolbarGroup firstChild={true} style={styles.titleStyle}>
              <Link to='/'
                style={styles.homeStyle}
              >
                <ToolbarTitle
                text="Tutora"
                style={styles.whiteTextStyle}
                />
              </Link>
            </ToolbarGroup>
            <ToolbarGroup style={styles.signOutStyle}>
              <Link to="/askquestion">
                <FlatButton
                  style={styles.whiteTextStyle}
                  label="ASK"
                />
              </Link>
              
            </ToolbarGroup>

            </Toolbar>
        </MuiThemeProvider>
    </div>

)

export default Nav 



