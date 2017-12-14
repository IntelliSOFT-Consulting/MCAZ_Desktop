import React, { Component } from 'react'
import TextInput from '../inputs/TextInput'
import DatePickerInput from '../inputs/DatePickerInput'
import TableComponent from './TableComponent'
import SingleMultipleInput from '../inputs/SingleMultipleInput'
import SelectInput from '../inputs/SelectInput'

import ReadOnlyDataRenderer from '../readonly/ReadOnlyDataRenderer'

import { FREQUENCY, ROUTE, DOSE, RELATIONSHIP_SAE } from '../utils/FieldOptions'

export default class SAELabTestsTableComponent extends TableComponent {

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
        <td><TextInput hideLabel={ true } name="lab_test" validate={ this.props.validate } required={ true } model={ model[name][index] }/></td>
        <td><TextInput hideLabel={ true } name="abnormal_result" model={ model[name][index] } validate={ this.state.validate } required={ true }/></td>
        <td><TextInput hideLabel={ true } name="site_normal_range" model={ model[name][index] } validate={ this.state.validate } required={ true } options={ DOSE }/></td>
        <td><DatePickerInput hideLabel={ true } name="collection_date" model={ model[name][index] } validate={ this.state.validate } required={ true }/></td>
        <td><TextInput inline={ true } hideLabel={ true } name="lab_value" model={ model[name][index] } validate={ this.state.validate } required={ true }/></td>
        <td><DatePickerInput hideLabel={ true } name="lab_value_date" model={ model[name][index] } required={ true } validate={ this.state.validate } options={ RELATIONSHIP_SAE }/></td>
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
        <td><ReadOnlyDataRenderer hideLabel={ true } name="lab_test" validate={ this.props.validate } required={ true } model={ model[name][index] }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="abnormal_result" model={ model[name][index] }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="site_normal_range" model={ model[name][index] }/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="collection_date" model={ model[name][index] } type="date"/></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="lab_value" model={ model[name][index] } /></td>
        <td><ReadOnlyDataRenderer hideLabel={ true } name="lab_value_date" model={ model[name][index] } type="date" required={ true } /></td>
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
              <td>Lab test</td>
              <td>Abnormal Result</td>
              <td>Site Normal Range</td>
              <td>Collection date</td>
              <td>Lab value previous or subsequent to this event</td>
              <td>Collection date</td>
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
    }
  }

  componentDidMount() {
    //this.initializeData()
  }
}
