import React, { Component } from 'react'
import TextInput from '../inputs/TextInput'
import DatePickerInput from '../inputs/DatePickerInput'
import TableComponent from './TableComponent'
import CheckboxInput from '../inputs/CheckboxInput'
import SelectInput from '../inputs/SelectInput'
import SAEConcomitantRow from './SAEConcomitantRow'

import ReadOnlyDataRenderer from '../readonly/ReadOnlyDataRenderer'

import { FREQUENCY, ROUTE, DOSE, RELATIONSHIP_SAE } from '../utils/FieldOptions'

import moment from 'moment'

export default class SAEConcomitantTableComponent extends TableComponent {

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
    const key = `${index}_SAEConcomitantTableComponent`
    return (
      <SAEConcomitantRow key={key} index={index} model={rows[index]} validate={this.state.validate} onRemove={this.removeRow} onChange={this.onChange}/>
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
              <th colSpan="2">Name of drug<span className="required">*</span></th>
              <th>Date started<span className="required">*</span></th>
              <th>Date stopped</th>
              <th>Relationship of SAE to medication<span className="required">*</span></th>
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

  componentDidMount() {
    //this.initializeData()
  }
}
