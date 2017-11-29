import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { subQuestionsValidator } from '../utils/utils'

import 'react-datepicker/dist/react-datepicker.css'

export default class DatePickerInput extends Component {

  constructor (props) {
    super(props)
    const { model, name, validate } = this.props
    var value = null
    if(model && model[name]) {
      if(typeof model[name] == "string") {
        const v = model[name].split("-")

        const date = moment().year(v[2]).month(v[1]).date(v[0]) //new Date(model[name]['month'] + '/' + model[name]['day'] + '/' + model[name]['year'])
        value = date
      }
    }
    this.state = {
      value: value, validate: validate
    };
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this)
  }

  handleChange(date) {
    this.setState({
      value: date
    });
    const { model, name } = this.props
    if(model) {
      model[name] = date.date() + "-" + date.month() + "-" + date.year()
      //var dateStr = "[ 'day' : " + date.date() + ", 'month' : " + date.month() + ", 'year' : " + date.year() + "]"
      //model[name]['day'] = date.date()
      //model[name]['month'] = date.month()
      //model[name]['year'] = date.year()
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

    const hasError = (this.state.validate && required)? this.validate()  : ""
    const className = "form-group" + hasError

    if(hideLabel) {
      return <div className={ hasError }><DatePicker
          selected={this.state.value}
          onChange={this.handleChange}
          className="form-control input-sm"
      /></div>
    }

    return (
      <div className={ className }>
        <label className="col-md-4 control-label form-input-label">{ label  } { reqSpan }</label>
        <div className="col-md-6">
          <DatePicker className="form-control input-sm"
              selected={this.state.value}
              onChange={this.handleChange}
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
