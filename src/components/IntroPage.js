import React, { Component } from 'react';
import { MAIN_PAGE, ADR_FORM_PAGE, SAE_FORM_PAGE, AEFI_REPORT_PAGE, REPORTS_LIST_PAGE, REPORT_TYPE_ADR } from '../utils/Constants'

import ReportListComponent from './ReportListComponent'

export default class IntroPage extends Component {

  constructor(props) {
    super(props)
    this.showPage = this.showPage.bind(this)
    this.getReport = this.getReport.bind(this)
  }

  showPage(page, report) {
    const { showPage, setReport } = this.props
    setReport(report)
    showPage(page)
  }

  getReport(reports, type) {
    return reports.filter(report => report.type == type)
  }

  render() {
    return(
      <div className="container-fluid">

        <div className="col-md-4 col-sm-4">
          <h3>ADR</h3>
          <p>Adverse drug reaction</p>
          <button className="btn btn-sm btn-default" onClick={ () => this.showPage(ADR_FORM_PAGE) }>Report</button>
          <ReportListComponent drafts={ this.getReport(this.props.drafts, REPORT_TYPE_ADR) } completed={ [] } uploaded={ [] } showPage={ this.showPage } type={ ADR_FORM_PAGE }/>
        </div>
        <div className="col-md-4 col-sm-4">
          <h3>AEFI</h3>
          <p>Adverse Event Following Immunization.</p>
          <button className="btn btn-sm btn-default" onClick={ () => this.showPage(AEFI_REPORT_PAGE) }>Report</button>
          <ReportListComponent drafts={ this.getReport(this.props.drafts, REPORT_TYPE_ADR) } completed={ [] } uploaded={ [] }/>
        </div>
        <div className="col-md-4 col-sm-4">
          <h3>SAE</h3>
          <p>Serious Adverse Event</p>
          <button className="btn btn-sm btn-primary" onClick={ () => this.showPage(SAE_FORM_PAGE) }>Report</button>
          <ReportListComponent drafts={ this.getReport(this.props.drafts, REPORT_TYPE_ADR) } completed={ [] } uploaded={ [] }/>
        </div>
      </div>
    )
  }
}
