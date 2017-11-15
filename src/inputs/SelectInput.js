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
    if(model && model[name]) {
      model[name] = e.target.value
    }
    this.setState({ value : e.target.value })
  }
  
  render() {
    const { label, name, options } = this.props
    const optionList = options.map((option) => {
      var label, value;
      if(typeof option == "string") {
        label = option;
        value = option;
      } else {
        label = option.name;
        value = option.value;
      }
      return (
        <option value={ value }> { label }</option>
      )
    })
    return (
      <div className="form-group">
        <label>{ label }</label>
        <select name={ name } className="form-control input-sm" value={ this.state.value } onChange={ this.handleChange }>
          { optionList }
        </select>
      </div>
    )
  }
}
