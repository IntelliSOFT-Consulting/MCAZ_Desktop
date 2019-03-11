import React, { Component } from 'react'
import TextInput from '../inputs/TextInput'
import FileAttachmentRow from './FileAttachmentRow'
import TableComponent from './TableComponent'

import ReadOnlyDataRenderer from '../readonly/ReadOnlyDataRenderer'

export default class FileAttachmentComponent extends TableComponent {

  constructor(props) {
    super(props)

    this.getRow = this.getRow.bind(this)
    this.onChange = this.onChange.bind(this)
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
      <FileAttachmentRow key={index} index={index} model={rows[index]} validate={this.state.validate} onRemove={this.removeRow} onChange={this.onChange}/>
    )
  }

  onChange(model, index) {
    const newData = Object.assign([], this.state.rows)
    newData[index] = model;
    const { onChange, name } = this.props;
    const newModel = {}
    newModel[name] = newData;
    this.setState({ rows: newData })
    onChange(newModel)
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
        <td><ReadOnlyDataRenderer hideLabel={ true } name="file" validate={ this.props.validate } required={ true } model={ model[name][index] } type="file"/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="description" model={ model[name][index] }/></td>
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
          Add <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        </button>
      )
    }
    return (
      <div className="container">
        <h5 className="text-center"> { label } &nbsp;
          { addRowBtn }
        </h5>
        <table className="table table-condensed table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>File</th>
              <th>Description of contents</th>
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
