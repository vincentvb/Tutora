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
import { getAllQ, getUserQ, getQbyTag, getOnlineQ, getQbyTaglet } from '../network.js';


class QuestionPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      questions: [],
      redirectToReg: false
    }

    this.filterTutorQ = this.filterTutorQ.bind(this);
    // this.filterOnlineQ = this.filterOnlineQ.bind(this);

    // when a user goes offline 
    this.props.socket.on('deleteOfflineQs', () => {
      console.log("DELETING QUESTIONS");

      // reset this.props.questionlist to the online qs, based on the current filter 
      // do a fresh call to find all online questions, since this.props.question is old off IndexPage 
        
      getAllQ(questions => {
        var context = this;
        getOnlineQ(questions, context, onlineall => {
          this.filterTutorQ(this.props.filter, onlineall, filteredq => {
            context.setState({ questions: filteredq })
          })
        })
      })

    })

    // when a user comes online
    var context = this;
    this.props.socket.on('newonlineuser', userid => {
      // check if newuser's questions match the filters 
      // if so, render it.

      // get all of user questions and pass through the filterTutorQ
      getUserQ(userid, questions => {
        this.filterTutorQ(this.props.filter, questions, filteredq => {
          var allfilteredqs = this.state.questions.concat(filteredq)

          context.setState({ questions: allfilteredqs })
        })
      })

    })
  }

  componentDidMount() {
    if (this.props.user.type === null){
      axios
      .get('/redirectsignup')
    } else if (this.props.user.type === 'tutor'){
      this.props.getProfileSkills(this.props.user.id);


      // get all Qs, find the online ones and then pass to the filter
      var context = this;

      getAllQ(questions => {
        getOnlineQ(questions, context, onlinequestions => {
          this.filterTutorQ(undefined, onlinequestions, filteredq => {
            context.setState({ questions: filteredq })
          });
            
        })
      })


    } else if (this.props.user.type === 'student'){
      getUserQ(this.props.userinfo.id, questions => this.setState({ questions }))

    }


   }

   // re-usable for one question or for many questions 
  filterTutorQ(filter, qs=this.state.questions, cb) {
    // note: Because of the following reasons, the questionlist is being stored in state vs. Redux:
    // 1) Anti-pattern to mutate Redux props (I believe)
    // 2) Redux prop doesn't get updated until the render, so it's useless in this function
    // 3) Because componentWillReceiveProps calls this function, it's an infinite loop


    // console.log(qs, "WHAT Qs are BEING PASSED TO FILTER?")
    // console.log(filter, "WHAT IS THE CURRENT FILTER?")

    if (!filter || !filter[1]){
      // console.log("ARE YOU SETTING THE Q?")
      
      cb(qs)
      // this.setState({ questions: qs })

    } else if (filter[0] === 3){
      
      var filteredtagonlineq = [];
      
      // console.log("AM I ON FILTER 3?")

      qs.map(onlineq => {

        // console.log(onlineq.tag_name, "ONLINE TAG NAME")
        // console.log(filter[1], "WHAT IS THE MATCHING FILTER?")

        if (onlineq.tag_name === filter[1]){
          // console.log(onlineq, "WHAT AM I PUSHING INTO FILTEREDTAG")
          filteredtagonlineq.push(onlineq)
          // console.log(filteredtagonlineq, "WHAT AM I SETTING THE STATE TO?")
        }
      })

      cb(filteredtagonlineq)
      // this.setState({ questions: filteredtagonlineq })

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

        // console.log(filteredquestions, "WHAT IS PUT INTO STATE?")
  


    // console.log(this.state.questions, "QUESTIONS")

    // this.filterOnlineQ(this.props.questionlist);
    // this.setState({ questions });
  }

  componentWillReceiveProps(newProps){
    // will receive filter 
    console.log(newProps, "WHAT IS NEW PROP IS BEING RECEIVED?")

    var context = this;
    this.filterTutorQ(newProps.filter, undefined, filteredq => {
      context.setState({ questions: filteredq })
    })
  }

  

  render(){

    console.log(this.state.questions, "QUESTION STATE FROM QP")
    // console.log(this.props.questionlist, "QUESTION PROPS FROM QP")

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

    // axios
    // .get('/api/questions/online', { questions: Qs })
    // .then(response => console.log(response.data))
    // .catch(error => console.log(error, "axios error"))

const Qs = [
  {
    "id": 98,
    "title": "b",
    "body": "as",
    "profile_id": 19,
    "image": "https://s3-us-west-1.amazonaws.com/talentedtoasters%2Fquestionpictures/0.6120620838305275%3Auserid19",
    "created_at": "2017-06-10T05:55:17.387Z",
    "updated_at": "2017-06-10T05:55:17.387Z",
    "status": null,
    "feedback_rating": null,
    "answerer_id": null,
    "tag_id": 3,
    "tag_name": "History"
  },
  {
    "id": 99,
    "title": "a",
    "body": "df",
    "profile_id": 19,
    "image": "https://s3-us-west-1.amazonaws.com/talentedtoasters%2Fquestionpictures/0.48726806442156456%3Auserid19",
    "created_at": "2017-06-10T06:22:54.965Z",
    "updated_at": "2017-06-10T06:22:54.965Z",
    "status": null,
    "feedback_rating": null,
    "answerer_id": null,
    "tag_id": 6,
    "tag_name": "Chemistry"
  },
  {
    "id": 100,
    "title": "bleh",
    "body": "fd",
    "profile_id": 20,
    "image": "https://s3-us-west-1.amazonaws.com/talentedtoasters%2Fquestionpictures/0.4511479572865298%3Auserid20",
    "created_at": "2017-06-10T14:47:37.039Z",
    "updated_at": "2017-06-10T14:47:37.039Z",
    "status": null,
    "feedback_rating": null,
    "answerer_id": null,
    "tag_id": 4,
    "tag_name": "Art"
  },
  {
    "id": 101,
    "title": "q",
    "body": "ad",
    "profile_id": 19,
    "image": "https://s3-us-west-1.amazonaws.com/talentedtoasters%2Fquestionpictures/0.6986156385175355%3Auserid19",
    "created_at": "2017-06-10T15:12:04.192Z",
    "updated_at": "2017-06-10T15:12:04.192Z",
    "status": "false",
    "feedback_rating": null,
    "answerer_id": null,
    "tag_id": 1,
    "tag_name": "Math"
  },
  {
    "id": 102,
    "title": "Q made in real browser by A",
    "body": "dfs",
    "profile_id": 19,
    "image": "https://s3-us-west-1.amazonaws.com/talentedtoasters%2Fquestionpictures/0.16513729717838643%3Auserid19",
    "created_at": "2017-06-10T15:16:23.345Z",
    "updated_at": "2017-06-10T15:16:23.345Z",
    "status": "false",
    "feedback_rating": null,
    "answerer_id": null,
    "tag_id": 5,
    "tag_name": "Physics"
  },
  {
    "id": 103,
    "title": "Q1 made Incognito by B",
    "body": "",
    "profile_id": 20,
    "image": "https://s3-us-west-1.amazonaws.com/talentedtoasters%2Fquestionpictures/0.9275015076509165%3Auserid20",
    "created_at": "2017-06-10T15:17:20.023Z",
    "updated_at": "2017-06-10T15:17:20.023Z",
    "status": "false",
    "feedback_rating": null,
    "answerer_id": null,
    "tag_id": 7,
    "tag_name": "Grammar"
  },
  {
    "id": 104,
    "title": "Q2 made in real browser by B",
    "body": "",
    "profile_id": 20,
    "image": "https://s3-us-west-1.amazonaws.com/talentedtoasters%2Fquestionpictures/0.6420845843718817%3Auserid20",
    "created_at": "2017-06-10T15:17:53.477Z",
    "updated_at": "2017-06-10T15:17:53.477Z",
    "status": "false",
    "feedback_rating": null,
    "answerer_id": null,
    "tag_id": 6,
    "tag_name": "Chemistry"
  },
  {
    "id": 105,
    "title": "q3 from A 19",
    "body": "",
    "profile_id": 19,
    "image": "https://s3-us-west-1.amazonaws.com/talentedtoasters%2Fquestionpictures/0.6229121555636827%3Auserid19",
    "created_at": "2017-06-11T17:16:49.707Z",
    "updated_at": "2017-06-11T17:16:49.707Z",
    "status": null,
    "feedback_rating": null,
    "answerer_id": null,
    "tag_id": 9,
    "tag_name": "Biology"
  },
  {
    "id": 53,
    "title": "American History",
    "body": "Who was the founding fathers? Why no founding mothers? I need some clarification.",
    "profile_id": 10,
    "image": "www.testimage.com",
    "created_at": "2017-06-09T00:54:58.991Z",
    "updated_at": "2017-06-09T00:54:58.991Z",
    "status": null,
    "feedback_rating": null,
    "answerer_id": null,
    "tag_id": null,
    "tag_name": null
  },
  {
    "id": 54,
    "title": "5th grade algebra",
    "body": "I really need some help actually. I am going crazy.",
    "profile_id": 10,
    "image": "www.testimage.com",
    "created_at": "2017-06-09T00:54:58.996Z",
    "updated_at": "2017-06-09T00:54:58.996Z",
    "status": null,
    "feedback_rating": null,
    "answerer_id": null,
    "tag_id": null,
    "tag_name": null
  },
  {
    "id": 55,
    "title": "Super interested in the Swedish Era of Great Power",
    "body": "What is it about this world nation that makes it so powerfull? Any smart Swedes that can lecture me?",
    "profile_id": 10,
    "image": "www.testimage.com",
    "created_at": "2017-06-09T00:54:59.000Z",
    "updated_at": "2017-06-09T00:54:59.000Z",
    "status": null,
    "feedback_rating": null,
    "answerer_id": null,
    "tag_id": null,
    "tag_name": null
  },
  {
    "id": 56,
    "title": "What is rat?",
    "body": "I hear someone mention it. Biologi 101.",
    "profile_id": 10,
    "image": "www.testimage.com",
    "created_at": "2017-06-09T00:54:59.003Z",
    "updated_at": "2017-06-09T00:54:59.003Z",
    "status": null,
    "feedback_rating": null,
    "answerer_id": null,
    "tag_id": null,
    "tag_name": null
  },
  {
    "id": 94,
    "title": "a",
    "body": "dsa",
    "profile_id": 19,
    "image": "https://s3-us-west-1.amazonaws.com/talentedtoasters%2Fquestionpictures/0.570288851546225%3Auserid19",
    "created_at": "2017-06-09T21:40:04.968Z",
    "updated_at": "2017-06-09T21:40:04.968Z",
    "status": null,
    "feedback_rating": null,
    "answerer_id": null,
    "tag_id": 1,
    "tag_name": "Math"
  }
]

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
