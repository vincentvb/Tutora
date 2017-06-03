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
    this.getAllQuest = this.getAllQuest.bind(this);
  }

  componentDidMount(){
    console.log(this.props.userinfo, "USER INFO FROM REDUX")
    var usertype = this.props.userinfo.type;
    
    if (usertype === 'tutor'){
      this.getAllQuest();
    } else if (usertype === 'student'){
      this.getUserQuest();
    } else {
        axios
          .get('/signup2')
          .then(response => {
            console.log("redirected to finish registration")
          })
          .catch(error => {
            console.error('signup redirect error', error)
          })
    }
  }

  getUserQuest(){
    axios
      .get('/api/questions/user/'+this.props.userinfo.id)
      .then(response => {
        this.setState({ questions: response.data})
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
