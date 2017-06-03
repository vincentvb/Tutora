import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import QuestionList from '../components/QuestionList.js'
import { getUserQuestions } from '../actionCreators.js';


class QuestionPage extends React.Component{
  constructor(props){
    super(props)

    this.state = { questions: [] }

    this.getUserQuest = this.getUserQuest.bind(this);
  }

  componentDidMount(){
    // this.props.getUserQ();
    this.getUserQuest();
  }

  getUserQuest(){
    axios
      .get('/api/questions/')
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

    if (this.state.questions.length > 1) {

    return (

      <div className="container">
        Question Page
        <QuestionList questions={this.state.questions} broadcastSocket = {this.props.broadcastSocket} />

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
