import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TableComponent extends Component {

  constructor(props) {
    super(props)

    this.addRow = this.addRow.bind(this)
    this.removeRow = this.removeRow.bind(this)
    //this.onChange = this.onChange.bind(this)
    //this.initializeRows = this.initializeRows.bind(this)
    const { model, name, validate } = this.props
    var rows = []
    if(model && model[name]) {
      rows = model[name]
    }
    this.state = { rows }
  }

  addRow(e) {
    e.preventDefault()
    const { model, name } = this.props
    var { rows } = this.state
    rows.push({})
    model[name] = rows
    this.setState({ rows : rows })
  }

  removeRow(index, e) {
    e.preventDefault()
    var { rows } = this.state
    rows.splice(index, 1)
    const { model, name } = this.props
    model[name] = rows
    this.setState({ rows : rows })
  }

  initializeRows(readonly) {
    const { rows } = this.state
    var dataRows = []
    for(let i = 0; i < rows.length; i++) {
      dataRows[i] = readonly? this.getReadOnlyRow(i) : this.getRow(i)
    }
    return dataRows
  }
}

TableComponent.propTypes = {
  model: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
};
