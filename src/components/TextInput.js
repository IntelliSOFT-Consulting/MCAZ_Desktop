import React, { Component } from 'react'

export default class TextInput extends Component {

  constructor(props) {
    super(props)
    const { model, name } = this.props
    var value = ""
    if(model && model[name]) {
      value = model[name]
    }
    this.state = { value : value }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const { model, name } = this.props
    if(model && model[name]) {
      model[name] = e.target.value
    }
    this.setState({ value : e.target.value })
  }

  render() {
    const { label, name, multiLine, required, hideLabel } = this.props
    var input = null
    if(multiLine) {
      input = (
        <textarea type="text" name={ name } className="form-control input-sm" onChange={ this.handleChange } value={ this.state.value }></textarea>
      )
    } else {
      input = (
        <input type="text" name={ name } className="form-control input-sm" onChange={ this.handleChange } value={ this.state.value }/>
      )
    }
    var reqSpan = null
    if(required) {
      reqSpan = (
        <span className="required">*</span>
      )
    }
    if(hideLabel) {
      return (
        <div>
          { input }
        </div>
      )
    }
    return (
      <div className="form-group">
        <label className="col-md-4 control-label form-input-label">{ label  } { reqSpan }</label>
        <div className="col-md-6">
          { input }
        </div>
      </div>
    )
  }
}
