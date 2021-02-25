import React, { Component } from 'react'
import moment from 'moment'

export default class ReadOnlyDataRenderer extends Component {

  constructor(props) {
    super(props)
    const { model, name, validate } = this.props
    var value = ""
    if(model && model[name]) {
      value = model[name]
    }
    this.state = { value : value, validate }
    this.getFieldValue = this.getFieldValue.bind(this)
  }

  getFieldValue(name) {
    const { model, type, options } = this.props
    if(model[name] == null) {
      return ""
    }
    if(typeof model[name] == "object") {
      return ""
    }
    const pad = (v) => {
      if (v < 10) {
        return `0${v}`;
      }
      return v;
    }
    if(type == 'date') {
      if(model[name] != null && model[name] != '') {
        let date = new Date(model[name]);
        if (!(date instanceof Date && !isNaN(date))) {
          const parts = model[name].split('-');
          return `${pad(parts[0])}-${pad(parts[1])}-${parts[2]}`;
        }
        let val = moment(date).format("DD-MM-YYYY");
        return val;

        /*let dateParts = model[name].split('-').filter( v => v != null && v != '');
        if(dateParts.length != 3) {
          return ""
        }
        let val = moment(model[name]).format("DD-MM-YYYY");
        return val;*/
      }
      return  model[name]
    } else if(type == 'option' && options) {
      var values = ""
      if(typeof model[name] == 'string') {
        values = model[name].split(",")
      } else {
        values = [`${model[name]}`]
      }

      var renderValue = []
      options.forEach((option) => {
        if(values.indexOf(option.key) != -1 || (!isNaN(option.key) && values.indexOf(Number(option.key)) != -1)) {
          renderValue.push(option.value)
        }
      })
      if(renderValue.length > 0) {
        return renderValue.filter(v => v !== '').join(",")
      }
      return model[name]
    } else if(type == 'file') {
      return model['filename']
    } else if(name == 'age_at_onset') {
      var val = ""
      if(model['age_at_onset_years'] != null && model['age_at_onset_years'] != "") {
        val += model['age_at_onset_years'] + " Years"
      }
      if(model['age_at_onset_months'] != null && model['age_at_onset_months'] != "") {
        val += model['age_at_onset_months'] + " Months"
      }
      if(model['age_at_onset_days'] != null && model['age_at_onset_days'] != "") {
        val += model['age_at_onset_days'] + " Days"
      }
      return val
    }
    return model[name]
  }

  render() {
    const { label, name, multiLine, required, hideLabel } = this.props
    var input = null

    var reqSpan = null

    if(hideLabel) {
      return (
        <div>
          { this.getFieldValue(name) }
        </div>
      )
    }

    return (
      <div className="form-group">
        <label className="col-md-4 control-label form-input-label">{ label  } { reqSpan }</label>
        <div className="col-md-6">
          <p className="form-control-static">
            { this.getFieldValue(name) }
          </p>
        </div>
      </div>
    )
  }
}
