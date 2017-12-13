import React, { Component } from 'react';

import { ADR_FORM_PAGE, SAE_FORM_PAGE, AEFI_REPORT_PAGE, AEFI_INV_PAGE, LOGIN_PAGE, SIGNUP_PAGE, MAIN_PAGE } from '../utils/Constants'

export default class Header extends Component {
   constructor(props) {
    super(props)
    this.showPage = this.showPage.bind(this)
    this.logout = this.logout.bind(this)
  }

  showPage(page, report) {
    const { showPage, setReport } = this.props
    //setReport(report)
    showPage(page)
  }

  logout() {
    const { logout } = this.props
    logout()
  }

  render() {
    return(
      <div className="jumbotron">
        <div className="container">
          <h2>Medicines Control Authourity of Zimbabwe</h2>
          <p>SAE, ADR and AEFI electronic reportings.</p>
        </div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
            </div>
            <ul className="nav navbar-nav">
              <li className="active"><a href="#" onClick={ () => this.showPage(MAIN_PAGE) }>Home</a></li>
              <li><a href="#" onClick={ () => this.showPage(ADR_FORM_PAGE) }>ADR</a></li>
              <li><a href="#" onClick={ () => this.showPage(SAE_FORM_PAGE) }>SAE</a></li>
              <li><a href="#" onClick={ () => this.showPage(AEFI_REPORT_PAGE) }>AEFI</a></li>
              <li><a href="#" onClick={ () => this.showPage(AEFI_INV_PAGE) }>Serious AEFI</a></li>
              <li><a href="#" onClick={ () => this.logout() }>Logout</a></li>

            </ul>
          </div>
        </nav>
      </div>
    )
  }

}
