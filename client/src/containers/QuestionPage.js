import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import QuestionList from '../components/QuestionList.js'
import { getUserQuestions } from '../actionCreators.js';


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
    this.updateQuestions()
    var usertype = this.props.userinfo.type
    this.props.socket.on('updateQuestions', () => {
      this.updateQuestions()
     })
   }

updateQuestions() {
  console.log("IN HERE");
  var usertype = this.props.userinfo.type;
  if (usertype === 'tutor'){
    this.getAllQuest();
  } else if (usertype === 'student'){
    this.getUserQuest();
  } else {
    axios
    .get('/redirectsignup')
    .then(response => {
      console.log("redirected", response)
    })
    .catch(error => {
      console.error('error redirect', error)
    })

 }
}

  getUserQuest(){
    axios
      .get('/api/questions/user/'+this.props.userinfo.id)
      .then(response => {
        this.setState({ questions: response.data})
        console.log(response);
        console.log(this.state.questions, "Questions")
      })
      .catch(error => {
        console.error('axios error', error)
      });
  }

  getAllQuest(){
    axios
      .get('/api/questions/')
      .then(response => {
        this.setState({ questions: response.data})
        console.log(this.state.questions, "Questions")
      })
      .catch(error => {
        console.error('axios error', error)
      });
  }

  render(){

    // console.log(this.props.userq, "User Questions")
    // console.log(this.props.user, "Question userid")
    // console.log(this.state.questions, "QUESTIONS")

    if (this.state.questions.length > 0) {
      return (

        <div className="container">
          <QuestionList userName= {this.props.userinfo.display} questions={this.state.questions} broadcastSocket = {this.props.broadcastSocket} />
        </div>
      )
    } else {
      return <p>Hello</p>
    }

  }
}



const mapStateToProps = (state) => ({
  user: state.userid,
  userq: state.userquestions
});

const mapDispatchToProps = dispatch => ({
  getUserQ: questions => dispatch(getUserQuestions())
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
