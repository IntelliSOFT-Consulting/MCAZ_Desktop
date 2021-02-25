import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { subQuestionsValidator, getDateTimeFromString, getValueFromString } from '../utils/utils'

import 'react-datepicker/dist/react-datepicker.css'

export default class DatePickerInput extends Component {

  constructor (props) {
    super(props)
    const { model, name, validate, showTime } = this.props
    var value = null

    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this)
    // this.getDateTimeFromString = this.getDateTimeFromString.bind(this)
    // this.getValueFromString = this.getValueFromString.bind(this)

    if(model && model[name]) {
      value = getValueFromString(model[name])
    }
    this.state = {
      value: value, validate: validate
    };

  }

  handleChange(date) {
    this.setState({
      value: date
    });
    const { model, name, showTime } = this.props
    if(model) {
      const newValue = {}
      if(date == null) {
        newValue[name] = null
        return
      }
      newValue[name] = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
      if(showTime) {
        newValue[name] += " " + date.getHours() + ":" + date.getMinutes()
      }
      const { onChange } = this.props
      if(onChange) {
        var value = {}
        value[name] = date
        onChange(newValue)
      }
    }

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
    const dateFormat = showTime? "dd-MM-yyyy HH:mm" : "dd-MM-yyyy"
    const hasError = (this.state.validate && required)? this.validate()  : ""
    const className = "form-group" + hasError
    const minDateValue = (minDate && typeof minDate == 'string')? getDateTimeFromString(minDate) : minDate
    const maxDateValue = (maxDate && typeof maxDate == 'string') ? getDateTimeFromString(maxDate) : 
    maxDate && typeof maxDate.toDate === 'function' ? maxDate.toDate() : maxDate;
    //maxDate == null || (maxDate && typeof maxDate == 'object') ? maxDate:  ;

    if(hideLabel) {
      const help = hasError? (<span className="help-block">required.</span>) : null
      return <div className={ hasError }>
        <DatePicker
          selected={ this.state.value }
          onChange={this.handleChange}
          showTimeSelect={ showTime }
          timeFormat="HH:mm"
          // showYearDropdown
          showMonthDropdown
          timeIntervals={ 1 }
          maxDate={ maxDateValue }
          minDate={ minDateValue }
          className="form-control input-sm"
          dateFormat={ dateFormat }
      />
        { help }
      </div>
    }

    return (
      <div className={ className }>
        <label className="col-md-4 control-label form-input-label">{ label  } { reqSpan }</label>
        <div className="col-md-6">
          <DatePicker className="form-control input-sm"
              selected={ this.state.value }
              onChange={ this.handleChange } showTimeSelect={ showTime }
              timeFormat="HH:mm"
              // showYearDropdown
              showMonthDropdown
              timeIntervals={ 1 }
              maxDate={ maxDateValue }
              minDate={ minDateValue }
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

  static getDerivedStateFromProps(props, state) {
    const { validate, value } = state
    const newValidate = props.validate
    let newState = null
    if(newValidate != validate) {
      newState = newState || {}
      newState.validate = newValidate
    }

    const { model, name } = props
    if(model[name] != value) {
      newState = newState || {}
      var val = model[name] == ''? null : getValueFromString(model[name])
      newState.value = val
    }
    return newState;
  }
}
