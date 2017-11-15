import React, { Component } from 'react'

export default class DateSelectInput extends Component {
  constructor(props) {
    super(props)
    const { model, name, validate } = this.props

    var value = {}
    if(model && model[name]) {
      value.day = model[name][day]
      value.month = model[name][month]
      value.year = model[name][year]
    }
    this.state = {
      value, validate
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    var { value } = this.state
    const { model, name } = this.props
    value[e.target.name] = e.target.value
    model[name] = value
    this.setState({
      value: value
    });
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
    const months = [<option value="" key={ Math.floor(Math.random() * 100000)}></option>].concat(monthLabels.map((month, index) => (
      <option value={ index } key={ Math.floor(Math.random() * 100000)}>{ month }</option>
    )))

    const year = new Date().getFullYear() + 1;
    const days = [<option value="" key={ Math.floor(Math.random() * 100000)}></option>].concat(Array(31).fill("").map((value, index) => (<option value={ index } key={ Math.floor(Math.random() * 100000 * (index + 1))}>{ (index + 1) }</option>)))
    const years = [<option value="" key={ Math.floor(Math.random() * 100000)}></option>].concat(Array(100).fill("").map((val, index) => (<option value={ ((year - 100) + index) } key={ Math.floor(Math.random() * 100000 * (index + 1))}>{ ((year - 100) + index) }</option>)))

    const hasError = (this.state.validate && required)? " has-error " : ""
    const className = "form-group" + hasError

    return (
      <div className={ className }>
        <label className="col-md-4 control-label form-input-label">{ label  } { reqSpan }</label>
        <div className="col-md-6 date">
          <select name="day" className="col-md-3 form-control day" value={ this.state.value.day } onChange={ this.handleChange }>
            { days }
          </select>
          <select name="month" className="col-md-6 form-control month" value={ this.state.value.month } onChange={ this.handleChange }>
            { months }
          </select>
          <select name="year" className="col-md-3 form-control year" value={ this.state.value.year } onChange={ this.handleChange }>
            { years }
          </select>
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
}
