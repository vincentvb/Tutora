import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 150,
  },
};

class FilterCategory extends React.Component {
  constructor(props){
    super(props)

    this.state = { value: 1}

    this.handleChange = this.handleChange.bind(this);
        
  }

  handleChange(event, index, value){
    this.setState({value});
  }

  render() {
    return (
      <div>
        <SelectField
          floatingLabelText="Filter Student Questions By"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <MenuItem value={1} primaryText="None" />
          <MenuItem value={2} primaryText="Recommended" />
          <MenuItem value={3} primaryText="Category" />
          <MenuItem value={4} primaryText="Tag" />
        </SelectField>

      </div>
    )
  }
}

export default FilterCategory;