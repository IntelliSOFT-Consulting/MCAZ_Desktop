import React, { Component } from 'react'
import { subQuestionsValidator } from '../utils/utils'

export default class SelectInput extends Component {

  constructor(props) {
    super(props)
    const { model, name, validate } = this.props
    var value = ""
    if(model && model[name]) {
      value = model[name]
    }
    this.state = { value : value, validate: validate }
    this.handleChange = this.handleChange.bind(this)
    this.validate = this.validate.bind(this)
  }

  handleChange(e) {
    const { model, name, onChange } = this.props
    // this.setState({ value : e.target.value })
    if(model) {
      const newValue = {};
      newValue[name] = e.target.value;
      if (onChange) {
        onChange(newValue);
      }
    }

  }

  validate() {
    const { required, dependent, model, name } = this.props
    var valid = true
    if(dependent) {
      valid = subQuestionsValidator(name, dependent, model)
    } else {
      valid = (this.state.value == '' || this.state.value == null)? false : true
    }
    if(valid) {
      return ""
    }
    return " has-error "
  }

  static getDerivedStateFromProps(props, state) {
    const { validate, value } = state
    const { model, name } = props
    const newValidate = props.validate
    let newState = null
    if(newValidate != validate) {
      newState = newState || {}
      newState.validate = newValidate
    }
    if(value != model[name]) {
      newState = newState || {}
      newState.value = model[name]
    }
    return newState
  }
  
  render() {
    const { label, name, options, hideLabel, required, disabled } = this.props
    const optionList = options.map((option) => {
      var label, value;
      if(typeof option == "string") {
        label = option;
        value = option;
      } else {
        label = option.value;
        value = option.key;
      }
      return (
        <option value={ value } key={ value + " " + Math.random() }> { label }</option>
      )
    })

    const hasError = (this.state.validate && required)? this.validate() : ""
    const className = "form-group" + hasError

    if(hideLabel) {
      const help = hasError? (<span className="help-block">required.</span>) : null
      return (
        <div className={ hasError }>
          <select name={ name } disabled={ disabled } className="form-control input-sm" value={ this.state.value } onChange={ this.handleChange }>
            { optionList }
          </select>
          { help }
        </div>
      )
    }
    var reqSpan = null
    if(required) {
      reqSpan = (
        <span className="required">*</span>
      )
    }
    return (
      <div className={ className }>
        <label className="col-md-4 control-label form-input-label">{ label } { reqSpan }</label>
        <div className="col-md-6">
          <select name={ name } disabled={ disabled } className="form-control input-sm" value={ this.state.value } onChange={ this.handleChange }>
            { optionList }
          </select>
        </div>
      </div>
    )
  }

}
