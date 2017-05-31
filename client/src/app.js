import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AskQuestion from './components/AskQuestion.js';
import Index from './components/Index.js';
import $ from 'jquery';
import { Provider, connect } from 'react-redux'
import store from './store';
import getUserInfo from './actionCreators.js'; 



class App extends React.Component{
  constructor(props){
    super(props)

    // this.state = { userid: {} }

    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentWillMount(){
    props.getUserInfo() 
  }

    // props.setUserID();
  

 // getUserInfo (){
 //    var context = this;
 //    $.get('/getuserinfo')
 //     .done((data) => {
 //        console.log(data)
 //        // console.log(props);
 //        context.props.getUserID(data);
 //        // this.setState({userid: data})
 //     })
 //     .fail((err)=> {
 //        console.error(err)
 //     })
 //   }

  render () {
    console.log('props in render:', this.props.userid);
    return (
      <div>
        <h1> Hello World {this.props.userid} </h1>

        <p><Link to='/askquestion' className='ask-question'> Ask Question </Link></p>

        <Route path='/' component={Index} />
        <Route path='/askquestion' component={AskQuestion} />

      </div>
    )
  }

}

let mapStateToProps = (state) => ({
  userid: state.userid
});


// let mapDispatchToProps = (dispatch: Function) => ({
//   setUserID(){
//     dispatch(getUserInfo())
//   }
// }) 

// const mapDispatchToProps = (dispatch: Function, ownProps) => ({
//   getUserID(userid){
//     dispatch(setUserID(userid))
//   }
// }) 

const mapDispatchToProps = (dispatch) => ({
  getUserID: userid => dispatch(getUserInfo())
}) 

export default connect(mapStateToProps, mapDispatchToProps)(App);

injectTapEventPlugin();

ReactDOM.render(<MuiThemeProvider muiTheme={getMuiTheme()}>
  <BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter></MuiThemeProvider>, document.getElementById('root'));
