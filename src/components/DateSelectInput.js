import React, { Component } from 'react'

export default class DateSelectInput extends Component {
  render() {
    const { label, name, required } = this.props
    var input = null

    var reqSpan = null
    if(required) {
      reqSpan = (
        <span className="required">*</span>
      )
    }
    return (
      <div className="form-group">
        <label className="col-md-4 control-label form-input-label">{ label  } { reqSpan }</label>
        <div className="col-md-6 date">
          <select className="col-md-3 form-control">
            <option></option>
          </select>
          <select className="col-md-6 form-control">
            <option></option>
          </select>
          <select className="col-md-3 form-control">
            <option></option>
          </select>
        </div>
      </div>
    )
  }
}
