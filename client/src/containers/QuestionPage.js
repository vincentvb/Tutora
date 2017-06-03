import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import QuestionList from '../components/QuestionList.js'
import { getUserQuestions } from '../actionCreators.js';


class QuestionPage extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      questions: [],
      redirectToReg: false
    }

    this.getUserQuest = this.getUserQuest.bind(this);
    this.getAllQuest = this.getAllQuest.bind(this);
  }

  componentDidMount(){
    var usertype = this.props.userinfo.type;
    console.log(usertype);

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

    if (this.state.questions.length > 0) {
      console.log("IN QUESTION STATEMENT");
    return (

      <div className="container">
        <QuestionList userName = {this.props.userinfo.display} questions={this.state.questions} broadcastSocket = {this.props.broadcastSocket} />

      </div>
    )
  }
  else {
    return <p>Hello</p>
  }

}
}

export default QuestionPage

// const mapStateToProps = (state) => ({
//   user: state.userid,
//   userq: state.userquestions
// });

// const mapDispatchToProps = dispatch => ({
//   getUserQ: questions => dispatch(getUserQuestions())
// })

// export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
