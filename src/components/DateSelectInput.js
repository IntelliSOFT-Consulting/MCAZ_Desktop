import React, { Component } from 'react'

export default class DateSelectInput extends Component {
  constructor(props) {
    super(props)
    const { model, name } = this.props

    var value = {}
    if(model && model[name]) {
      value.day = model[name][day]
      value.month = model[name][month]
      value.year = model[name][year]
    }
    this.state = {
      value
    }
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
    return (
      <div className="form-group">
        <label className="col-md-4 control-label form-input-label">{ label  } { reqSpan }</label>
        <div className="col-md-6 date">
          <select name="day" className="col-md-3 form-control day" value={ this.state.value.day } onChange={ this.handleChange }>
            <option></option>
          </select>
          <select name="month" className="col-md-6 form-control month" value={ this.state.value.month } onChange={ this.handleChange }>
            <option></option>
          </select>
          <select name="year" className="col-md-3 form-control year" value={ this.state.value.year } onChange={ this.handleChange }>
            <option></option>
          </select>
        </div>
      </div>
    )
  }
}
