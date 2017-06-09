import React from 'react';
import Select from 'react-select';

class Taglets extends React.Component{
  constructor(props){
    super(props)
  
    this.state = { }
  }

  render(){
    return (

      <Select.Creatable
            multi
            value={this.props.tagletsValue}
            placeholder="Start typing to add tags to your question."
            name="tag-questions"
            options={this.props.options}
            onChange={this.props.updateTagletsValue}
            style={{marginBottom: 20, marginTop: 20}}
      />


    )
  }

}


export default Taglets