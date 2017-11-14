import React, { Component } from 'react'

export default class FileAttachmentComponent extends Component {
  render() {
    const { label, name, multiLine, required } = this.props
    var input = null
    if(multiLine) {
      input = (
        <textarea type="text" name={ name } className="form-control input-sm"></textarea>
      )
    } else {
      input = (
        <input type="text" name={ name } className="form-control input-sm"/>
      )
    }
    var reqSpan = null
    if(required) {
      reqSpan = (
        <span className="required">*</span>
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
