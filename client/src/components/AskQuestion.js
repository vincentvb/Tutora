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
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { getTags } from '../actionCreators.js';
import Select from 'react-select';


class AskQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      questions: [],
      modalIsOpen: false,
      questionInput: '',
      questionTitle: '',
      questionDescription: '',
      snackBarQuestion: false,
      imageInput: null,
      value: ''
    };
    this.postQuestion = this.postQuestion.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
    this.handleSnackBarQuestionClose = this.handleSnackBarQuestionClose.bind(this);
    this.imageInput = this.imageInput.bind(this);
    this.handleSelectTagsChange = this.handleSelectTagsChange.bind(this);
  }

  componentWillMount(){
    this.props.getTags()
  }

  handleSelectTagsChange(value){
    // console.log("Selected: ", value)
    this.setState({ value: value })
  }

  postQuestion() {
    var tagsarr = this.state.value.split(",");

    var body = {
      title: this.state.questionInput,
      body: this.state.questionDescription,
      userid: this.props.id,
      image: null,
      image: 'www.placeholder.com', 
      tags: tagsarr
    };

    if (this.state.imageInput !== null) {
      var image = this.state.imageInput.slice();
      var reader = new FileReader();
      reader.readAsDataURL(image);

      var refToSocket = this.props.socket;
      
      reader.onload = function() {
        body.image = reader.result.split('base64,')[1];
        axios.post('/api/questions', body)
        .then(response => {
          console.log('Posted question to server. ', response);
        })
        .then(() => {
          console.log('here')
          refToSocket.emit('updateQuestions', () => {
          })
        })
        .catch(error => {
          console.log('Error while posting to the server, ', error);
        });
      }
    } else {
      axios.post('/api/questions', body)
      .then(response => {
        console.log('Posted question to server. ', response);
      })
      .then(() => {
        this.props.socket.emit('updateQuestions', () => {
        })
      })
      .catch(error => {
        console.log('Error while posting to the server, ', error);
      });
    }
    

    this.setState({snackBarQuestion: true})

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

  handleSnackBarQuestionClose () {
    this.setState({
      snackBarQuestion: false
    })
  }

  imageInput(event) {
    this.setState({
      imageInput: event.target.files[0]
    });
  }

  render() {


    // console.log(this.state.imageInput);

   // console.log(this.props.tags, "TAGS FROM REDUX")
    var options = this.props.tags.map(function(tag){
      return { value: tag, label: tag }
    })


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
        <Snackbar
          open={this.state.snackBarQuestion}
          message="Your Question Has Been Posted!"
          action="close"
          autoHideDuration={5000}
          onActionTouchTap={this.handleSnackBarQuestionClose}
        />
        <FloatingActionButton style={style} onClick={this.openModal} >
          <ActionQuestionAnswer/>
        </FloatingActionButton>

        <Dialog
          title="Post Your Question"
          titleStyle = {{textAlign: "center"}}
          actions = {actions}
          modal={false}
          open={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        >
          <TextField
            className="questionTitle"
            fullWidth = {true}
            onChange={this.handleQuestionInput}
            floatingLabelText="Question Description"
            id="title"
          />
          <TextField
            className="questionBody"
            onChange={this.handleDescriptionInput}
            id="description"
            fullWidth= {true}
            multiLine={true}
            rows={4}
            floatingLabelText="Question Body"
          />

          <RaisedButton
            containerElement='label'
            label='Upload a picture'>
              <input 
                type="file" 
                style={{ display: 'none' }} 
                onChange={this.imageInput}
                accept='image/*'
              />
          </RaisedButton>
          <div style={{marginBottom: 10}}></div>
          <Select
            multi
            simpleValue 
            value={this.state.value}
            placeholder="Add tags to your question"
            name="tag-questions"
            options={options}
            onChange={this.handleSelectTagsChange}
          />

          <div className="paddingSkills"></div>
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

const mapStateToProps = (state) => ({
  tags: state.tags
});


const mapDispatchToProps = dispatch => ({
  getTags: tags => dispatch(getTags())
})
  
export default connect(mapStateToProps, mapDispatchToProps)(AskQuestion)
