import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


class QuestionListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      broadcastSocket: props.broadcastSocket
    }
    this.broadcast = this.broadcast.bind(this);
  }

broadcast() {
  this.state.broadcastSocket(this.props.question.profile_id)
}

render() {

return (
  <div style={style.card}>
    <Card>
      <CardHeader
        title={this.props.question.title}
      />
    <CardText>{this.props.question.body} {this.props.question.profile_id} </CardText>
    <FlatButton label="Answer Question" primary={true} onTouchTap={this.broadcast} />
    </Card>
  </div>

)
}

}


export default QuestionListItem

const style = {
  card: {
    margin: 10,
  }
};
