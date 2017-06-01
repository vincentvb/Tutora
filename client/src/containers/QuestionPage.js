import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import QuestionList from '../components/QuestionList.js'
import { getUserQuestions } from '../actionCreators.js';


class QuestionPage extends React.Component{
  constructor(props){
    super(props)
    
    this.state = { questions: [] }

    this.getUserQuestions = this.getUserQuestions.bind(this);
  }

  componentDidMount(){
    // this.props.getUserQ();
    this.getUserQuestions();
  }

  getUserQuestions(){
    axios
      .get('/api/questions/user/2')
      .then(response => {
        // console.log(response, "RESPONSE");
        this.setState({ questions: response.data})
        // console.log(this.props.user.id, "user id")
        // var address = '/api/questions/'+this.props.user.id
        // console.log(address, "address")
        console.log(this.state.questions, "Questions")
      })
      .catch(error => {
        console.error('axios error', error)
      });
  }

  render(){
    // console.log(this.props.userq, "User Questions")
    // console.log(this.props.user, "Question userid")

    return (

      <div className="container">
        Question Page
        <QuestionList questions={this.state.questions} />

      </div> 
    )
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