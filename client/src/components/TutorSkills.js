import React from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class TutorSkills extends React.Component {
  constructor(props){
    super(props)

    this.state = { 
      value: '',
      modalIsOpen: false
    }

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.registerSkills = this.registerSkills.bind(this);
  
  }

  componentDidMount(){

    if (this.props.user.type.toLowerCase() === 'tutor'){
      axios
      .get('/api/tags/profile/'+this.props.user.id)
      .then(skills => {
        var skillsarr = skills.data.map(skill => skill.tags.value);
        if (skillsarr.length === 0){
          this.setState({ modalIsOpen: true })
        }

      })
      .catch(error => {
        console.error('axios error', error)
      });
    }

    
  }

  registerSkills(){
    var skillsarr = this.state.value.split(",");

    axios
      .post('/api/profiles/updateProfileSkills', { profileId: this.props.user.id, tags: skillsarr} )
      .then(response => {
        console.log('Success', response);
      })
      .catch(error => {
        console.log('Error while updating Skills', error);
      });

    this.setState({ modalIsOpen: false })
  }

  handleSelectChange(value){
    // console.log("Selected: ", value)
    this.setState({ value: value })
  }

  render(){
    const actions = [
     <FlatButton
       label="Submit"
       primary={true}
       keyboardFocused={true}
       onTouchTap={this.registerSkills}
     />,
    ];

    var options = this.props.tags.map(function(tag){
      return { value: tag.value, label: tag.value }
    })

    return ( 
      <div>
      
      <Dialog
          title="Choose your skills"
          titleStyle = {{textAlign: "center"}}
          actions = {actions}
          modal={false}
          open={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={{height: 400}}
          >
      <div className="skillsText"> Add areas of expertise to your profile. We'll show you questions that best match your skills. </div>   

      <Select
        multi
        simpleValue 
        value={this.state.value}
        placeholder="Select your skills"
        name="register-skills"
        options={options}
        onChange={this.handleSelectChange}
      />

      <div className="paddingSkills"></div>
      </Dialog>

      </div>
    
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userid,
  tags: state.tags, 
  skills: state.skills
});

export default connect(mapStateToProps, null)(TutorSkills);