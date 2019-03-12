import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TableComponent extends Component {

  constructor(props) {
    super(props)

    this.addRow = this.addRow.bind(this)
    this.removeRow = this.removeRow.bind(this)
    this.onChange = this.onChange.bind(this)
    this.initializeRows = this.initializeRows.bind(this)
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
    const rows = [...this.state.rows]
    rows.push({})
    model[name] = rows
    this.setState({ rows : rows })
  }

  removeRow(index, e) {
    e.preventDefault()
    const rows = Object.assign([], this.state.rows) //{...}
    rows.splice(index, 1)
    const { onChange, name } = this.props
    const model = {}
    model[name] = rows
    this.setState({ rows })
    if (onChange) {
      onChange(model)
    }

  }

  onChange(model, index) {
    const newData = Object.assign([], this.state.rows)
    newData[index] = model;
    const { onChange, name } = this.props;
    const newModel = {}
    newModel[name] = newData;
    this.setState({ rows: newData })
    onChange(newModel)
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
