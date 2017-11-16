import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

export default class DatePickerInput extends Component {

  constructor (props) {
    super(props)
    const { model, name } = this.props
    var value = null
    if(model && model[name]) {
      value = model[name]
    }
    this.state = {
      value: value
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      value: date
    });
    const { model, name } = this.props
    if(model) {
      model[name] = date
    }
  }

  render() {
    const { label, name, required, hideLabel } = this.props
    var input = null

    var reqSpan = null
    if(required) {
      reqSpan = (
        <span className="required">*</span>
      )
    }
    if(hideLabel) {
      return <DatePicker
          selected={this.state.value}
          onChange={this.handleChange}
          className="form-control input-sm"
      />
    }
    return (
      <div className="form-group">
        <label className="col-md-4 control-label form-input-label">{ label  } { reqSpan }</label>
        <DatePicker
            selected={this.state.value}
            onChange={this.handleChange}
        />
      </div>
    )
  }
}
