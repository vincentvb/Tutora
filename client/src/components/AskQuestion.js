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
import Trash from 'material-ui/svg-icons/content/undo';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { getTags, getTaglets } from '../actionCreators.js';
import Select from 'react-select';
import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Taglets from './Taglets.js'

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
      tagValue: '',
      tagId: '',
      tagletsValue: [],
      logged: false, 
      options: []
    };
    this.postQuestion = this.postQuestion.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
    this.handleSnackBarQuestionClose = this.handleSnackBarQuestionClose.bind(this);
    this.imageInput = this.imageInput.bind(this);
    this.handleTagletsChange = this.handleTagletsChange.bind(this);
    this.handleToggleChange = this.handleToggleChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.updateTagletsValue = this.updateTagletsValue.bind(this);
    this.imgUploadClick = this.imgUploadClick.bind(this);
  }

  componentWillMount(){
    this.props.getTags();
    this.props.getTaglets();
  }

  updateTagletsValue(value){
    this.setState({ tagletsValue : value })
  }

  postQuestion() {
    var body = {
      title: this.state.questionInput,
      body: this.state.questionDescription,
      userid: this.props.id,
      image: null,
      tags: this.state.tagValue, 
      taglets: this.state.tagletsValue
    };

    var refToSocket = this.props.socket;
    var refToThis = this;

    if (this.state.imageInput !== null) {
      var image = this.state.imageInput.slice();
      var reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onload = function() {
        body.image = reader.result.split('base64,')[1];
        axios.post('/api/questions', body)
        .then(response => {
          console.log('Posted question to server WHICH ONE. ', response.data);
          refToSocket.emit('postedQ', response.data)
          refToThis.setState({imageInput: null});
        })
        .catch(error => {
          console.log('Error while posting to the server, ', error);
        });
      }
    } else {
      axios.post('/api/questions', body)
      .then(response => {
        console.log('Posted question to server. ', response.data);
        refToSocket.emit('postedQ', response.data)
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

  handleToggleChange(event, logged) {
    this.setState({logged: logged});
  }

  handleTagChange(event, index, value){
    var tagId = "";
    this.props.tags.forEach(function(tag){
      if (tag.value === value){
        tagId = tag.id
      }
    })

    axios
    .get('/api/tags/taglets/'+tagId)
    .then(taglets => {
      var options = taglets.data.map(function(taglet){
        return { value: taglet.value, label: taglet.value }
      });
      console.log(options, "TAGLET OPTIONS");
      this.setState({ options: options });
    })
    .catch(error => {
      console.error('error redirect', error)
    })

    this.setState({ tagValue: value })
  }

  handleTagletsChange(value){
    this.setState({ tagletsValue: value })
  }

  imgUploadClick() {
    this.setState({imageInput: null});
  }

  render() {
    var options = this.props.taglets.map(function(tag){
      return { value: tag, label: tag }
    });

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
          autoScrollBodyContent={true}
        >

          <TextField
            className="questionTitle"
            fullWidth = {true}
            onChange={this.handleQuestionInput}
            floatingLabelText="Description"
            id="title"
          />

        {/* note: On the UI form, tags are "Category" and taglets are "Question Tags" */}
          <SelectField required
            floatingLabelText="Category"
            value={this.state.tagValue}
            onChange={this.handleTagChange}
          >

           {this.props.tags.map((tag) => 
             <MenuItem value={tag.value} primaryText={tag.value} key={tag.id} /> 
            )}

        
          </SelectField>

            <TextField
              className="questionBody"
              onChange={this.handleDescriptionInput}
              id="description"
              fullWidth= {true}
              multiLine={true}
              rows={4}
              floatingLabelText="Body"
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
            {this.state.imageInput ? (
              <div style={{margin: 10, color: "#006064"}} onClick={this.imgUploadClick}>
                <Trash/>
                Chosen image: {this.state.imageInput.name}
              </div>
            ) : (
              <div></div>
            )}
          <div style={{marginBottom: 10}}></div>
          <Taglets options={this.state.options} tagletsValue={this.state.tagletsValue} updateTagletsValue={this.updateTagletsValue} />
          {this.props.funds >= 5 ? (
            <div>
              Tips from your friends at Tutora: Pay the Tutor $5 to get faster response from saught after tutors!
              <Toggle
                label="Paid Question"
                defaultToggled={false}
                onToggle={this.handleToggleChange}
                labelPosition="right"
                style={{margin: 20}}
              />
            </div>
          ) : (
            <div>
              Add money to your Tutora to be able to get paid help!
            </div>
          )}
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
  tags: state.tags, 
  taglets: state.taglets
});

const mapDispatchToProps = dispatch => ({
  getTags: tags => dispatch(getTags()), 
  getTaglets: taglets => dispatch(getTaglets())
});

export default connect(mapStateToProps, mapDispatchToProps)(AskQuestion)
