import React, { Component } from 'react';
import { MAIN_PAGE, LOGIN_PAGE } from '../utils/Constants'
import { getURL } from '../utils/utils'

import Alert from '../dialogs/Alert'
import { REPORT_TYPE_ADR, REPORT_TYPE_SAE, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_INV } from '../utils/Constants'

export default class ReportSearchComponent extends Component {

  constructor(props) {
    super(props)
    this.showPage = this.showPage.bind(this)
    this.openReport = this.openReport.bind(this)
    this.handleChange = this.handleChange.bind(this)
    const { completed, connection } = this.props
    this.state = { reference_number : "", type : "" }
  }

  showPage(page, report) {
    const { showPage, setReport } = this.props
    setReport(report)
    showPage(page)
  }

  openReport(e) {
    e.preventDefault()
    if(this.state.reference_number == "" || this.state.type == "") {
      this.setState({ validate : true })
      return
    }
    const { uploaded, showPage } = this.props
    const report = uploaded.find((i) => i.reference_number == this.state.reference_number)
    if(report) {
      showPage('READ_ONLY_PAGE', report)
    } else {
      const { fetchReport, token } = this.props
      fetchReport(btoa(this.state.reference_number), getURL({ type : this.state.type }),token)
    }

  }

  handleChange(e) {
    var state = {}
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  closeModal() {
    this.setState({ showAlert : false })
  }

  render() {
    const hasErrorType = this.state.validate && this.state.type == ""? " has-error " : ""
    const hasErrorRefNumber = this.state.validate && this.state.reference_number == ""? " has-error " : ""
    return(
      <div className="search-form">
        <form className="form-inline">
          <div className="form-group">
            <label className="control-label">Search for report</label>
          </div>
          <div className={ `form-group ${hasErrorType}` }>
            <select className="form-control input-sm" name="type" onChange={ this.handleChange } value={ this.state.type }>
              <option value="">Select type</option>
              <option value={ REPORT_TYPE_ADR }>ADR</option>
              <option value={ REPORT_TYPE_SAE }>SAE</option>
              <option value={ REPORT_TYPE_AEFI }>AEFI Report</option>
              <option value={ REPORT_TYPE_AEFI_INV }>AEFI investigation</option>
            </select>
          </div>
          <div className={ `form-group ${hasErrorRefNumber}` }>
            <input type="text" className="form-control input-sm" name="reference_number" placeholder="Reference number" onChange={ this.handleChange } value={ this.state.reference_number }/>
          </div>
          <button type="submit" onClick={ this.openReport } className="btn btn-success btn-sm">
            <span className="glyphicon glyphicon-search" aria-hidden="true"></span> Open
          </button>
        </form>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {

  }
}
