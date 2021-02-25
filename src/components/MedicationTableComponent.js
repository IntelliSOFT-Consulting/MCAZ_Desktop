import React, { Component } from 'react'
import TextInput from '../inputs/TextInput'
import DatePickerInput from '../inputs/DatePickerInput'
import TableComponent from './TableComponent'
import MedicationRow from './MedicationRow'
import CheckboxInput from '../inputs/CheckboxInput'
import SelectInput from '../inputs/SelectInput'

import moment from 'moment'

import ReadOnlyDataRenderer from '../readonly/ReadOnlyDataRenderer'

import { FREQUENCY, ROUTE, DOSE } from '../utils/FieldOptions'

export default class MedicationTableComponent extends TableComponent {

  constructor(props) {
    super(props)
    const { model, name, validate } = this.props

    this.getRow = this.getRow.bind(this)
    this.onChange = this.onChange.bind(this)
    this.getReadOnlyRow = this.getReadOnlyRow.bind(this)
    var rows = []
    if(model && model[name]) {
      rows = model[name]
    } else {
      rows = [{}]
      model[name] = rows
    }
    this.state = { rows, validate }
  }

  getRow(index) {
    const { rows } = this.state
    const key = `${index}_SAELabTests`
    return <MedicationRow key={key} index={index} model={rows[index]} onRemove={this.removeRow} validate={this.state.validate} onChange={this.onChange}/>
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
        <td><ReadOnlyDataRenderer hideLabel={ true } name="brand_name" model={ model[name][index] }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="batch_number" model={ model[name][index] }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="dose" model={ model[name][index] } validate={ this.state.validate } required={ true }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="dose_id" model={ model[name][index] } type="option" required={ true } options={ DOSE }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="route_id" model={ model[name][index] } type="option" required={ true } options={ ROUTE }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="frequency_id" model={ model[name][index] } type="option" required={ true } options={ FREQUENCY }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="indication" model={ model[name][index] }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="start_date" model={ model[name][index] } type="date" required={ true }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="stop_date" model={ model[name][index] } type="date" /></td>
        <td><CheckboxInput hideLabel={ true } name="suspected_drug" model={ model[name][index] } options={ ['1'] }/></td>
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
              <td>Generic name</td>
              <td>Brand name</td>
              <td>Batch Number</td>
              <td colSpan="2">Dose</td>
              <td colSpan="2">Route & Frequency</td>
              <td>Indication</td>
              <td>Date started</td>
              <td>Date stopped</td>
              <td>Tick suspected medicine(s)</td>
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
