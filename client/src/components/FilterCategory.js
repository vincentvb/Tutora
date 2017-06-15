import React from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { setFilter, setQ } from '../actionCreators.js';
import { getQbyTag, getOnlineQ } from '../network.js';


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

    // console.log(this.props.menufilter, "TAGS OR TAGLETS? MENU FILTER");
    // console.log(this.props.filter, "MENU FILTER FROM REDUX")

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
    // option 1: send the filter to QP and let QP do the filtering
    // although this would be the best way to avoid duplicate code, 
    // it is expensive, because you would need to compare two arrays 
    // to find their common values 
    this.props.setFilter([3, this.state.value])
    
    // option 2: filter here and set the this.props.questionlist
    //   filter by tag first and then see if it's online 

    // getQbyTag(this.state.value, questions => {
    //   // console.log("I'M SENDING TAG Qs FOR ONLINE CHECK", questions)
    //   var context = this 
      
    //   getOnlineQ(questions, context, onlinefiltered => {
    //     console.log(onlinefiltered, "FILTERED ONLINE Qs")
    //     this.props.setQ(onlinefiltered)
    //   })
    // });
    
    console.log(this.state.value, "FINAL STATE")
  }

  render() {
    const { value, suggestions } = this.state; 

    const inputProps = {
      placeholder: 'Enter a category', 
      value, 
      onChange: this.onChange
    }


    return (
    <div className="row">
         <div className="col-md-10 category">
          <Autosuggest 
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            getSuggestionValue={this.getSuggestionValue}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}  
          />
         </div>
          
        <div className="col-md-2 catbutton">
          <button onClick={this.sendTagValue} className="btn btn-default" > Go </button>
        </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tags: state.tags, 
  taglets: state.taglets
});

const mapDispatchToProps = dispatch => ({
  setFilter: filter => dispatch(setFilter(filter)),
  setQ: questions => dispatch(setQ(questions))
})


export default connect(mapStateToProps, mapDispatchToProps)(FilterCategory);

// <div style = {{marginBottom: "12%"}}>