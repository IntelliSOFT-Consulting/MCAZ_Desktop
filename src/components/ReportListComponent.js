import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ReportListComponent extends Component {

  constructor(props) {
    super(props)

    this.getRows = this.getRows.bind(this)
    this.changeType = this.changeType.bind(this)

    const { model, name, validate } = this.props

    this.state = { current : "" }
  }

  changeType(e) {
    this.setState({ current : e.target.value })
  }

  getRows() {
    const { drafts, completed, uploaded } = this.props
    const { current } = this.state
    var viewing = []
    if(current == "") {
      viewing = drafts.concat(completed).concat(uploaded)
    } else {
      if(current == 'drafts') {
        viewing = drafts
      } else if(current == 'completed') {
        viewing = completed
      } else if(current == 'uploaded') {
        viewing = uploaded
      }
    }
    const rows = viewing.map((report, index) => {
      return (
        <tr key={ index }>
          <td>{ index + 1 }</td><td className="pointer" onClick={ () => this.openReport(report) }>{ report.rid }</td><td>{ new Date(report.rid).toString() }</td>
        </tr>
      )
    })
    return rows
  }

  openReport(report) {
    const { showPage, type } = this.props
    showPage(type, report)
  }

  render() {

    return (
      <div>
        <select className="input-sm form-control" value={ this.state.current } onChange={ this.changeType }>
          <option value="">All</option>
          <option value="drafts">Draft</option>
          <option value="completed">Completed</option>
          <option value="uploaded">Uploaded</option>
        </select>
        <table className="table table-bordered table-condensed">
          <thead>
            <tr><td>#</td><td>ID</td><td>Date created</td></tr>
          </thead>
          <tbody>
            { this.getRows() }
          </tbody>
        </table>
      </div>
    )
  }
}