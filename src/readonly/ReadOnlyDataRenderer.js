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
      return  model[name]
    } else if(type == 'option' && options) {
      var values = ""
      if(typeof model[name] == 'string') {
        values = model[name].split(",")
      } else {
        values = [model[name]]
      }

      var renderValue = []
      options.forEach((option) => {
        if(values.indexOf(option.key) != -1) {
          renderValue.push(option.value)
        }
      })
      if(renderValue.length > 0) {
        return renderValue.join(",")
      }
      return model[name]
    } else if(type == 'file') {
      return model['filename']
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
