import React from 'react';
import QuestionListItem from './QuestionListItem.js'

const QuestionList = ({questions}) => (
  <div>
  {questions.map(question => 
    <QuestionListItem question={question} key={question.id} />
  )}
   </div>
  

)

export default QuestionList;