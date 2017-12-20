import React, { Component } from 'react';
import Confirm from "../dialogs/Confirm"

import { MAIN_PAGE, SIGNUP_PAGE } from '../utils/Constants'


export default class LoginPage extends Component {

  constructor(props) {
    super(props)
    this.showPage = this.showPage.bind(this)
    this.getReport = this.getReport.bind(this)
    this.login = this.login.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.doLogin = this.doLogin.bind(this)
    this.closeModal = this.closeModal.bind(this)
    const { completed, connection } = this.props
    this.state = { email : "", password: '', confirmClearData: false }
  }

  showPage(page, report) {
    const { showPage, setReport } = this.props
    showPage(page)
  }

  getReport(reports, type) {
    return reports.filter(report => report.type == type)
  }

  login() {
    if(this.state.email != '' && this.state.password != '') {
      if(this.props.user.username != null && this.state.email != this.props.user.username) {
        this.setState({ confirmClearData : true })
      } else {
        this.doLogin()
      }

    } else {
      this.setState({ validate: true })
    }
  }

  doLogin() {
    this.setState({ confirmClearData : false })
    const { login } = this.props
    var data = {}
    data.username = this.state.email
    data.password = this.state.password
    login(data)
  }

  handleChange(e) {
    var state = {}
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  closeModal() {
    this.setState({ confirmClearData : false })
  }

  render() {
    const hasErrorEmail = this.state.validate && this.state.email == ""? " has-error " : ""
    const hasErrorPass = this.state.validate && this.state.password == ""? " has-error " : ""
    var confirmClearData = null
    if(this.state.confirmClearData) {
      confirmClearData = (
        <Confirm
          visible={ this.state.confirmClearData }
          title="Confirm"
          cancel={ this.closeModal }
          body={ "Another user has logged in using this machine, if you proceed it will wipe out all data, continue?" }
          confirmText={ "Yes" }
          confirmBSStyle={ "danger" }
          onConfirm={ this.doLogin }
          cancelText={ "No" }>
        </Confirm>
      )
    }
    return(
      <div className="container-fluid">
        { confirmClearData }
        <div className="login-signup-box">
          <div className={ `form-group ${hasErrorEmail}` }>
            <label className="control-label form-input-label" htmlFor="exampleInputEmail1">Username</label>
            <input type="email" name="email" className="form-control" value={ this.state.email } id="exampleInputEmail1" placeholder="Username" onChange={ this.handleChange }/>
          </div>
          <div className={ `form-group ${hasErrorPass}` }>
            <label className="control-label form-input-label" htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" name="password" value={ this.state.password } id="exampleInputPassword1" placeholder="Password" onChange={ this.handleChange }/>
          </div>
          <button type="submit" className="btn btn-default btn-sm" onClick={ this.login }>Login</button> | <a href="#" onClick={ () => this.showPage(SIGNUP_PAGE) }>Signup</a>
        </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {

  }
}
