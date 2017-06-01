import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const QuestionListItem = ({question}) => (
  <div style={style.card}>
    <Card>
      <CardHeader
        title={question.title}
      />
      <CardText>{question.body} </CardText>
    </Card>
  </div>

)


export default QuestionListItem

const style = {
  card: {
    margin: 10,
  }
};
