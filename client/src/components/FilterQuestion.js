import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FilterCategory from './FilterCategory.js';
import { connect } from 'react-redux';
import { setQ } from '../actionCreators.js';
import { getAllQ, getQbyTag } from '../network.js';


const styles = {
  customWidth: {
    width: 150,
  },
};

class FilterQuestion extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      showCategory: false
    }

    this.handleChange = this.handleChange.bind(this);
        
  }

  handleChange(event, index, value){
    // this.props.setFilter(value);
    if (value === 1){
      getAllQ(questions => this.props.setQ(questions));
    } else if (value === 3 || value === 4){
      this.setState({ showCategory: true })
    } 

    console.log()

  }

  render() {
    return (
      <div>
        <SelectField
          floatingLabelText="Filter Student Questions By"
          value={this.props.filter}
          onChange={this.handleChange}
        >
          <MenuItem value={1} primaryText="None" />
          <MenuItem value={2} primaryText="Recommended" />
          <MenuItem value={3} primaryText="Category" />
          <MenuItem value={4} primaryText="Tag" />
        </SelectField>

        <div>
          {this.state.showCategory ? <FilterCategory /> : null}
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  filter: state.filter, 
})

const mapDispatchToProps = dispatch => ({
  setQ: questions => dispatch(setQ(questions))
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterQuestion);

//   "id": 53,
//   "title": "American History asked by 19, A",
//   "body": "Who was the founding fathers? Why no founding mothers? I need some clarification.",
//   "profile_id": 19,
//   "image": "www.testimage.com",
//   "created_at": "2017-06-09T00:54:58.991Z",
//   "updated_at": "2017-06-09T00:54:58.991Z",
//   "status": null,
//   "feedback_rating": null,
//   "answerer_id": null,
//   "tag_id": null,
//   "tag_name": null
// }, {
//   "id": 54,
//   "title": "5th grade algebra asked by 20, B",
//   "body": "I really need some help actually. I am going crazy.",
//   "profile_id": 20,
//   "image": "www.testimage.com",
//   "created_at": "2017-06-09T00:54:58.996Z",
//   "updated_at": "2017-06-09T00:54:58.996Z",
//   "status": null,
//   "feedback_rating": null,
//   "answerer_id": null,
//   "tag_id": null,
//   "tag_name": null
// }])
