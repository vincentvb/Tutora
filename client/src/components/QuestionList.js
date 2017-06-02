import React from 'react';
import QuestionListItem from './QuestionListItem.js'

const QuestionList = (props) => {
  console.log(props.questions.length)
 return (
  <div>
  {props.questions.map(question =>
    <QuestionListItem question={question} broadcastSocket = {props.broadcastSocket} />
  )}
   </div>


)
}

export default QuestionList;
