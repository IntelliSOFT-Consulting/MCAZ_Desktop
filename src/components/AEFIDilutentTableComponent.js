import React, { Component } from 'react'
import TextInput from '../inputs/TextInput'
import DatePickerInput from '../inputs/DatePickerInput'
import TableComponent from './TableComponent'
import SingleMultipleInput from '../inputs/SingleMultipleInput'
import SelectInput from '../inputs/SelectInput'

import moment from 'moment'

import ReadOnlyDataRenderer from '../readonly/ReadOnlyDataRenderer'

import { FREQUENCY, ROUTE, DOSE, RELATIONSHIP_SAE } from '../utils/FieldOptions'

export default class AEFIDilutentTableComponent extends TableComponent {

  constructor(props) {
    super(props)
    const { model, name, validate } = this.props

    this.getRow = this.getRow.bind(this)
    this.getReadOnlyRow = this.getReadOnlyRow.bind(this)
    var rows = []
    if(model && model[name]) {
      rows = model[name]
    }
    this.state = { rows, validate }
  }

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
        <td><TextInput inline={ true } hideLabel={ true } name="diluent_name" model={ model[name][index] } validate={ this.state.validate } required={ true }/></td>
        <td><DatePickerInput hideLabel={ true } name="diluent_date" model={ model[name][index] }  maxDate={ moment() }/></td>
        <td><TextInput hideLabel={ true } name="batch_number" model={ model[name][index] } /></td>
        <td><DatePickerInput hideLabel={ true } name="expiry_date" model={ model[name][index] }  /></td>
        <td>
          <button className="btn btn-sm btn-danger" onClick={ (e) => this.removeRow(index, e) }>
            <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
          </button>
        </td>
      </tr>
    )
  }

  getReadOnlyRow(index) {
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
        <td><ReadOnlyDataRenderer hideLabel={ true } name="diluent_name" model={ model[name][index] }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="diluent_date" model={ model[name][index] } type="date"/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="batch_number" model={ model[name][index] }  type="date" /></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="expiry_date" model={ model[name][index] }  /></td>
      </tr>
    )
  }

  render() {
    const { label, name, multiLine, required, readonly } = this.props
    var input = null

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
              <td>Name<span className="required">*</span></td>
              <td>Time of reconstitution<span className="required">*</span></td>
              <td>Batch/Lot no<span className="required">*</span></td>
              <td>Expiry date<span className="required">*</span></td>
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

  componentWillReceiveProps(nextProps) {
    const { validate } = this.state
    const newValidate = nextProps.validate
    if(newValidate != validate) {
      this.setState({ validate: newValidate })
      //this.initializeData()
    }
  }

  /*initializeRows() {
    const { rows } = this.state
    var dataRows = []
    //this.setState({ rows : rows })
    for(let i = 0; i < rows.length; i++) {
      dataRows[i] = this.getRow(i)
    }
    return dataRows
  }*/

  componentDidMount() {
    //this.initializeData()
  }
}
