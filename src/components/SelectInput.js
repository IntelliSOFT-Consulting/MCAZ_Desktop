import React, { Component } from 'react'

export default class SelectInput extends Component {
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
        <select name={ name } className="form-control input-sm">
          { optionList }
        </select>
      </div>
    )
  }
}
