import React, { Component } from 'react'
import { getModelValue } from '../utils/utils'

export default class DateSelectInput extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    const { model, name, validate } = this.props

    var value = getModelValue(model, name)

    this.state = {
      value, validate
    }
  }

  handleChange(e) {
    var { value } = this.state
    const { model, name } = this.props
    const newState = Object.assign({}, value); //{...value}
    newState[e.target.name] = e.target.value

    this.setState(newState);

    const { onChange } = this.props
    if(onChange) {
      const newValue = {};
      newValue[name] = newState.day + "-" + newState.month + "-" + newState.year
      onChange(newValue[name])
    }

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
    const modelVal = value.day + "-" + value.month + "-" + value.year
    if(modelVal != model[name]) {
      newState = newState || {}
      var val = getModelValue(model, name)
      newState.value = value;
    }
    return newState;
  }

  render() {
    const { label, name, required, dependent, model } = this.props
    var input = null

    var reqSpan = null
    if(required) {
      reqSpan = (
        <span className="required">*</span>
      )
    }
    const monthLabels = ["January", 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const months = [<option value="" key={ Math.random() * 100000 }></option>].concat(monthLabels.map((month, index) => (
      <option value={ index } key={ Math.random() * 100000 }>{ month }</option>
    )))

    const year = new Date().getFullYear() + 1;
    const days = [<option value="" key={ Math.random() * 100000 }></option>].concat(Array(31).fill("").map((value, index) => (<option value={ (index + 1)} key={ Math.random() * 100000 * (index + 1) }>{ (index + 1) }</option>)))
    const years = [<option value="" key={ Math.random() * 100000 }></option>].concat(Array(100).fill("").map((val, index) => (<option value={ ((year - 100) + index) } key={ Math.random() * 100000 * (index + 1) }>{ ((year - 100) + index) }</option>)).reverse())

    const hasError = (this.state.validate && required && Object.values(this.state.value).filter( v => v !== '').length == 0 && (dependent == null || (dependent != null && (model[dependent] == null || model[dependent] == ""))))? " has-error " : ""
    const className = "form-group" + hasError

    return (
      <div className={ className }>
        <label className="col-md-4 control-label form-input-label">{ label  } { reqSpan }</label>
        <div className="col-md-6 date">
          <select name="day" className={`col-md-3 form-control day input-sm ${hasError}` } value={ this.state.value.day } onChange={ this.handleChange }>
            { days }
          </select>
          <select name="month" className="col-md-6 form-control month input-sm" value={ this.state.value.month } onChange={ this.handleChange }>
            { months }
          </select>
          <select name="year" className="col-md-3 form-control year input-sm" value={ this.state.value.year } onChange={ this.handleChange }>
            { years }
          </select>
        </div>
      </div>
    )
  }
}
