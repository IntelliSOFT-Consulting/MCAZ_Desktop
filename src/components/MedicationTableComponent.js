import React, { Component } from 'react'
import TextInput from './TextInput'

export default class MedicationTableComponent extends Component {

  constructor(props) {
    super(props)
    this.getRow = this.getRow.bind(this)
  }

  getRow() {
    return (
      <tr>
        <td><TextInput /></td>
        <td><TextInput /></td>
        <td><TextInput /></td>
        <td><TextInput /></td>
        <td><TextInput /></td>
        <td><TextInput /></td>
        <td><TextInput /></td>
        <td><TextInput /></td>
        <td></td>
      </tr>
    )
  }

  render() {
    const { label, name, multiLine, required } = this.props
    var input = null

    const rows = this.getRow()

    return (
      <table className="table table-condensed table-bordered">
        <thead>
          <tr>
            <td>Generic/Brand name<span className="required">*</span></td>
            <td>Batch No.</td>
            <td>Dose<span className="required">*</span></td>
            <td>Frequency<span className="required">*</span></td>
            <td>Date started<span className="required">*</span></td>
            <td>Date stopped</td>
            <td>Indication</td>
            <td>Tick suspected medicine(s)<span className="required">*</span></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
      </table>
    )
  }
}
