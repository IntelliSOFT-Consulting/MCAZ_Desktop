import React, { Component } from 'react'

export default class CheckboxInput extends Component {

  constructor(props) {
    super(props)
    const { model, name, options, validate } = this.props

    var value = ""
    if(model && model[name] && typeof model[name] == 'string') {
      value = model[name].split(',')
    } else if(value != null){
      value = model[name] + ""
    }
    var state = { value : value, validate }

    this.state = state
    this.handleCheck = this.handleCheck.bind(this)
  }

  handleCheck(e) {
    const { options, name, model, onChange } = this.props
    var { value } = this.state

    if(e.target.checked) {
      value = e.target.value
    } else {
      value = ""
    }

    // this.setState({ value })
    if(model) {
      const newValue = {};
      newValue[name] = value;
      if (onChange) {
        onChange(newValue);
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { validate, value } = state
    const { model, name } = props
    const newValidate = props.validate
    let newState = null
    if(newValidate != validate) {
      newState = {}
      newState =  { validate: newValidate }
    }
    if(value != model[name]) {
      newState = newState || {}
      newState.value =  model[name] == null ? '' : model[name]
    }
    return newState
  }

  render() {
    const { label, name, options, required, hideLabel, readonly } = this.props
    const { value } = this.state;
    var optionList = null
    const disabled = readonly? " disabled " : ""
    if(options != null) {
      optionList = options.map((option, index) => {
        return (
          <div className="checkbox" key={ Math.floor(Math.random() * 100000 )}>
            <label>
              <input
                name={ name }
                disabled={ disabled }
                type="checkbox"
                onChange={ this.handleCheck }
                checked={ value && `${value}`.indexOf(option) != -1 }
                value={ option } aria-label="..."
              />
            </label>
          </div>
        )
      })
    }
    var reqSpan = null
    if(required) {
      reqSpan = (
        <span className="required">*</span>
      )
    }
    const hasError = (this.state.validate && required)? " has-error " : ""
    const className = "form-group" + hasError

    if(hideLabel) {
      return (
        <div className={ hasError }>
          { optionList }
        </div>
      )
    }

    return (
      <div className={ className }>
        <label className="col-md-4 control-label form-input-label">{ label } { reqSpan }</label>
        <div className="col-md-6">
          { optionList }
        </div>
      </div>
    )
  }
}
