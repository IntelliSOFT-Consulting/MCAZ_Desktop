import React, { Component } from 'react';
import { MAIN_PAGE, LOGIN_PAGE } from '../utils/Constants'

import Alert from '../dialogs/Alert'

export default class SignupPage extends Component {

  constructor(props) {
    super(props)
    this.showPage = this.showPage.bind(this)
    this.getReport = this.getReport.bind(this)
    this.signup = this.signup.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.isEmailValid = this.isEmailValid.bind(this)
    const { completed, connection } = this.props
    this.state = { email : "", password: '', confirmPassword: "", showAlert : false }
  }

  showPage(page, report) {
    const { showPage, setReport } = this.props
    setReport(report)
    showPage(page)
  }

  getReport(reports, type) {
    return reports.filter(report => report.type == type)
  }

  isEmailValid(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  signup() {
    if(this.state.email == "" && this.state.password == '' && this.state.confirmPassword == '') {
      this.setState({ validate: true })
    } else if(this.state.password != this.state.confirmPassword) {
      this.setState({ errorMsg : "Password do not match", showAlert: true, password : "", confirmPassword: ""  })
    } else if(this.state.password.length < 6) {
      this.setState({ errorMsg : "Password should be at least 6 characters long", showAlert: true })
    } else if(!this.isEmailValid(this.state.email)) {
      this.setState({ errorMsg : "Email not valid", showAlert: true })
    } else if(this.state.email != "" && this.state.password != '' && this.state.confirmPassword != '') {
      const { signUp } = this.props
      var data = {}
      data.email = this.state.email
      data.password = this.state.password
      data.confirm_password = this.state.confirmPassword
      data.is_active = false
      signUp(data)
    } else {
      this.setState({ validate: true })
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
    const hasErrorEmail = this.state.validate && this.state.email == ""? " has-error " : ""
    const hasErrorPass = this.state.validate && this.state.password == ""? " has-error " : ""
    const hasErrorPassConf = this.state.validate && this.state.confirmPassword == ""? " has-error " : ""

    var alert = null
    if(this.state.showAlert) {
      alert = (
        <Alert
          visible={ this.state.showAlert }
          title="Error"
          onClose={ this.closeModal }
          body={ this.state.errorMsg }
          close={ "Okay" }
          confirmBSStyle={ "success" }
          >
        </Alert>
      )
    }
    return(
      <div className="container-fluid">
        { alert }
        <div className="login-signup-box">

          <div className={ `form-group ${hasErrorEmail}` }>
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" name="email" value={ this.state.email } className="form-control" id="exampleInputEmail1" placeholder="Email" onChange={ this.handleChange }/>
          </div>
          <div className={ `form-group ${hasErrorPass}` }>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={ this.state.password } className="form-control" id="password" placeholder="Password" onChange={ this.handleChange }/>
          </div>
          <div className={ `form-group ${hasErrorPassConf}` }>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" name="confirmPassword" value={ this.state.confirmPassword } className="form-control" id="confirmPassword" placeholder="Confirm Password" onChange={ this.handleChange }/>
          </div>
          <button type="submit" className="btn btn-default btn-sm" onClick={ this.signup }>Signup</button> | <a href="#" onClick={ () => this.showPage(LOGIN_PAGE) }>Return to login</a>
        </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {

  }
}
