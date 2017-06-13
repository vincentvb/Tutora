// this is logic, which will be placed either on QuestionPage or on its own Component

// build this into a route:
// return all Qs which match profile skills 
// then find all taglets which are most frequently answered and sort by frequency

import React from 'react';

class FilterRecommended extends React.Component{
  constructor(props){
    super(props)

    this.state = { }
  }

  componentWillMount(){

  }



  render(){
    return (
      <div></div>

    )
  }
}

const mapStateToProps = (state) => ({
  skills: state.skills
});

export default connect(mapStateToProps, null)(FilterRecommended)

