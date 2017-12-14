import React, { Component } from 'react'

export default class AgeAtOnSetInput extends Component {
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

    var value = { days : "", months: "", years : "" }
    if(model && model[name]) {
      if(typeof model[name] == "object") {
      //if(model[name][day]) {
        value['days'] = model[name]["days"] == null? "" : model[name]["days"] //model[name]['day']
      //if(model[name][month]) {
        value['months'] = model[name]["months"] == null? "" : model[name]["months"] //model[name]['month']
      //if(model[name][year]) {
        value['years'] = model[name]["years"] == null? "" : model[name]["years"] //model[name]['year']
      }
    }
    return value
  }

  handleChange(e) {
    var { value } = this.state
    const { model, name } = this.props
    value[e.target.name] = e.target.value
    model[name] = value
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
        <div className="col-md-6 row">
          <div className="col-md-4">
            <div className="form-group">
              <label className="col-md-3 control-label form-input-label">Years</label>
              <div className="col-md-9">
                <input name="years" type="number" placeholder="Years" className={`form-control day input-sm ${hasError}` } value={ this.state.value.years } onChange={ this.handleChange } />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="col-md-3 control-label form-input-label">Months</label>
              <div className="col-md-9">
                <input name="months" type="number" placeholder="Months" className="form-control month input-sm" value={ this.state.value.months } onChange={ this.handleChange } />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="col-md-3 control-label form-input-label">Days</label>
              <div className="col-md-9">
                <input name="days" type="number" placeholder="Days" className="form-control year input-sm" value={ this.state.value.days } onChange={ this.handleChange } />
              </div>
            </div>
          </div>
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
    const val = this.getModelValue(model, name)
    if(val.days != value.days || val.months != value.months || val.years != value.years) {
      this.setState({ value : val })
    }

  }
}
