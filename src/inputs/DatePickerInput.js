import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { subQuestionsValidator } from '../utils/utils'

import 'react-datepicker/dist/react-datepicker.css'

export default class DatePickerInput extends Component {

  constructor (props) {
    super(props)
    const { model, name, validate, showTime } = this.props
    var value = null
    if(model && model[name]) {
      if(typeof model[name] == "string") {
        const dateTime = model[name].split(" ")
        const v = dateTime[0].split("-")

        const date = moment().year(v[2]).month(v[1]).date(v[0]) //new Date(model[name]['month'] + '/' + model[name]['day'] + '/' + model[name]['year'])
        value = date
        if(showTime && dateTime.length == 2) {
          const t = dateTime[1].split(":")
          value.hour(t[0]).minute(v[1])
        }
      }
    }
    this.state = {
      value: value, validate: validate
    };
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this)
    this.getDateTimeFromString = this.getDateTimeFromString.bind(this)
  }

  handleChange(date) {
    this.setState({
      value: date
    });
    const { model, name, showTime } = this.props
    if(model) {
      model[name] = date.date() + "-" + date.month() + "-" + date.year()
      if(showTime) {
        model[name] += " " + date.hour() + ":" + date.minute()
      }
      //var dateStr = "[ 'day' : " + date.date() + ", 'month' : " + date.month() + ", 'year' : " + date.year() + "]"
      //model[name]['day'] = date.date()
      //model[name]['month'] = date.month()
      //model[name]['year'] = date.year()
    }
  }

  getDateTimeFromString(dateTime) {
    const split = dateTime.split(" ")
    const v = split[0].split("-")

    var date = moment().year(v[2]).month(v[1]).date(v[0]) //new Date(model[name]['month'] + '/' + model[name]['day'] + '/' + model[name]['year'])

    if(split.length == 2) {
      const t = split[1].split(":")
      date.hour(t[0]).minute(v[1])
    }
    return date
  }

  render() {
    const { label, name, required, hideLabel, showTime, maxDate, minDate } = this.props
    var input = null

    var reqSpan = null
    if(required) {
      reqSpan = (
        <span className="required">*</span>
      )
    }
    const dateFormat = showTime? "MM-DD-YYYY HH:mm" : "MM-DD-YYYY"
    const hasError = (this.state.validate && required)? this.validate()  : ""
    const className = "form-group" + hasError
    const minDateValue = (minDate && typeof minDate == 'string')? this.getDateTimeFromString(minDate) : minDate

    if(hideLabel) {
      return <div className={ hasError }><DatePicker
          selected={ this.state.value }
          onChange={this.handleChange}
          showTimeSelect={ showTime }
          timeFormat="HH:mm"
          timeIntervals={ 1 } maxDate={ maxDate } minDate={ minDateValue }
          className="form-control input-sm"
          dateFormat={ dateFormat }
      /></div>
    }

    return (
      <div className={ className }>
        <label className="col-md-4 control-label form-input-label">{ label  } { reqSpan }</label>
        <div className="col-md-6">
          <DatePicker className="form-control input-sm"
              selected={ this.state.value }
              onChange={ this.handleChange } showTimeSelect={ showTime }
              timeFormat="HH:mm"
              timeIntervals={ 1 } maxDate={ maxDate } minDate={ minDateValue }
              dateFormat={ dateFormat }
          />
        </div>
      </div>
    )
  }

  validate() {
    const { required, dependent, model, name } = this.props
    var valid = true
    if(dependent) {
      valid = subQuestionsValidator(name, dependent, model)
    } else {
      valid = this.state.value == null? false : true
    }
    if(valid) {
      return ""
    }
    return " has-error "
  }

  componentWillReceiveProps(nextProps) {
    const { validate } = this.state
    const newValidate = nextProps.validate
    if(newValidate != validate) {
      this.setState({ validate: newValidate })
    }
  }
}
