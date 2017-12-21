import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pagination from "./Pagination"
import Confirm from "../dialogs/Confirm"

import { ADR_FORM_PAGE, ADR_FOLLOW_UP_PAGE, AEFI_REPORT_PAGE, AEFI_FOLLOW_UP_PAGE } from '../utils/Constants'

export default class ReportListComponent extends Component {


  constructor(props) {
    super(props)
    this.itemsPerPage = 3
    this.getRows = this.getRows.bind(this)
    this.changeType = this.changeType.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.confirmDeleteReport = this.confirmDeleteReport.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.removeDraft = this.removeDraft.bind(this)

    const { model, name, validate, drafts, completed, uploaded } = this.props

    this.state = { current : "", total : (drafts.length + completed.length + uploaded.length), activePage : 1, confirmDeleteReport: false }
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
      const ref = report.reference_number != null? report.reference_number : new Date(report.rid).toString()
      const followUp = report.report_type == "FollowUp"? "Follow-Up" : ""
      const modified = report.created != null? report.created : new Date(report.rid).toString()
      var found = drafts.find((i) => i.rid == report.rid)
      const deleteIcon = found != null? (<button type="button" onClick={ () =>  this.confirmDeleteReport(report) } className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>) : null
      return (
        <tr key={ index }>
          <td>{ start + index + 1 }</td><td className="pointer" onClick={ () => this.openReport(report) }>{ ref + " " + followUp }</td>
          <td>
            { modified }
            { deleteIcon }
          </td>
        </tr>
      )
    })
    return rows
  }

  confirmDeleteReport(item) {
    this.setState({ confirmDeleteReport : true, deleteItem : item })
  }

  removeDraft() {
    const { removeDraft } = this.props
    const { deleteItem } = this.state
    removeDraft(deleteItem)
  }

  openReport(report) {
    const { drafts, showPage, type } = this.props

    var found = drafts.find((i) => i.rid == report.rid)
    if(found) {
      if(found.report_type == 'FollowUp') {
        var page = null
        if(type == ADR_FORM_PAGE) {
          page = ADR_FOLLOW_UP_PAGE
        } else if(type == AEFI_REPORT_PAGE) {
          page = AEFI_FOLLOW_UP_PAGE
        }
        showPage(page, report)
      } else {
        showPage(type, report)
      }
    } else {
      showPage('READ_ONLY_PAGE', report)
    }
  }


  closeModal() {
    this.setState({ confirmDeleteReport : false })
  }

  render() {
    const { drafts, completed, uploaded } = this.props

    var confirmDelete = null
    if(this.state.confirmDeleteReport) {
      confirmDelete = (
        <Confirm
          visible={ this.state.confirmDeleteReport }
          title="Confirm"
          cancel={ this.closeModal }
          body={ "Delete this report?" }
          confirmText={ "Yes" }
          confirmBSStyle={ "danger" }
          onConfirm={ this.removeDraft }
          cancelText={ "No" }
          >
        </Confirm>
      )
    }

    return (
      <div className="saved-reports"> { confirmDelete }
        <select className="input-sm form-control top-margins" value={ this.state.current } onChange={ this.changeType }>
          <option value="">All ({ drafts.length + completed.length + uploaded.length })</option>
          <option value="drafts">Draft ({ drafts.length })</option>
          <option value="completed">Completed ({ completed.length })</option>
          <option value="uploaded">Uploaded ({ uploaded.length })</option>
        </select>
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
      </div>
    )
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage : pageNumber })
    console.log(pageNumber)
  }
}
