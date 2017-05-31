import React from 'react';
import axios from 'axios';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Modal from 'react-modal';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Exit from 'material-ui/svg-icons/content/clear';
import Write from 'material-ui/svg-icons/content/create';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

class AskQuestion extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userID: 3,
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
      userid: this.state.userID,
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
    return (
      <div>
        <h1> Question </h1>

        <FloatingActionButton style={style} onClick={this.openModal} >
          <ContentAdd/>
        </FloatingActionButton>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Modal"
        >
          <IconButton onClick={this.closeModal} style={iconstyle}>
            <Exit />
          </IconButton>
          <h3 ref={subtitle => this.subtitle = subtitle}>Ask a question</h3>
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
          <br></br>
          <RaisedButton
            label = "Post"
            primary = {true}
            style = {style2}
            class="btn"
            icon={<Write />}
            onClick={this.postQuestion}
           />
        </Modal>

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