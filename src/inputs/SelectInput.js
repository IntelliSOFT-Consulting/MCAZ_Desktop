import React, { Component } from 'react'

export default class SelectInput extends Component {

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
    if(model) {
      model[name] = e.target.value
    }
    this.setState({ value : e.target.value })
  }

  render() {
    const { label, name, options, hideLabel } = this.props
    const optionList = options.map((option) => {
      var label, value;
      if(typeof option == "string") {
        label = option;
        value = option;
      } else {
        label = option.value;
        value = option.key;
      }
      return (
        <option value={ value } key={ value }> { label }</option>
      )
    })

    const hasError = (this.state.validate && required)? " has-error " : ""
    const className = "form-group" + hasError

    if(hideLabel) {
      return (
        <div className={ hasError }>
          <select name={ name } className="form-control input-sm" value={ this.state.value } onChange={ this.handleChange }>
            { optionList }
          </select>
        </div>
      )
    }
    return (
      <div className="form-group">
        <label className="col-md-4 control-label form-input-label">{ label }</label>
        <div className="col-md-6">
          <select name={ name } className="form-control input-sm" value={ this.state.value } onChange={ this.handleChange }>
            { optionList }
          </select>
        </div>
      </div>
    )
  }
}
