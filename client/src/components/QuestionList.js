import React from 'react';
import QuestionListItem from './QuestionListItem.js'

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
      console.log("QUESTION WITH DELETE STATUS", question.user);
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
      console.log("MAP QUESTION WITHOUT DELETE STATUS")
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
    // console.log("IN HERE");
    let variable = context.state.questions
    variable.push(response);
    this.setState({questions: variable})
    this.state.questionId[response.user.question.id] = 1
  }
})
 this.props.socket.on('delete', (response) => {
    var questions = this.state.questions
    this.state.questions = []
    this.state.questionId = {}
    console.log(questions, "QUESTIONS DELETED?");
    console.log(this.state.questions, "QL QUESTION STATE DURING DELETE")
    this.mapQuestions(questions, "deleteStatus")
 })
}

componentWillReceiveProps(newProps) {
  this.mapQuestions(newProps.questions);
}


render() {
 if (this.state.questions.length > 0) {
 return (
  <div>
  {this.state.questions.map(question =>
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

export default QuestionList;
