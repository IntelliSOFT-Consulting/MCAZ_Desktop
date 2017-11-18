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
    if(viewing.length == 0) {
      return (
        <tr>
          <td colSpan='3'><label className="text-warning">No reports</label></td>
        </tr>
      )
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
    const { drafts, showPage, type } = this.props

    var found = drafts.find((i) => i.rid == report.rid)
    if(found) {
      showPage(type, report)
    } else {
      showPage('READ_ONLY_PAGE', report)
    }
  }

  render() {
    const { drafts, completed, uploaded } = this.props
    return (
      <div>
        <select className="input-sm form-control" value={ this.state.current } onChange={ this.changeType }>
          <option value="">All ({ drafts.length + completed.length + uploaded.length })</option>
          <option value="drafts">Draft ({ drafts.length })</option>
          <option value="completed">Completed ({ completed.length })</option>
          <option value="uploaded">Uploaded ({ uploaded.length })</option>
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
