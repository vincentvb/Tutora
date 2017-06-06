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

  mapQuestions() {
  console.log("IN HERE");
  this.props.questions.map(question => {
    console.log("QUESTION ID", this.state.questionId)
    if (!this.state.questionId[question.id]) {
      var obj = this.state.questionId;
      console.log("QUESTION", question);
      obj[question.id] = 0
      this.setState({questionId: obj})
      this.props.socket.emit('checkOnline', {question})
    }
  })
}

componentDidMount () {
  this.mapQuestions();
  var context = this
  this.props.socket.on('userOnline', (response) => {
  console.log(this.state.questionId[response.user.question.id])
  if (this.state.questionId[response.user.question.id] === 0) {
    console.log("IN HERE");
    let variable = context.state.questions
    variable.push(response);
    this.setState({questions: variable})
    this.state.questionId[response.user.question.id] = 1
  }
})
}

componentWillReceiveProps() {
  this.mapQuestions();
}


render() {
 if (this.state.questions.length > 0) {
   console.log("QUESTIONS", this.state.questions);
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
