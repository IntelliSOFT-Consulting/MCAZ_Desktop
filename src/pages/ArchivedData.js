import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Pagination from "../components/Pagination"
import { pad, generateXML } from '../utils/utils'

export default class ArchivedData extends Component {

  constructor(props) {
    super(props)

    this.itemsPerPage = 10
    this.getRows = this.getRows.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.downloadData = this.downloadData.bind(this)

    const { archived } = this.props
    this.state = { total : archived.length, activePage : 1 }
  }

  getRows() {
    const { archived } = this.props
    const { current } = this.state
    var viewing = archived

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
      const ref = report.reference_number != null? report.reference_number : new Date(report.rid).toString()
      const followUp = report.report_type == "FollowUp"? "Follow-Up" : ""
      const modified = report.created != null? report.created : new Date(report.rid).toString()

      return (
        <tr key={ index }>
          <td>{ start + index + 1 }</td><td className="pointer" onClick={ () => this.openReport(report) }>{ ref + " " + followUp }</td>
          <td>
            { modified }
          </td>
        </tr>
      )
    })
    return rows
  }

  render() {
    return (
      <div className="container-fluid">

        <table className="table table-bordered table-condensed content-page top-margins">
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
      <div >
        <button className="btn btn-sm btn-primary" onClick={ this.downloadData }>
          <span class="glyphicon glyphicon-download" aria-hidden="true"></span> Download Data
          </button>
      </div>
      </div>
    )
  }

  downloadData() {
    const { archived, saveFile } = this.props
    const files = generateXML(archived)
    saveFile(files)
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage : pageNumber })
  }
}
