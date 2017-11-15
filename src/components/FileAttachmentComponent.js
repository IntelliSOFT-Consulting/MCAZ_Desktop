import React, { Component } from 'react'
import TextInput from './TextInput'
import FileInputComponent from './FileInputComponent'

export default class FileAttachmentComponent extends Component {

  constructor(props) {
    super(props)

    this.getRow = this.getRow.bind(this)
    this.addFile = this.addFile.bind(this)
    this.removeFileRow = this.removeFileRow.bind(this)
    this.initializeRows = this.initializeRows.bind(this)

    const { model } = this.props
    var files = []
    if(model && model.files) {
      files = model.files
    }
    this.state = { files }
  }

  addFile(e) {
    e.preventDefault()
    const { model, name } = this.props
    var { files } = this.state
    //const index = rows.length
    files.push({})
    model[name] = files
    this.setState({ files : files })
  }

  removeFileRow(index, e) {
    e.preventDefault()
    var { files } = this.state
    files.splice(index, 1)
    const { model, name } = this.props
    model[name] = files
    this.setState({ files : files })
  }

  getRow(index) {
    const { files } = this.state
    const { model, name } = this.props
    if(!model[name]) {
      model[name] = []
    }
    if(!model[name][index]) {
      model[name][index] = rowData
    }
    return (
      <tr key={ Math.floor(Math.random() * 10000) }>
        <td>{ index + 1 }</td>
        <td><FileInputComponent hideLabel={ true } name="drug_name" validate={ this.props.validate } required={ true } model={ model[name][index] }/></td>
        <td><TextInput hideLabel={ true } multiLine={ true } name="description"/></td>
        <td>
          <button className="btn btn-sm btn-danger" onClick={ (e) => this.removeFileRow(index, e) }>
            <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
          </button>
        </td>
      </tr>
    )
  }

  initializeRows() {
    const { files } = this.state
    var dataRows = []
    //this.setState({ rows : rows })
    for(let i = 0; i < files.length; i++) {
      dataRows[i] = this.getRow(i)
    }
    return dataRows
  }

  render() {
    const { label, name, required } = this.props

    const rows = this.initializeRows()
    return (
      <div className="container">
        <h5 className="text-center"> { label }
          <button className="btn btn-sm btn-primary" onClick={ this.addFile }>
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
          </button>
        </h5>
        <table className="table table-condensed table-bordered">
          <thead>
            <tr>
              <td>#</td>
              <td>File<span className="required">*</span></td>
              <td>Description of contents</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </table>
      </div>
    )
  }
}
