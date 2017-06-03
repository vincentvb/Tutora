import React from 'react';
import QuestionListItem from './QuestionListItem.js'

const QuestionList = (props) => {
  console.log(props.questions.length)
 return (
  <div>
  {props.questions.map(question =>
    <QuestionListItem key={question.id} question={question} broadcastSocket = {props.broadcastSocket} />
  )}
   </div>


)
}

export default QuestionList;
