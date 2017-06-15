import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FilterCategory from './FilterCategory.js';
import FilterTaglets from './FilterTaglets.js';
import { connect } from 'react-redux';
import { setQ, setFilter } from '../actionCreators.js';
import { getAllQ, getQbyTag, getOnlineQ } from '../network.js';


const styles = {
  customWidth: {
    width: 150,
  },
};

class FilterQuestion extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      showCategory: false,
      showTaglets: false, 
      menufilter: ''
    }

    this.handleChange = this.handleChange.bind(this);
        
  }

  handleChange(event, index, value){
    // this.props.setFilter(value);
    if (value === 1){
      this.props.setFilter([0]);
      this.setState({ showCategory: false });
      this.setState({ showTaglets: false });

      getAllQ(questions => {
        var context = this;
        getOnlineQ(questions, context, onlineall => {
          this.props.setQ(onlineall)
        })
      })

    } else if (value === 3){
      this.setState({ menufilter: value})
      this.setState({ showCategory: true })
      this.setState({ showTaglets: false })
    } else if (value === 4){
      this.setState({ showCategory: false })
      this.setState({ showTaglets: true })
    } else if (value === 2){
      this.props.setFilter([2])      
      this.setState({ showCategory: false });
      this.setState({ showTaglets: false });
    }


  }

  render() {
    return (
      <div>
        <SelectField
          floatingLabelText="Filter Student Questions By"
          value={this.props.filter}
          onChange={this.handleChange}
          floatingLabelStyle={{color: "white"}}
        >
          <MenuItem value={1} primaryText="None" />
          <MenuItem value={2} primaryText="Recommended" />
          <MenuItem value={3} primaryText="Category" />
          <MenuItem value={4} primaryText="Tag" />
        </SelectField>

        <div style = {{display: "inline-block", marginLeft: "5%", marginTop: "2%"}}>
          {this.state.showCategory ? <FilterCategory socket={this.props.socket} menufilter={this.state.filter} /> : null}
          {this.state.showTaglets ? <FilterTaglets /> : null }
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  filter: state.filter, 
})

const mapDispatchToProps = dispatch => ({
  setQ: questions => dispatch(setQ(questions)), 
  setFilter: filter => dispatch(setFilter(filter))
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
