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
      questionId: {

      },
      redirectToReg: false
    }

    this.getUserQuest = this.getUserQuest.bind(this);
    this.getAllQuest = this.getAllQuest.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.user.id, "USER ID FROM REDUX ON QP")

    // put Profile Skills in Redux if tutor
    if (this.props.user.type.toLowerCase() === 'tutor'){
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
      .then(response => {
        this.updateState();
      })
      .catch(error => {
        console.error('axios error', error)
      });
  }

  updateState() {
    var array = this.state.questions
    for (var i = 0; i < array.length; i++) {
      if (this.state.questionId[array[i]] = 0) {
        this.state.questionId[array[i]] = 1
      }
      else if (this.state.questionId[array[i]] === 1) {
        array.splice(i, 1);
      }
    }
  }

  getAllQuest(){
    axios
      .get('/api/questions/')
      .then(response => {
        this.setState({questions: response.data})
        var obj = this.state.questionId
        var array = response.data
        for (var i = 0; i < array.length; i++) {
          var id = array[i].id
          if (!obj[id]) {
            obj[id] = 0
            console.log(obj);
            this.setState({questionId: obj})
          }
        }
      })
      .then(response => {
        this.updateState();
      })
      .catch(error => {
        console.error('axios error', error)
      });
  }

  render(){

    if (this.state.questions.length > 0) {
      return (
        <div className="container">
          <TutorSkills />

        
          <QuestionList socket = {this.props.socket} userName= {this.props.userinfo.display} questions={this.state.questions} broadcastSocket = {this.props.broadcastSocket} />
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
  skills: state.skills
});

const mapDispatchToProps = dispatch => ({
  getUserQ: questions => dispatch(getUserQuestions()), 
  getProfileSkills: profileid => dispatch(getProfileSkills(profileid))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
