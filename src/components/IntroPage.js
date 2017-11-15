import React, { Component } from 'react';
import { MAIN_PAGE, ADR_FORM_PAGE, SAE_FORM_PAGE, AEFI_REPORT_PAGE, REPORTS_LIST_PAGE } from '../utils/Constants'

export default class IntroPage extends Component {

  constructor(props) {
    super(props)
    this.showPage = this.showPage.bind(this)
  }

  showPage(page) {
    const { showPage } = this.props
    showPage(page)
  }

  render() {
    return(
      <div className="container-fluid">
        <div className="col-md-4 col-sm-4">
          <h3>ADR</h3>
          <p>Adverse drug reaction</p>
          <button className="btn btn-sm btn-default" onClick={ () => this.showPage(ADR_FORM_PAGE) }>Report</button>
        </div>
        <div className="col-md-4 col-sm-4">
          <h3>AEFI</h3>
          <p>Adverse Event Following Immunization.</p>
          <button className="btn btn-sm btn-default" onClick={ () => this.showPage(AEFI_REPORT_PAGE) }>Report</button>
        </div>
        <div className="col-md-4 col-sm-4">
          <h3>SAE</h3>
          <p>Serious Adverse Event</p>
          <button className="btn btn-sm btn-primary" onClick={ () => this.showPage(SAE_FORM_PAGE) }>Report</button>
        </div>
      </div>
    )
  }
}
