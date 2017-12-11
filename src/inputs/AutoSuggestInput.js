import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'

import facilities from '../data/facilities.json'

export default class AutoSuggestInput extends Component {

  constructor(props) {
    super(props)
    const { model, name, validate } = this.props
    var value = ""
    if(model && model[name]) {
      value = model[name]
    }
    this.state = { value : value, validate }
    this.handleChange = this.handleChange.bind(this)
    this.validate = this.validate.bind(this)
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.state = { suggestions : [], value: ''}
  }

  handleChange(event, { newValue, method }) {
    const { model, name } = this.props
    var value = null
    var code = null
    if(method == "click" || newValue == "" || typeof newValue == "object") { // set value when selected
      if(typeof newValue == "object") {
        value = newValue.name
        code = newValue.code
      } else {
        value = newValue
      }

      if(model) {
        model[name] = value
        model['institution_code'] = code
      }
    } else {
      value = newValue
    }
    this.setState({ value : value })
  }

  render() {
    const { label, name, multiLine, required, hideLabel, type } = this.props
    const { value, suggestions } = this.state

    var reqSpan = null
    if(required) {
      reqSpan = (
        <span className="required">*</span>
      )
    }


    const inputProps = {
      placeholder: label ,
      value,
      onChange: this.handleChange
    };

    return (
      <div className="form-group">
        <label className="col-md-4 control-label form-input-label">{ label  } { reqSpan }</label>
        <div className="col-md-6">
          {
            <Autosuggest
              suggestions={ suggestions }
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={ getSuggestionValue }
              renderSuggestion={ renderSuggestion }
              inputProps={ inputProps }
            />
        }
        </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    const { validate } = this.state
    const newValidate = nextProps.validate
    if(newValidate != validate) {
      this.setState({ validate: newValidate })
    }
  }

  onSuggestionsFetchRequested({value} ){
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested(){
    this.setState({
      suggestions: []
    });
  };

  validate() {
    const { required, dependent, model, name } = this.props
    var valid = true
    if(dependent) {
      valid = subQuestionsValidator(name, dependent, model)
    } else {
      valid = this.state.value == ''? false : true
    }
    if(valid) {
      return ""
    }
    return " has-error "
  }
}

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : facilities.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = suggestion => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    { suggestion.name }
  </div>
);
