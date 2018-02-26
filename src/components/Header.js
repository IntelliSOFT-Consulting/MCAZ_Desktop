import React, { Component } from 'react';

import Confirm from '../dialogs/Confirm'

import { ADR_FORM_PAGE, SAE_FORM_PAGE, AEFI_REPORT_PAGE, AEFI_INV_PAGE, LOGIN_PAGE, SIGNUP_PAGE, MAIN_PAGE, NEWS_PAGE, ARCHIVED_PAGE } from '../utils/Constants'

export default class Header extends Component {
   constructor(props) {
    super(props)
    this.showPage = this.showPage.bind(this)
    this.logout = this.logout.bind(this)
    this.logoutConfirmed = this.logoutConfirmed.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.onContactDataChange = this.onContactDataChange.bind(this)
    this.getContactForm = this.getContactForm.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.state = { confirmLogout : false, contactData : { email : "", message : "" }, contactUs : false }
  }

  showPage(page, report) {
    const { showPage, setReport } = this.props
    setReport(null)
    showPage(page)
  }

  logout() {
    const { token } = this.props
    if(token != null) {
      this.setState({ confirmLogout : true })
    }
  }

  closeModal() {
    this.setState({ confirmLogout : false, contactUs: false, validate : false })
  }

  logoutConfirmed() {
    this.closeModal()
    const { logout } = this.props
    logout()
  }

  render() {
    const { page } = this.props
    var confirmLogout = null
    if(this.state.confirmLogout) {
      confirmLogout = (
        <Confirm
          visible={ this.state.confirmLogout }
          title="Confirm"
          cancel={ this.closeModal }
          body={ "Proceed with logout?" }
          confirmText={ "Yes" }
          confirmBSStyle={ "danger" }
          onConfirm={ this.logoutConfirmed }
          cancelText={ "No" }
          >
        </Confirm>
      )
    }
    var contactUs = null
    if(this.state.contactUs) {
      contactUs = (
        <Confirm
          visible={ this.state.contactUs }
          title="Contact us"
          cancel={ this.closeModal }
          body={ this.getContactForm() }
          confirmText={ "Send" }
          confirmBSStyle={ "success" }
          onConfirm={ this.sendMessage }
          cancelText={ "Cancel" }
          >
        </Confirm>
      )
    }
    return(
      <div className="jumbotron">
        { confirmLogout } { contactUs }
        <div className="container">
          <h2>Medicines Control Authority of Zimbabwe</h2>
          <p>SAE, ADR and AEFI electronic reportings.</p>
        </div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
            </div>
            <ul className="nav navbar-nav">
              <li className={ page == MAIN_PAGE ? "active" : "" }><a href="#" onClick={ () => this.showPage(MAIN_PAGE) }>Home</a></li>
              <li className={ page == ADR_FORM_PAGE ? "active" : "" }><a href="#" onClick={ () => this.showPage(ADR_FORM_PAGE) }>ADR</a></li>
              <li className={ page == SAE_FORM_PAGE ? "active" : "" }><a href="#" onClick={ () => this.showPage(SAE_FORM_PAGE) }>SAE</a></li>
              <li className={ page == AEFI_REPORT_PAGE ? "active" : "" }><a href="#" onClick={ () => this.showPage(AEFI_REPORT_PAGE) }>AEFI</a></li>
              <li className={ page == AEFI_INV_PAGE ? "active" : "" }><a href="#" onClick={ () => this.showPage(AEFI_INV_PAGE) }>Serious AEFI</a></li>
              <li><a href="#" onClick={ () => this.contactUs() }>Contact us</a></li>
              <li className={ page == NEWS_PAGE ? "active" : "" }><a href="#" onClick={ () => this.showPage(NEWS_PAGE) }>News</a></li>
              <li className={ page == ARCHIVED_PAGE ? "active" : "" }><a href="#" onClick={ () => this.showPage(ARCHIVED_PAGE) }>Archived data</a></li>
              <li><a href="#" onClick={ () => this.logout() }>Logout</a></li>

            </ul>
          </div>
        </nav>
      </div>
    )
  }

  contactUs() {
    this.setState({ contactUs : true, contactData : { email : "", feedback : "", subject: "" } })
  }

  onContactDataChange(e) {
    var { contactData } = this.state
    contactData[e.target.name] = e.target.value
    this.setState({ contactData })
  }

  getContactForm() {
    const hasErrorEmail = this.state.validate && this.state.contactData.email == ""? "has-error" : ""
    const hasErrorMsg = this.state.validate && this.state.contactData.message == ""? "has-error" : ""
    const form = (
      <form className="form">
        <div className={ `form-group ${hasErrorEmail}` }>
          <label>Email</label>
          <input type="text" className="form-control input-sm" placeholder="Email" name="email" value={ this.state.contactData.email } onChange={ this.onContactDataChange }/>
        </div>
        <div className={ `form-group ${hasErrorEmail}` }>
          <label>Subject</label>
          <input type="text" className="form-control input-sm" placeholder="Subject" name="subject" value={ this.state.contactData.subject } onChange={ this.onContactDataChange }/>
        </div>
        <div className={ `form-group ${hasErrorMsg}` }>
          <label>Feedback</label>
          <textarea type="text" className="form-control input-sm" rows="4" placeholder="Write your message" name="feedback" value={ this.state.contactData.feedback } onChange={ this.onContactDataChange }/>
        </div>
      </form>
    )
    return form
  }

  sendMessage() {
    if(this.state.contactData.email == "" || this.state.contactData.message == "") {
      this.setState({ validate : true })
      return
    } else {
      const { contactUs } = this.props
      contactUs(this.state.contactData)
      this.closeModal()
    }
    //console.log(this.state.contactData)
  }

}
