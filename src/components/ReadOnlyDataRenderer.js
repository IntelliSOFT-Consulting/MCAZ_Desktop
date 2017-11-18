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
    if(type == 'date') {
      var value = ''
      if(model[name]['day']) {
        value = model[name]['day']
      } else {
        value = "-"
      }
      if(model[name]['month']) {
        value = value + "/" + (parseInt(model[name]['month']) + 1)
      } else {
        value = value + "/-"
      }
      if(model[name]['year']) {
        value = value + "/" + model[name]['year']
      } else {
        value = value + "/-"
      }
      return  value
    } else if(type == 'option' && options) {
      return model[name]
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
          <div className="form-control-static">
            { this.getFieldValue(name) }
          </div>
        </div>
      </div>
    )
  }
}
