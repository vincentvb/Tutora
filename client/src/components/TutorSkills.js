import React from 'react'
import Modal from 'react-modal'
import axios from 'axios';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class TutorSkills extends React.Component {
  constructor(props){
    super(props)

    this.state = { value: '' }

    this.handleSelectChange = this.handleSelectChange.bind(this);
  
  }

  componentDidMount(){



    // axios
    //   .post('/api/profiles/updateProfileSkills', { profileId: 8, tag: "History"} )
    //   .then(response => {
    //     console.log('Success', response);
    //   })
    //   .catch(error => {
    //     console.log('Error while updating Skills', error);
    //   });
  }

  handleSelectChange(value){
    console.log("Selected: ", value)
    this.setState({ value })
  }

  render(){
    
    var options = this.props.tags.map(function(tag){
      return { value: tag, label: tag }
    })

    return ( 
      <div>
        Tutor Skills

      <Select
        multi
        simpleValue 
        value={this.state.value}
        placeholder="Select your skills"
        name="register-skills"
        options={options}
        onChange={this.handleSelectChange}
      />

      

      </div>
      )
  }
}

const mapStateToProps = (state) => ({
  user: state.userid,
  tags: state.tags
});

export default connect(mapStateToProps, null)(TutorSkills);