import React, { Component } from 'react'
import TextInput from '../inputs/TextInput'
import DatePickerInput from '../inputs/DatePickerInput'
import TableComponent from './TableComponent'
import SingleMultipleInput from '../inputs/SingleMultipleInput'
import SelectInput from '../inputs/SelectInput'
import SAEDrugsTableRow from './SAEDrugsTableRow'

import moment from 'moment'

import ReadOnlyDataRenderer from '../readonly/ReadOnlyDataRenderer'

import { SAE_FREQUENCY, ROUTE, DOSE, RELATIONSHIP_SAE } from '../utils/FieldOptions'

export default class SAEDrugsTableComponent extends TableComponent {

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
    const key = `${index}_SAEDrugs`
    return (
      <SAEDrugsTableRow key={ key } index={index} model={rows[index]} validate={this.state.validate} onRemove={this.removeRow} onChange={this.onChange}/>
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
        <td><ReadOnlyDataRenderer hideLabel={ true } name="drug_name" validate={ this.props.validate } required={ true } model={ model[name][index] }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="dosage" model={ model[name][index] } validate={ this.state.validate } required={ true }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="dose_id" model={ model[name][index] } type="option" required={ true } options={ DOSE }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="route_id" model={ model[name][index] } type="option" required={ true } options={ ROUTE }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="frequency_id" model={ model[name][index] } type="option" required={ true } options={ SAE_FREQUENCY }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="start_date" model={ model[name][index] } type="date"/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="taking_drug" options={['Yes', 'No']} model={ model[name][index] }  required={ true }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="relationship_to_sae" model={ model[name][index] } options={ RELATIONSHIP_SAE } readonly={ true }/></td>
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
              <th>Drug/Device/Vaccine</th>
              <th colSpan="2">Dose</th>
              <th colSpan="2">Route & Frequency</th>
              <th>Date commenced</th>
              <th>Taking drug at onset of SAE?</th>
              <th>Relationship of SAE to drug</th>
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
    const { validate, rows } = this.state
    const newValidate = nextProps.validate
    if(newValidate != validate) {
      this.setState({ validate: newValidate })
      //this.initializeData()
    }
    const { model, name } = nextProps
    if (model[name]) {
      if (rows.length != model[name].length) {
        this.setState({ rows: model[name] })
      }
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
