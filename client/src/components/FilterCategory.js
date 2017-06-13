import React from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { setFilter, setQ } from '../actionCreators.js';
import { getQbyTag } from '../network.js';


class FilterCategory extends React.Component {
  constructor(props){
    super(props)

    this.state = { 
      value: '', 
      suggestions: [], 
      suggestedvalue: ''
    }

    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.sendTagValue = this.sendTagValue.bind(this);
        
  }

  getSuggestionValue(suggestion){
    this.setState({ value: suggestion.value })
    return suggestion.value;
  } 

  onChange(event, { newValue }){
    this.setState({ value: newValue })
  }

  getSuggestions(value){
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.tags.filter(tag =>
      tag.value.toLowerCase().slice(0, inputLength) === inputValue
    );

  }

  renderSuggestion(suggestion){
    return suggestion.value

  }

  onSuggestionsFetchRequested({ value }){
    this.setState({ suggestions: this.getSuggestions(value) })
  }

  onSuggestionsClearRequested(suggestion){
    console.log("clearing suggestion")
    this.setState({ suggestions: [] })
  }

  sendTagValue(e){
    // e.preventDefault();
    getQbyTag(this.state.value, questions => this.props.setQ(questions));
    console.log(this.state.value, "FINAL STATE")
  }

  render() {
    const { value, suggestions } = this.state; 

    const inputProps = {
      placeholder: 'Enter a category or tag', 
      value, 
      onChange: this.onChange
    }


    return (
      <div>
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          getSuggestionValue={this.getSuggestionValue}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}  

        />

        <button onClick={this.sendTagValue} className="btn btn-default" >Go </button>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tags: state.tags
});

const mapDispatchToProps = dispatch => ({
  setFilter: filter => dispatch(setFilter(filter)),
  setQ: questions => dispatch(setQ(questions))
})


export default connect(mapStateToProps, mapDispatchToProps)(FilterCategory);


// const test = [
//   {
//     "id": 1,
//     "value": "Math"
//   },
//   {
//     "id": 2,
//     "value": "Mazzie"
//   },
//   {
//     "id": 3,
//     "value": "Matthie"
//   },
//   {
//     "id": 4,
//     "value": "Art"
//   },
//   {
//     "id": 5,
//     "value": "Physics"
//   },
//   {
//     "id": 6,
//     "value": "Chemistry"
//   },
//   {
//     "id": 7,
//     "value": "Grammar"
//   },
//   {
//     "id": 8,
//     "value": "English"
//   },
//   {
//     "id": 9,
//     "value": "Biology"
//   }
// ]