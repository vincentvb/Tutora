import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import axios from 'axios';
import { connect } from 'react-redux';
import { setQuestioner, setAnswerer } from '../actionCreators.js';
import Chip from 'material-ui/Chip';
import { getTagletsbyQ } from '../network.js';


class QuestionListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      broadcastSocket: props.broadcastSocket,
      expanded: false,
      userInformation: {},
      questionUserName: "",
      questionAvatar: null, 
      modalIsOpen: false, 
      tags: []
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
      this.setState({ questionUserName: response.data.display || response.data.first+' '+response.data.last})
      this.setState({ questionAvatar: response.data.avatar })
    })
  
    getTagletsbyQ(this.props.question.id, tags =>{
      var tagsarr = [{ key: 0, label: this.props.question.tag_name }]
      tags.forEach(function(tag, idx){
        tagsarr.push({ key: idx+1, label: tag.taglets.value })
      })
      this.setState({ tags: tagsarr })
    })
  }

  broadcast() {
    this.state.broadcastSocket(this.props.question.profile_id, this.props.question.id);
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

  renderChip(data){
    return (
      <Chip key={data.key} style={styles.chip}> 
        {data.label}
      </Chip>
    );
  }

  render() {
    var label = "ANSWER QUESTION"
    if (this.props.user.type === 'student'){
      label = ""
    }
    return (
      <div style={styles.card}>

        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
            <CardHeader
              title={this.props.question.title}
              titleStyle={styles.title}

              subtitleStyle={styles.wrapper}
              subtitle={this.state.tags.map(this.renderChip, this)}
              avatar={this.state.questionAvatar || "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50"}
              actAsExpander={true}
              showExpandableButton={true}
            />

            <CardText expandable={true}>
              <p style={{fontSize: "15px"}}>{this.props.question.body}</p>

            </CardText>
            {this.props.question.image ? (
              <CardMedia expandable={true}>
                <img 
                  src={this.props.question.image}
                />
              </CardMedia>
              ) : (
              <div></div>
            )}
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
  questioner: state.questioner,
  skills: state.skills
});

const styles = {
  card: {
    margin: 10,
    opacity: 0.93
  }, 
  chip: {
    margin: 2,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 20, 
    fontWeight: 'bold'
  }
};

export default connect(mapStateToProps, null)(QuestionListItem)
