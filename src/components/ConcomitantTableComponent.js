import React, { Component } from 'react'
import TextInput from '../inputs/TextInput'
import DatePickerInput from '../inputs/DatePickerInput'
import TableComponent from './TableComponent'
import CheckboxInput from '../inputs/CheckboxInput'
import SelectInput from '../inputs/SelectInput'

import { FREQUENCY, ROUTE, DOSE } from '../utils/FieldOptions'

export default class ConcomitantTableComponent extends TableComponent {

  constructor(props) {
    super(props)
    this.getRow = this.getRow.bind(this)


    const { model, name, validate } = this.props
    this.initializeRows = this.initializeRows.bind(this)
    var rows = []
    if(model && model[name]) {
      rows = model[name]
    }
    this.state = { rows, validate }
  }

  /*addRow(e) {
    e.preventDefault()
    const { model, name } = this.props
    var { rows } = this.state
    //const index = rows.length
    rows.push({})
    model[name] = rows
    this.setState({ rows : rows })
  }*/

  getRow(index) {
    const rowData = {}
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
        <td><TextInput hideLabel={ true } name="drug_name" validate={ this.props.validate } required={ true } model={ model[name][index] }/></td>
        <td><DatePickerInput hideLabel={ true } name="start_date" model={ model[name][index] } validate={ this.state.validate } required={ true }/></td>
        <td><DatePickerInput hideLabel={ true } name="stop_date" model={ model[name][index] } /></td>
        <td><CheckboxInput hideLabel={ true } name="suspected_drug" model={ model[name][index] } options={ ['1'] }/></td>
        <td>
          <button className="btn btn-sm btn-danger" onClick={ (e) => this.removeRow(index, e) }>
            <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
          </button>
        </td>
      </tr>
    )
  }

  /**
    Removes a row from the table.
    This function then recreates all the rows.
    This ensures that the delete button gets the new correct index.
  *
  removeRow(index, e) {
    e.preventDefault()
    var rows = this.state.rows
    rows.splice(index, 1)
    const { model, name } = this.props
    model[name] = rows
    this.setState({ rows : rows })
  }*/

  render() {
    const { label, name, multiLine, required } = this.props
    var input = null

    const rows = this.initializeRows() //.rows
    return (
      <div className="container">
        <h5 className="text-center"> { label }
          <button className="btn btn-sm btn-primary" onClick={ this.addRow }>
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
          </button>
        </h5>
        <table className="table table-condensed table-bordered">
          <thead>
            <tr>
              <td colSpan="2">Name of drug<span className="required">*</span></td>
              <td>Date started<span className="required">*</span></td>
              <td>Date stopped</td>
              <td>Tick suspected medicine(s)<span className="required">*</span></td>
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

  componentWillReceiveProps(nextProps) {
    const { validate } = this.state
    const newValidate = nextProps.validate
    if(newValidate != validate) {
      this.setState({ validate: newValidate })
      //this.initializeData()
    }
  }

  initializeRows() {
    const { rows } = this.state
    var dataRows = []
    //this.setState({ rows : rows })
    for(let i = 0; i < rows.length; i++) {
      dataRows[i] = this.getRow(i)
    }
    return dataRows
  }

  componentDidMount() {
    //this.initializeData()
  }
}
