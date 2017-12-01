import React, { Component } from 'react';
import { MAIN_PAGE, ADR_FORM_PAGE, SAE_FORM_PAGE, AEFI_REPORT_PAGE, REPORTS_LIST_PAGE, REPORT_TYPE_ADR,
  REPORT_TYPE_SAE, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_INV, AEFI_INV_PAGE } from '../utils/Constants'

import ReportListComponent from './ReportListComponent'

export default class IntroPage extends Component {

  constructor(props) {
    super(props)
    this.showPage = this.showPage.bind(this)
    this.getReport = this.getReport.bind(this)
    this.uploadData = this.uploadData.bind(this)

    const { completed, connection } = this.props
    this.state = { completed, connection }
  }

  showPage(page, report) {
    const { showPage, setReport } = this.props
    setReport(report)
    showPage(page)
  }

  getReport(reports, type) {
    return reports.filter(report => report.type == type)
  }

  uploadData() {
    const { uploadCompletedReports, completed, connection, setNotification } = this.props
    if(connection.isConnected) {
      uploadCompletedReports(completed)
    } else {
      setNotification({ message : messages.offline, level: "error", id: new Date().getTime() })
    }
  }

  render() {
    const disabled = this.state.connection.isConnected? null : " disabled "
    return(
      <div>
        <div className="container-fluid">

          <div className="col-md-3 col-sm-4">
            <h3>ADR</h3>
            <p>Adverse drug reaction</p>
            <button className="btn btn-sm btn-default" onClick={ () => this.showPage(ADR_FORM_PAGE) }>Report</button>
            <ReportListComponent drafts={ this.getReport(this.props.drafts, REPORT_TYPE_ADR) } completed={ this.getReport(this.props.completed, REPORT_TYPE_ADR) } uploaded={ this.getReport(this.props.uploaded, REPORT_TYPE_ADR) } showPage={ this.showPage } type={ ADR_FORM_PAGE }/>
          </div>
          <div className="col-md-3 col-sm-4">
            <h3>AEFI</h3>
            <p>Adverse Event Following Immunization.</p>
            <button className="btn btn-sm btn-default" onClick={ () => this.showPage(AEFI_REPORT_PAGE) }>Report</button>
            <ReportListComponent drafts={ this.getReport(this.props.drafts, REPORT_TYPE_AEFI) } completed={  this.getReport(this.props.completed, REPORT_TYPE_AEFI) } uploaded={ this.getReport(this.props.uploaded, REPORT_TYPE_AEFI) } showPage={ this.showPage } type={ AEFI_REPORT_PAGE }/>
          </div>
          <div className="col-md-3 col-sm-4">
            <h3>AEFI Inv.</h3>
            <p>Serious Adverse Event Following Immunization.</p>
            <button className="btn btn-sm btn-default" onClick={ () => this.showPage(AEFI_INV_PAGE) }>Report</button>
            <ReportListComponent drafts={ this.getReport(this.props.drafts, REPORT_TYPE_AEFI_INV) } completed={  this.getReport(this.props.completed, REPORT_TYPE_AEFI_INV) } uploaded={ this.getReport(this.props.uploaded, REPORT_TYPE_AEFI_INV) } showPage={ this.showPage } type={ AEFI_INV_PAGE }/>
          </div>
          <div className="col-md-3 col-sm-4">
            <h3>SAE</h3>
            <p>Serious Adverse Event</p>
            <button className="btn btn-sm btn-primary" onClick={ () => this.showPage(SAE_FORM_PAGE) }>Report</button>
            <ReportListComponent drafts={ this.getReport(this.props.drafts, REPORT_TYPE_SAE) } completed={ this.getReport(this.props.completed, REPORT_TYPE_SAE) } uploaded={ this.getReport(this.props.uploaded, REPORT_TYPE_SAE) } showPage={ this.showPage } type={ SAE_FORM_PAGE }/>
          </div>
        </div>
        <div className="container">
          <button className="btn btn-sm btn-primary" disabled={ disabled } onClick={ this.uploadData }>Upload data ({ this.state.completed.length })</button>
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
