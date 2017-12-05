import React, { Component } from 'react'
import TextInput from '../inputs/TextInput'
import DatePickerInput from '../inputs/DatePickerInput'
import TableComponent from './TableComponent'
import CheckboxInput from '../inputs/CheckboxInput'
import SelectInput from '../inputs/SelectInput'

import ReadOnlyDataRenderer from '../readonly/ReadOnlyDataRenderer'

import { FREQUENCY, ROUTE, DOSE, RELATIONSHIP_SAE } from '../utils/FieldOptions'

export default class SAEConcomitantTableComponent extends TableComponent {

  constructor(props) {
    super(props)
    const { model, name, validate } = this.props

    this.getRow = this.getRow.bind(this)
    this.initializeRows = this.initializeRows.bind(this)
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
        <td>{ index + 1 }</td>
        <td><TextInput hideLabel={ true } name="drug_name" validate={ this.props.validate } required={ true } model={ model[name][index] }/></td>
        <td><DatePickerInput hideLabel={ true } name="start_date" model={ model[name][index] } validate={ this.state.validate } required={ true } maxDate={ moment() } onChange={ this.onChange } /></td>
        <td><DatePickerInput hideLabel={ true } name="stop_date" model={ model[name][index] } validate={ this.state.validate } required={ true } maxDate={ moment() } minDate={ model[name][index]['start_date'] }/></td>
        <td><SelectInput hideLabel={ true } name="relationship_to_sae" model={ model[name][index] } options={ RELATIONSHIP_SAE } validate={ this.state.validate } required={ true }/></td>
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
        <td>{ index + 1 }</td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="drug_name" validate={ this.props.validate } required={ true } model={ model[name][index] }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="start_date" model={ model[name][index] } type="date" validate={ this.props.validate } required={ true }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="stop_date" model={ model[name][index] } type="date" validate={ this.props.validate } required={ true }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="relationship_to_sae" model={ model[name][index] } options={ RELATIONSHIP_SAE } validate={ this.props.validate } required={ true }/></td>
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
              <td colSpan="2">Name of drug<span className="required">*</span></td>
              <td>Date started<span className="required">*</span></td>
              <td>Date stopped</td>
              <td>Relationship of SAE to medication<span className="required">*</span></td>
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

  componentDidMount() {
    //this.initializeData()
  }
}
