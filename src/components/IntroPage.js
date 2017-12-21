import React, { Component } from 'react';
import { MAIN_PAGE, ADR_FORM_PAGE, SAE_FORM_PAGE, AEFI_REPORT_PAGE, REPORTS_LIST_PAGE, REPORT_TYPE_ADR,
  REPORT_TYPE_SAE, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_INV, AEFI_INV_PAGE, REPORT_TYPE_ADR_FOLLOW_UP, REPORT_TYPE_AEFI_FOLLOW_UP } from '../utils/Constants'

import ReportListComponent from './ReportListComponent'
import ReportSearchComponent from './ReportSearchComponent'

import { saveAs } from 'file-saver'

export default class IntroPage extends Component {

  constructor(props) {
    super(props)
    this.showPage = this.showPage.bind(this)
    this.getReport = this.getReport.bind(this)
    this.uploadData = this.uploadData.bind(this)
    this.downloadReports = this.downloadReports.bind(this)

    const { completed, connection } = this.props
    this.state = { completed, connection }
  }

  showPage(page, report, followUp) {
    const { showPage, setReport, setFollowUp } = this.props
    setReport(report)
    showPage(page)
    //setFollowUp(followUp)
  }

  getReport(reports, type, type2) {
    return reports.filter(report => report.type == type || (report.type != null && report.type == type2))
  }

  uploadData() {
    const { uploadCompletedReports, completed, connection, setNotification, token } = this.props
    if(connection.isConnected) {
      uploadCompletedReports(completed, token)
    } else {
      setNotification({ message : messages.offline, level: "error", id: new Date().getTime() })
    }
  }

  downloadReports() {
    const { uploadCompletedReports, completed, connection, token } = this.props
    if(completed.length == 0) {
      //Alert.alert("Info", "No reports to download.")
      //return
    }
    var reports = {}
    reports.sadr = completed.filter(report => report.type == REPORT_TYPE_ADR)
    reports.adr = completed.filter(report => report.type == REPORT_TYPE_SAE)
    reports.aefi = completed.filter(report => report.type == REPORT_TYPE_AEFI)
    reports.saefi = completed.filter(report => report.type == REPORT_TYPE_AEFI_INV)

    const name = new Date().toString().split(/ /).join('_') + '.json'

    const string = JSON.stringify(reports)
    saveAs(new Blob([string], { type : "text/plain" }), name)

  }

  render() {
    const { uploaded, showPage, fetchReport, token, removeDraft } = this.props
    const disabled = this.state.connection.isConnected? null : " disabled "
    return(
      <div>
        <div className="container-fluid">

          <div className="col-md-3 col-sm-4">
            <h3>ADR</h3>
            <p>Adverse drug reaction</p>
            <div className="btn-toolbar">
              <button type="button" className="btn btn-sm btn-default btn-primary adr-form" onClick={ () => this.showPage(ADR_FORM_PAGE) }>Report</button>

            </div>
            <ReportListComponent drafts={ this.getReport(this.props.drafts, REPORT_TYPE_ADR, REPORT_TYPE_ADR_FOLLOW_UP) } completed={ this.getReport(this.props.completed, REPORT_TYPE_ADR, REPORT_TYPE_ADR_FOLLOW_UP) } uploaded={ this.getReport(this.props.uploaded, REPORT_TYPE_ADR, REPORT_TYPE_ADR_FOLLOW_UP) } showPage={ this.showPage } type={ ADR_FORM_PAGE } removeDraft={ removeDraft }/>
          </div>
          <div className="col-md-3 col-sm-4">
            <h3>AEFI</h3>
            <p>Adverse Event Following Immunization.</p>
            <div className="btn-toolbar">
              <button type="button" className="btn btn-sm btn-default btn-primary aefi-form" onClick={ () => this.showPage(AEFI_REPORT_PAGE) }>Report</button>

            </div>
            <ReportListComponent drafts={ this.getReport(this.props.drafts, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_FOLLOW_UP) } completed={  this.getReport(this.props.completed, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_FOLLOW_UP) } uploaded={ this.getReport(this.props.uploaded, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_FOLLOW_UP) } showPage={ this.showPage } type={ AEFI_REPORT_PAGE } removeDraft={ removeDraft }/>
          </div>
          <div className="col-md-3 col-sm-4">
            <h3>AEFI Inv.</h3>
            <p>Serious Adverse Event Following Immunization.</p>
            <div className="btn-toolbar">
              <button type="button" className="btn btn-sm btn-default btn-primary aefi-form" onClick={ () => this.showPage(AEFI_INV_PAGE) }>Report</button>

            </div>
            <ReportListComponent drafts={ this.getReport(this.props.drafts, REPORT_TYPE_AEFI_INV) } completed={  this.getReport(this.props.completed, REPORT_TYPE_AEFI_INV) } uploaded={ this.getReport(this.props.uploaded, REPORT_TYPE_AEFI_INV) } showPage={ this.showPage } type={ AEFI_INV_PAGE } removeDraft={ removeDraft }/>
          </div>
          <div className="col-md-3 col-sm-4">
            <h3>SAE</h3>
            <p>Serious Adverse Event</p>
            <div className="btn-toolbar">
              <button type="button" className="btn btn-sm btn-primary sae-form" onClick={ () => this.showPage(SAE_FORM_PAGE) }>Report</button>

            </div>
            <ReportListComponent drafts={ this.getReport(this.props.drafts, REPORT_TYPE_SAE) } completed={ this.getReport(this.props.completed, REPORT_TYPE_SAE) } uploaded={ this.getReport(this.props.uploaded, REPORT_TYPE_SAE) } showPage={ this.showPage } type={ SAE_FORM_PAGE } removeDraft={ removeDraft }/>
          </div>
        </div>
        <div className="container">
          <div className=" btn-toolbar pull-left">
            <button className="btn btn-sm btn-primary" disabled={ disabled } onClick={ this.uploadData }>
              <span className="glyphicon glyphicon-upload" aria-hidden="true"></span> Upload data ({ this.state.completed.length })
            </button>
            <button className="btn btn-sm btn-primary" onClick={ this.downloadReports }>
              <span className="glyphicon glyphicon-download" aria-hidden="true"></span> Download data ({ this.state.completed.length })
            </button>

          </div>
          <ReportSearchComponent uploaded={ uploaded } showPage={ showPage } fetchReport={ fetchReport } token={ token }/>
        </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    const currentConnection = this.props.connection
    const connection = nextProps.connection
    if(currentConnection.isConnected != connection.isConnected) {
      this.setState({ connection })
    }
  }
}
