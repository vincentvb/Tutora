import React from 'react';
import QuestionListItem from './QuestionListItem.js';
import uniqBy from 'lodash/uniqBy';
import { connect } from 'react-redux';
import { setQ } from '../actionCreators.js' 

    // console.log(uniqBy(test, 'id'), "UNIQ TEST VALUE");

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
    
    // this.filterOnlineQ = this.filterOnlineQ.bind(this);
  }

  componentWillMount() {
    

  }
  

  render() {
    // var questions = this.props.questionlist;
    // console.log(this.props.questionlist, "QL QUESTIONS ON RENDER")

    if (this.props.questionlist.length > 0) {
      return (
        <div>
        {this.props.questionlist.map(question =>
          <QuestionListItem userName = {this.props.userName} key={question.id} question={question} broadcastSocket = {this.props.broadcastSocket} />

        )}
        </div>
      )
    } else {
     return <div>Hello</div>
   }
  }
}

const mapStateToProps = (state) => ({
  questionlist: state.questionlist
});

const mapDispatchToProps = dispatch => ({
  setQ: questions => dispatch(setQ(questions))
})


export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
