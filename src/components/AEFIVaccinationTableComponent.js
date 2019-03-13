import React, { Component } from 'react'
import TextInput from '../inputs/TextInput'
import DatePickerInput from '../inputs/DatePickerInput'
import TableComponent from './TableComponent'
import SingleMultipleInput from '../inputs/SingleMultipleInput'
import SelectInput from '../inputs/SelectInput'
import AEFIVaccinationRow from './AEFIVaccinationRow'

import moment from 'moment'

import ReadOnlyDataRenderer from '../readonly/ReadOnlyDataRenderer'

import { FREQUENCY, ROUTE, DOSE, RELATIONSHIP_SAE } from '../utils/FieldOptions'

export default class AEFIVaccinationTableComponent extends TableComponent {

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
    const { rows } = this.state
    const key = `${index}_AEFIVaccination`
    return (
      <AEFIVaccinationRow key={ key } index={index} model={rows[index]} validate={this.state.validate} onRemove={this.removeRow} onChange={this.onChange} />
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
        <td><ReadOnlyDataRenderer hideLabel={ true } name="vaccine_name" model={ model[name][index] }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="vaccination_date" model={ model[name][index] } type="date"/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="vaccination_time" model={ model[name][index] } type="time"/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="dosage" model={ model[name][index] }  type="date" /></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="batch_number" model={ model[name][index] }  /></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="expiry_date" model={ model[name][index] } /></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="diluent_batch_number" model={ model[name][index] } /></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="diluent_expiry_date" model={ model[name][index] } type="date" /></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="diluent_date" model={ model[name][index] } type="date" showTime={ true }/></td>
      </tr>
    )
  }

  render() {
    const { label, name, multiLine, required, readonly } = this.props
    var input = null

    const rows = this.initializeRows(readonly) //.rows
    var lastCol = null
    var addRowBtn = null
    var diluentColSpan = 3
    if(!readonly) {
      lastCol = ( <th></th>)
      addRowBtn = (
        <button className="btn btn-sm btn-primary" onClick={ this.addRow }>
          Add <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        </button>
      )
      diluentColSpan = 4
    }


    return (
      <div className="container">
        <h5 className="text-center"> { label } &nbsp;
          { addRowBtn }
        </h5>
        <table className="table table-condensed table-bordered">
          <thead>
            <tr><th colSpan='6'>Vaccine</th><th colSpan={ diluentColSpan }>Diluent</th></tr>
            <tr>
              <th>Name<span className="required">*</span></th>
              <th colSpan="2">Date and time of vaccination<span className="required">*</span></th>
              <th>Dose (1st, 2nd...)</th>
              <th>Batch/Lot no<span className="required">*</span></th>
              <th>Expiry date</th>
              <th>Batch/ Lot Number</th>
              <th>Expiry date</th>
              <th>Time of reconstitution</th>
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
