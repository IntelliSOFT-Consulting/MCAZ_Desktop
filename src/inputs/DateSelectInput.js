import React, { Component } from 'react'

export default class DateSelectInput extends Component {
  constructor(props) {
    super(props)

    this.getModelValue = this.getModelValue.bind(this)
    this.handleChange = this.handleChange.bind(this)
    const { model, name, validate } = this.props

    var value = this.getModelValue(model, name)

    this.state = {
      value, validate
    }

  }

  getModelValue(model, name) {

    var value = { day : "", month: "", year : "" }
    if(model && model[name]) {
      if(typeof model[name] == "string") {
        const v = model[name].split("-")
      //if(model[name][day]) {
        value['day'] = v[0] == null? "" : v[0] //model[name]['day']

      //if(model[name][month]) {
        value['month'] = v[1] == null? "" : v[1] //model[name]['month']

      //if(model[name][year]) {
        value['year'] = v[2] == null? "" : v[2] //model[name]['year']
      }
    }
    return value
  }

  handleChange(e) {
    var { value } = this.state
    const { model, name } = this.props
    value[e.target.name] = e.target.value
    model[name] = value.day + "-" + value.month + "-" + value.year
    this.setState({
      value: value
    });

    const { onChange } = this.props
    if(onChange) {
      onChange(model[name])
    }

  }

  render() {
    const { label, name, required } = this.props
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

    const hasError = (this.state.validate && required && Object.values(this.state.value).filter( v => v !== '').length == 0)? " has-error " : ""
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

  componentWillReceiveProps(nextProps) {
    const { validate, value } = this.state
    const { model, name } = this.props
    const newValidate = nextProps.validate
    if(newValidate != validate) {
      this.setState({ validate: newValidate })
    }
    const modelVal = value.day + "-" + value.month + "-" + value.year
    if(modelVal != model[name]) {
      var val = this.getModelValue(model, name)
      this.setState({ value : val })
    }
  }
}
