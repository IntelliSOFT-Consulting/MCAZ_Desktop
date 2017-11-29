import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pagination from "./Pagination"


export default class ReportListComponent extends Component {


  constructor(props) {
    super(props)
    this.itemsPerPage = 3
    this.getRows = this.getRows.bind(this)
    this.changeType = this.changeType.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)

    const { model, name, validate, drafts, completed, uploaded } = this.props

    this.state = { current : "", total : (drafts.length + completed.length + uploaded.length), activePage : 1 }
  }

  changeType(e) {
    const { drafts, completed, uploaded } = this.props
    var length = 0, viewing = []
    if(e.target.value == 'drafts') {
      viewing = drafts
    } else if(e.target.value == 'completed') {
      viewing = completed
    } else if(e.target.value == 'uploaded') {
      viewing = uploaded
    } else {
      viewing = drafts.concat(completed).concat(uploaded)
    }
    this.setState({ current : e.target.value, total : viewing.length })
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
    var start = this.itemsPerPage * (this.state.activePage - 1)
    const items = viewing.slice(start, start + this.itemsPerPage)
    const rows = items.map((report, index) => {
      return (
        <tr key={ index }>
          <td>{ start + index + 1 }</td><td className="pointer" onClick={ () => this.openReport(report) }>{ report.rid }</td><td>{ new Date(report.rid).toString() }</td>
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
        <table className="table table-bordered table-condensed content-page">
          <thead>
            <tr><td>#</td><td>ID</td><td>Date created</td></tr>
          </thead>
          <tbody>
            { this.getRows() }
          </tbody>
        </table>
        <Pagination
          activePage={ this.state.activePage }
          itemsPerPage={ this.itemsPerPage }
          total={ this.state.total }
          pageRangeDisplayed={ 5 }
          onChange={ this.handlePageChange }
        />
      </div>
    )
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage : pageNumber })
    console.log(pageNumber)
  }
}
