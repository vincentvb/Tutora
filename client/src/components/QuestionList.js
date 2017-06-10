import React from 'react';
import QuestionListItem from './QuestionListItem.js';
import { connect } from 'react-redux';
import { setQ } from '../actionCreators.js'

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      questionId: {

      }
    }
    this.mapQuestions = this.mapQuestions.bind(this);
  }

  mapQuestions(questions, deleteStatus) {
  if (deleteStatus === "deleteStatus" && questions.length > 0) {
    questions.map(question => {
      console.log("QUESTION", question.user);
      if (!this.state.questionId[question.user.question.id]) {
        var obj = this.state.questionId;
        obj[question.user.question.id] = 0
        this.setState({questionId: obj})
        this.props.socket.emit('checkOnline', {question: question.user.question})
      }
    })
  }
  else {
  questions.map(question => {
    if (!this.state.questionId[question.id] && questions.length > 0) {
      var obj = this.state.questionId;
      obj[question.id] = 0
      this.setState({questionId: obj})
      this.props.socket.emit('checkOnline', {question})
    }
   })
  }
}

componentDidMount () {
  this.mapQuestions(this.props.questions);
  var context = this
  this.props.socket.on('userOnline', (response) => {
  if (this.state.questionId[response.user.question.id] === 0) {
    console.log("IN HERE");

    let variable = this.props.questionlist
    // let variable = context.state.questions
    variable.push(response);

    this.props.setQ(variable)
    // this.setState({questions: variable})

    this.state.questionId[response.user.question.id] = 1
  }
})
 this.props.socket.on('delete', (response) => {
    var questions = this.props.questionlist
    // this.state.questions = []
    this.state.questionId = {}
    console.log(questions, "QUESTIONS MAPPED");
    this.mapQuestions(questions, "deleteStatus")
 })
}

componentWillReceiveProps(newProps) {
  console.log(newProps, "NEW PROPS RECEIVED")
  this.mapQuestions(newProps.questions);
}


render() {
  console.log(this.props.questionlist, "QUESTIONS FROM QUESTION LIST")
 if (this.props.questionlist.length > 0) {
 return (
  <div>
  {this.props.questionlist.map(question =>
    <QuestionListItem userName = {this.props.userName} key={question.id} question={question} broadcastSocket = {this.props.broadcastSocket} />

  )}
  </div>


  )
  }
 else {
   return <div>Hello</div>
 }
}
}

const mapStateToProps = (state) => ({
  questionlist: state.questionlist
})

const mapDispatchToProps = dispatch => ({
  getUserQ: questions => dispatch(getUserQuestions()), 
  getProfileSkills: profileid => dispatch(getProfileSkills(profileid)), 
  setQ: questions => dispatch(setQ(questions))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
