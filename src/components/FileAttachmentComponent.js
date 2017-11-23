import React, { Component } from 'react'
import TextInput from '../inputs/TextInput'
import FileInputComponent from '../inputs/FileInputComponent'
import TableComponent from './TableComponent'

import ReadOnlyDataRenderer from '../readonly/ReadOnlyDataRenderer'

export default class FileAttachmentComponent extends TableComponent {

  constructor(props) {
    super(props)

    this.getRow = this.getRow.bind(this)
    //this.addFile = this.addFile.bind(this)
    this.getReadOnlyRow = this.getReadOnlyRow.bind(this)
    this.initializeRows = this.initializeRows.bind(this)

    const { model } = this.props

  }

  getRow(index) {
    const { rows } = this.state
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
          <button className="btn btn-sm btn-danger" onClick={ (e) => this.removeRow(index, e) }>
            <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
          </button>
        </td>
      </tr>
    )
  }

  getReadOnlyRow(index) {
    const { rows } = this.state
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
        <td><ReadOnlyDataRenderer hideLabel={ true } name="name" validate={ this.props.validate } required={ true } model={ model[name][index] }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } multiLine={ true } name="description"/></td>
      </tr>
    )
  }

  render() {
    const { label, name, required, readonly } = this.props

    const rows = this.initializeRows(readonly) //.rows
    var lastCol = null
    var addRowBtn = null
    if(!readonly) {
      lastCol = ( <td></td>)
      addRowBtn = (
        <button className="btn btn-sm btn-primary" onClick={ this.addRow }>
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        </button>
      )
    }
    return (
      <div className="container">
        <h5 className="text-center"> { label }
          { addRowBtn }
        </h5>
        <table className="table table-condensed table-bordered">
          <thead>
            <tr>
              <td>#</td>
              <td>File<span className="required">*</span></td>
              <td>Description of contents</td>
              { lastCol }
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
