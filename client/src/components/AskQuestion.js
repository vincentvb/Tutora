import React from 'react';
import axios from 'axios';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionQuestionAnswer from 'material-ui/svg-icons/action/question-answer';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Modal from 'react-modal';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Exit from 'material-ui/svg-icons/content/clear';
import Write from 'material-ui/svg-icons/content/create';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';



class AskQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      questions: [],
      modalIsOpen: false,
      questionInput: '',
      questionTitle: '',
      questionDescription: ''
    };
    this.postQuestion = this.postQuestion.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
  }

  postQuestion() {
    var body = {
      title: this.state.questionInput,
      body: this.state.questionDescription,
      userid: this.props.id,
      image: 'www.placeholder.com'
    };

    axios.post('/api/questions', body)
    .then(response => {
      console.log('Posted question to server. ', response);
    })
    .catch(error => {
      console.log('Error while posting to the server, ', error);
    });

    this.closeModal();
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = 'black';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleQuestionInput(event) {
    this.setState({
      questionInput: event.target.value
    });
  }

  handleDescriptionInput(event) {
    this.setState({
      questionDescription: event.target.value
    });
  }

  render() {
   const actions = [
   <FlatButton
     label="Submit"
     primary={true}
     keyboardFocused={true}
     onTouchTap={this.postQuestion}
   />,
 ];
    return (
      <div>
        <FloatingActionButton style={style} onClick={this.openModal} >
          <ActionQuestionAnswer/>
        </FloatingActionButton>

        <Dialog
          title="Post Your Question"
          actions = {actions}
          modal={false}
          open={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        >
          <br></br>
          <TextField
            className="questionTitle"
            placeholder="Question"
            onChange={this.handleQuestionInput}
            id="title"
          />
          <br></br>
          <TextField
            className="questionBody"
            onChange={this.handleDescriptionInput}
            id="description"
            multiLine={true}
            rows={2}
            floatingLabelText="Description"
          />
        </Dialog>
      </div>
    )
  }
}

const style = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};

const iconstyle = {
  float: 'right'
};

const style2 = {
  margin: 12
};

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default AskQuestion
