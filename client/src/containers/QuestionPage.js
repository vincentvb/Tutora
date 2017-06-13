import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import QuestionList from '../components/QuestionList.js'
import { getUserQuestions, getProfileSkills } from '../actionCreators.js';
import Modal from 'react-modal';
import TutorSkills from '../components/TutorSkills.js';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


class QuestionPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      questions: [],
      redirectToReg: false
    }

    this.getUserQuest = this.getUserQuest.bind(this);
    this.getAllQuest = this.getAllQuest.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);
  }

  componentDidMount() {
    if (this.props.user.type === 'tutor'){
      this.props.getProfileSkills(this.props.user.id);
    } 

    this.updateQuestions()
    var usertype = this.props.userinfo.type
    this.props.socket.on('updateQuestions', () => {
      console.log("UPDATING QUESTIONS");
      this.updateQuestions()
     })
   }

  updateQuestions() {
    var usertype = this.props.userinfo.type;
    if (usertype == null){
      axios
      .get('/redirectsignup')
      .then(response => {
        console.log("redirected", response)
      })
      .catch(error => {
        console.error('error redirect', error)
      })
    } else if (usertype.toLowerCase() === 'tutor'){
      this.getAllQuest();
    } else if (usertype.toLowerCase() === 'student'){
      console.log("IN HERE");
      this.getUserQuest();
    }
  }

  getUserQuest(){
    axios
      .get('/api/questions/user/'+this.props.userinfo.id)
      .then(response => {
        this.setState({ questions: response.data})
      })
      .catch(error => {
        console.error('axios error', error)
      });
  }

  getAllQuest(){
    axios
      .get('/api/questions/')
      .then(response => {
        this.setState({questions: response.data})
      })
      .catch(error => {
        console.error('axios error', error)
      });
  }

  render(){

    if (this.props.questionlist.length > 0) {
      return (
        <div className="container">
          <TutorSkills />

        
          <QuestionList socket = {this.props.socket} userName= {this.props.userinfo.display} questions={this.props.questionlist} broadcastSocket = {this.props.broadcastSocket} />
        </div>
      )
    } else {
      return <p>Hello</p>
    }

  }
}



const mapStateToProps = (state) => ({
  user: state.userid,
  userq: state.userquestions, 
  skills: state.skills, 
  questionlist: state.questionlist
});

const mapDispatchToProps = dispatch => ({
  getUserQ: questions => dispatch(getUserQuestions()), 
  getProfileSkills: profileid => dispatch(getProfileSkills(profileid))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
