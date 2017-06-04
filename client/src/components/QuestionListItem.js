import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import axios from 'axios';
import { connect } from 'react-redux'


class QuestionListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      broadcastSocket: props.broadcastSocket,
      expanded: false,
      userInformation: {},
      questionUserName: "",
      questionAvatar: null
    }
    this.broadcast = this.broadcast.bind(this);
    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleReduce = this.handleReduce.bind(this);
  }

componentDidMount() {
  axios
    .get(`/api/profiles/${this.props.question.profile_id}`)
    .then(response => {
      this.setState({questionUserName: response.data.display})
      this.setState({questionAvatar: response.data.avatar})
    })
}

broadcast() {
  this.state.broadcastSocket(this.props.question.profile_id)
}

handleExpandChange (expanded) {
  this.setState({expanded: expanded});
};

handleToggle (event, toggle) {
  this.setState({expanded: toggle});
};

handleExpand () {
  this.setState({expanded: true});
};

handleReduce () {
  this.setState({expanded: false});
};



render() {
  var label = "ANSWER QUESTION"
  if (this.props.user.type === 'student'){
    label = ""
  }

return (
  <div style={style.card}>
    <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={this.state.questionUserName}
          subtitle={this.props.question.title}
          avatar={this.state.questionAvatar || "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50"}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <p style={{fontSize: "30px;"}}>{this.props.question.body}</p>
        </CardText>
        <CardActions expandable = {true}>
          <FlatButton label={label} primary={true} onTouchTap={this.broadcast} />
        </CardActions>
      </Card>
  </div>

)
}

}

const mapStateToProps = (state) => ({
  user: state.userid,
  userq: state.userquestions
});


export default connect(mapStateToProps, null)(QuestionListItem)

const style = {
  card: {
    margin: 10,
    opacity: 0.92
  }
};
