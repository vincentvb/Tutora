import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import QuestionList from '../components/QuestionList.js'
import { getUserQuestions, getProfileSkills, setQ } from '../actionCreators.js';
import Modal from 'react-modal';
import TutorSkills from '../components/TutorSkills.js';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { getAllQ, getUserQ, getQbyTag, getOnlineQ, getQbyTaglet, getAllOnlineQ, getQbyTags } from '../network.js';
import uniqBy from 'lodash/uniqBy'


class QuestionPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      questions: [],
      redirectToReg: false, 
      onlinequestions: []
    }

    this.filterTutorQ = this.filterTutorQ.bind(this);

    // when a student posts a question
    // please note that this is very similar to when a newonlineuser comes online
    // however it is split into a separate socket to keep separation and also 
    // to filter through less questions. This could refactored to already 
    // having all of the question data off of passing down the object in the 'post question' return result
    this.props.socket.on('postedQ', question => {
      console.log("NEW POSTED Q", question)

      // only post for the student and all the tutors 
      if (this.props.user.type === "tutor" || this.props.user.id === question.profile_id){
        var context = this;
        axios
        .get('/api/questions/'+question.id)
        .then(question => {

          this.filterTutorQ(this.props.filter, [question.data], filteredq => {
            var allfilteredqs = filteredq.concat(this.state.questions);
            allfilteredqs = uniqBy(allfilteredqs, 'id');

            context.setState({ questions: allfilteredqs })
          })
        })
        .catch(error => {
          console.error('axios error', error)
        });
      }


      // getUserQ(this.props.userinfo.id, questions => this.setState({ questions }))
    })


    // when a student logs off 
    this.props.socket.on('re-renderQs', () => {
      console.log("USER LOGGED OFF")
      // reset this.props.questionlist to the online qs, based on the current filter 
      // do a fresh call to find all online questions, since this.props.question is old off IndexPage 
        
      var context = this;
      getAllOnlineQ(onlinequestions => {
        this.filterTutorQ(undefined, onlinequestions, filteredq => {
          context.setState({ questions: filteredq })
        });
      })

    })

    var context = this;
    this.props.socket.on('newonlineuser', userid => {
      console.log("NEW USER ONLINE")
      // console.log(this.state.questions, "CURRENT QUESTIONS IN STATE")


      // if tutor, get all of user questions and pass through the filterTutorQ
      if (this.props.user.type === "tutor"){
        getUserQ(userid, questions => {

          this.filterTutorQ(this.props.filter, questions, filteredq => {

            var allfilteredqs = this.state.questions.concat(filteredq);
            allfilteredqs = uniqBy(allfilteredqs, 'id');

            context.setState({ questions: allfilteredqs })
          })
        })
      }

    })
  }

  componentDidMount() {
    if (this.props.user.type === null){
      axios
      .get('/redirectsignup')
    } else if (this.props.user.type === 'tutor'){
      this.props.getProfileSkills(this.props.user.id);

      // find online qs and pass to filter
      var context = this;
      getAllOnlineQ(onlinequestions => {
        this.filterTutorQ(undefined, onlinequestions, filteredq => {
          context.setState({ questions: filteredq })
        });
      })


    } else if (this.props.user.type === 'student'){
      getUserQ(this.props.userinfo.id, questions => this.setState({ questions }))

    }


   }

  filterTutorQ(filter, qs=this.state.questions, cb) {
    // note: Because of the following reasons, the questionlist is being stored in state vs. Redux:
    // 1) Anti-pattern to mutate Redux props (I believe)
    // 2) Redux prop doesn't get updated until the render, so it's useless in this function
    // 3) Because componentWillReceiveProps calls this function, it's an infinite loop


    if (!filter || filter[0] === 0 || filter.length === 0){
      cb(qs)
    } else if (filter[0] === 2){

      // return all of the questions that match the category of the profile skills
      // console.log(this.props.skills, "DID TUTOR SKILLS GET PASSED?")
      // for each profile skill, return the question from that tag
      getQbyTags(this.props.skills, skillquestions => {
        cb(skillquestions)
      })

    } else if (filter[0] === 3){
      
      var filteredtagonlineq = [];
      
      qs.map(onlineq => {
        if (onlineq.tag_name === filter[1]){
          filteredtagonlineq.push(onlineq)
        }
      })

      console.log(filteredtagonlineq, "WHAT IS BEING PASSED INTO CB?")

      cb(filteredtagonlineq)

    } else if (filter[0] === 4){
      // find the union between array of all questions by taglet and all online questions
      var filteredtaglets = []
      getQbyTaglet(filter[1], tagletquestions => {
        tagletquestions.forEach(question => {
          qs.map(onlineq => {
            if (question.question_id === onlineq.id){
              filteredtaglets.push(onlineq)
            }
          })
        })
        cb(filteredtaglets)  
      })
    }
  }

  componentWillReceiveProps(newProps){
        // will receive filter 
    // console.log(newProps.filter, "WHAT IS NEW FILTER?")

   var context = this;
   getAllOnlineQ(onlinequestions => {
      this.filterTutorQ(newProps.filter, onlinequestions, filteredq => {
        context.setState({ questions: filteredq })
      });
    })

  }

  

  render(){

    // console.log(this.state.questions, "WHAT IS BEING RENDERED?")

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
  // userq: state.userquestions, 
  skills: state.skills, 
  questionlist: state.questionlist, 
  filter: state.filter
});

const mapDispatchToProps = dispatch => ({
  getUserQ: questions => dispatch(getUserQuestions()), 
  getProfileSkills: profileid => dispatch(getProfileSkills(profileid)),
  setQ: questions => dispatch(setQ(questions))
})


export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
