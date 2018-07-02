import React, { Component } from 'react'

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
    if(type == 'date') {
      if(model[name] != null && model[name] != '') {
        let val = moment(model[name]).format("DD-MM-YYYY");
        return val;
      }
      return  model[name]
    } else if(type == 'option' && options) {
      var values = ""
      if(typeof model[name] == 'string') {
        values = model[name].split(",")
      } else {
        values = [model[name]] + ""
      }

      var renderValue = []
      options.forEach((option) => {
        if(values.indexOf(option.key) != -1 || (!isNaN(option.key) && values.indexOf(Number(option.key)) != -1)) {
          renderValue.push(option.value)
        }
      })
      if(renderValue.length > 0) {
        return renderValue.join(",")
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
