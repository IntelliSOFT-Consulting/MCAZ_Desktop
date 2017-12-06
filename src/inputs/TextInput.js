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
    const { model, name } = this.props
    if(model) {
      model[name] = e.target.value
    }
    this.setState({ value : e.target.value })
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
    if(hideLabel) {
      return (
        <div className={ hasError }>
          { input }
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

  componentWillReceiveProps(nextProps) {
    const { validate } = this.state
    const newValidate = nextProps.validate
    if(newValidate != validate) {
      this.setState({ validate: newValidate })
    }
  }

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
