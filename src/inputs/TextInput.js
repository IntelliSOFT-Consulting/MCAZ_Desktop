import React, { Component } from 'react'
import { subQuestionsValidator } from '../utils/utils'

export default class TextInput extends Component {

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
  }

  handleChange(e) {
    const { model, name, onChange } = this.props
    this.setState({ value : e.target.value });
    if(model) {
      const newValue = {};
      newValue[name] = e.target.value;
      if(onChange) {
        onChange(newValue)
      }
    }

  }

  validate() {
    const { required, dependent, model, name } = this.props
    var valid = true
    if(name == 'weight' && Number(this.state.value) < 0) {
      valid = false;
    } else {
      if(dependent) {
        valid = subQuestionsValidator(name, dependent, model)
      } else {
        valid = this.state.value == ''? false : true
      }
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
      newState.validate =  newValidate
    }
    if(value != model[name]) {
      newState = newState || {}
      newState.value =  model[name] == null ? '' : model[name]
    }
    return newState;
  }
  
  render() {
    const { label, name, multiLine, required, hideLabel, type } = this.props
    var input = null
    if(multiLine) {
      input = (
        <textarea type="text" name={ name } className="form-control input-sm" onChange={ this.handleChange } value={ this.state.value }></textarea>
      )
    } else {
      const inputType = type != null? type : "text"
      input = (
        <input type={ inputType } name={ name } className="form-control input-sm" onChange={ this.handleChange } value={ this.state.value }/>
      )
    }
    var reqSpan = null
    if(required) {
      reqSpan = (
        <span className="required">*</span>
      )
    }
    const hasError = (this.state.validate && required)? this.validate()  : ""
    const className = "form-group" + hasError
    const help = hasError? (<span className="help-block">required.</span>) : null
    if(hideLabel) {
      return (
        <div className={ hasError }>
          { input } { help }
        </div>
      )
    }

    return (
      <div className={ className }>
        <label className="col-md-4 control-label form-input-label">{ label  } { reqSpan }</label>
        <div className="col-md-6">
          { input }
        </div>
      </div>
    )
  }
}
