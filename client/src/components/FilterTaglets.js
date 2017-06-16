import React from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { setFilter, setQ } from '../actionCreators.js';
import { getQbyTag } from '../network.js';


class FilterTaglets extends React.Component {
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

    return inputLength === 0 ? [] : this.props.taglets.filter(taglet =>
      taglet.value.toLowerCase().slice(0, inputLength) === inputValue
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
    // get the taglet id. this could be refactored to a db call 
    var tagletid = '';
    this.props.taglets.forEach(taglet => {
      if (this.state.value === taglet.value){
        tagletid = taglet.id
      }
    })


    this.props.setFilter([4, tagletid])



    // getQbyTag(this.state.value, questions => this.props.setQ(questions));
    console.log(this.state.value, "FINAL STATE")
  }

  render() {
    const { value, suggestions } = this.state; 

    const inputProps = {
      placeholder: 'Enter a tag', 
      value, 
      onChange: this.onChange
    }


    return (
      <div className="specialDiv">
        <div className="col-md-10">
          <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          getSuggestionValue={this.getSuggestionValue}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}  

        />
        </div>

        <div className="col-md-2">
          <button onClick={this.sendTagValue} className="btn btn-default mini" >Go </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  taglets: state.taglets
});

const mapDispatchToProps = dispatch => ({
  setFilter: filter => dispatch(setFilter(filter)),
  setQ: questions => dispatch(setQ(questions))
})


export default connect(mapStateToProps, mapDispatchToProps)(FilterTaglets);


