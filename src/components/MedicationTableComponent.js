import React, { Component } from 'react'
import TextInput from './TextInput'
import DatePickerInput from './DatePickerInput'

export default class MedicationTableComponent extends Component {

  constructor(props) {
    super(props)
    this.getRow = this.getRow.bind(this)
    this.addRow = this.addRow.bind(this)
    this.removeRow = this.removeRow.bind(this)

    const { model, name } = this.props
    var rows = []
    if(model[name]) {
      data = model[name]
      for(let i = 0; i < data.length; i++) {
        rows[i] = this.getRow(i)
      }
    }
    this.state = { rows : rows }
  }

  addRow(e) {
    e.preventDefault()
    var rows = this.state.rows
    const index = rows.length

    rows.push(this.getRow(index))
    this.setState({ rows : rows })
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
        <td><TextInput hideLabel={ true } name="drug_name"/></td>
        <td><TextInput hideLabel={ true } name="brand_name"/></td>
        <td><TextInput hideLabel={ true } name="batch_number"/></td>
        <td><TextInput hideLabel={ true } name="dose"/></td>
        <td><TextInput hideLabel={ true } name="dose_id"/></td>
        <td><TextInput hideLabel={ true } name="route_id"/></td>
        <td><TextInput hideLabel={ true } name="frequency_id"/></td>
        <td><TextInput hideLabel={ true } name="indication"/></td>
        <td><DatePickerInput hideLabel={ true } name="start_date"/></td>
        <td><DatePickerInput hideLabel={ true } name="stop_date"/></td>
        <td><TextInput hideLabel={ true } name="suspected_drug"/></td>
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
  */
  removeRow(index, e) {
    e.preventDefault()
    var rows = this.state.rows
    rows.splice(index, 1)
    const { model, name } = this.props
    model[name].splice(index, 1)
    const length = rows.length
    var newRows = []
    var i = 0
    while(i < length) {
      newRows.push(this.getRow(i))
      i++
    }
    this.setState({ rows : newRows })
  }

  render() {
    const { label, name, multiLine, required } = this.props
    var input = null

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
              <td>Generic name<span className="required">*</span></td>
              <td>Brand name<span className="required">*</span></td>
              <td>Batch No.</td>
              <td colSpan="2">Dose<span className="required">*</span></td>
              <td colSpan="2">Frequency<span className="required">*</span></td>
              <td>Date started<span className="required">*</span></td>
              <td>Date stopped</td>
              <td>Indication</td>
              <td>Tick suspected medicine(s)<span className="required">*</span></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            { this.state.rows }
          </tbody>
        </table>
      </div>
    )
  }
}
