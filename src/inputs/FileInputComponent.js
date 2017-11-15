import React, { Component } from 'react'

export default class FileInputComponent extends Component {

  constructor(props) {
    super(props)
    const { model, name, validate } = this.props
    var value = "", fileName = ""
    if(model) {
      fileName = model['fileName']
    }
    this.state = { value : value, validate, fileName }
    this.handleChange = this.handleChange.bind(this)
    this.selectFile = this.selectFile.bind(this)
    this.onFileSelect = this.onFileSelect.bind(this)
  }

  handleChange(e) {
    const { model, name } = this.props
    if(model && model[name]) {
      model[name] = e.target.value
    }
    this.setState({ value : e.target.value })
  }

  onFileSelect(e) {
    const files = e.target.files;
    var i = 0
    var f = null
    const { model } = this.props
    while (f = files[i]) {
      var reader = new FileReader();
      reader.onload = ((theFile) => {
        return (e) => {
          model['fileData'] = e.target.result
          model['fileName'] = theFile.name
          this.setState({ fileName : theFile.name })
        };
      })(f);
      reader.readAsDataURL(f);
      i++
    }
    e.target.files = null
  }

  selectFile(e) {
    e.preventDefault()
    this.fileInput.click()
  }

  render() {
    const { label, name, multiLine, required, hideLabel } = this.props

    var reqSpan = null
    if(required) {
      reqSpan = (
        <span className="required">*</span>
      )
    }
    const hasError = (this.state.validate && required)? " has-error " : ""
    const className = "form-group" + hasError
    if(hideLabel) {
      return (
        <div className={ hasError }>
          <button className="btn btn-sm btn-default" onClick={ this.selectFile }>Select file</button>
          <label>{ this.state.fileName }</label>
          <input className="hide"  ref={ (input) => this.fileInput = input } type='file' onChange={ this.onFileSelect } />
        </div>
      )
    }

    return (
      <div className={ className }>
        <label className="col-md-4 control-label form-input-label">{ label  } { reqSpan }</label>
        <div className="col-md-6">
          <button className="btn btn-sm btn-default">Select file</button>
          <label>{ this.state.fileName }</label>
          <input type='file' ref={ (input) => this.fileInput = input } className="hide" onChange={ this.onFileSelect }/>
        </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    const { validate } = this.state
    const newValidate = nextProps.validate
    if(newValidate != validate) {
      this.setState({ validate: newValidate })
    }
  }
}
