import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


class QuestionPage extends React.Component{
  constructor(props){
    super(props)
  
    this.getUserQuestions = this.getUserQuestions.bind(this);
  }

  componentDidMount(){
    this.getUserQuestions();
  }

  getUserQuestions(){
    axios
      .get('/api/questions/user/2')
      .then(response => {
        console.log(response, "RESPONSE");
        console.log(this.props.user.id, "user id")
        var address = '/api/questions/'+this.props.user.id
        console.log(address, "address")
      })
      .catch(error => {
        console.error('axios error', error)
      });
  }

  render(){

    console.log(this.props.user, "Question userid")

    return (

      <div>
        Question Page
      </div> 
    )
  }

}

const mapStateToProps = (state) => ({
  user: state.userid
});

export default connect(mapStateToProps, {})(QuestionPage);