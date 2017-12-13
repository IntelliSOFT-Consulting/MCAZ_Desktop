import React, { Component } from 'react';
import { MAIN_PAGE, SIGNUP_PAGE } from '../utils/Constants'


export default class LoginPage extends Component {

  constructor(props) {
    super(props)
    this.showPage = this.showPage.bind(this)
    this.getReport = this.getReport.bind(this)
    this.login = this.login.bind(this)
    this.handleChange = this.handleChange.bind(this)
    const { completed, connection } = this.props
    this.state = { email : "", password: '' }
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
      const { login } = this.props
      var data = {}
      data.username = this.state.email
      data.password = this.state.password
      login(data)
    } else {
      this.setState({ validate: true })
    }
  }

  handleChange(e) {
    var state = {}
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  render() {
    const hasErrorEmail = this.state.validate && this.state.email == ""? " has-error " : ""
    const hasErrorPass = this.state.validate && this.state.password == ""? " has-error " : ""
    return(
      <div className="container-fluid">
        <div className="login-signup-box">
          <div className={ `form-group ${hasErrorEmail}` }>
            <label className="control-label form-input-label" htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" name="email" className="form-control" value={ this.state.email } id="exampleInputEmail1" placeholder="Email" onChange={ this.handleChange }/>
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
