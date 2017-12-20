import React, { Component } from 'react';
import Header from './Header'
import Footer from './Footer'
import IntroPage from './IntroPage'
import ADRForm from '../forms/ADRForm'
import SAEForm from '../forms/SAEForm'
import AEFIReportingForm from '../forms/AEFIReportingForm'
import AEFIInvForm from '../forms/AEFIInvForm'
import ReadOnlyReportComponent from '../readonly/ReadOnlyReportComponent'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import ADRFollowUpForm from '../forms/ADRFollowUpForm'
import AEFIReportFollowupForm from '../forms/AEFIReportFollowupForm'

var NotificationSystem = require('react-notification-system')

import { connect } from 'react-redux'

import { MAIN_PAGE, ADR_FORM_PAGE, SAE_FORM_PAGE, AEFI_REPORT_PAGE, AEFI_INV_PAGE, REPORTS_LIST_PAGE, READ_ONLY_PAGE, LOGIN_PAGE, SIGNUP_PAGE, ADR_FOLLOW_UP_PAGE,
  AEFI_FOLLOW_UP_PAGE } from '../utils/Constants'

import { showPage, setReport, changeConnection, uploadCompletedReports, setNotification, setFollowUp, login, signUp, logout, fetchReport, fetchDeviceInfo } from '../actions'

class Home extends Component {
  _notificationSystem: null
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.getPage = this.getPage.bind(this)
    this.updateConnectionStatus = this.updateConnectionStatus.bind(this)
    this._addNotification = this._addNotification.bind(this)
    const { token } = this.props
    this.state = { token : token }
  }

  handleClick() {
    const BrowserWindow = require('electron').remote.BrowserWindow
    let win = new BrowserWindow({ width: 400, height: 320 })
    win.on('close', function () { win = null })
    win.loadURL("http://google.com")
    win.show()
  }

  getPage() {
    const { page, token } = this.props
    if(token == null && page != LOGIN_PAGE && page != SIGNUP_PAGE) {
      return <LoginPage {...this.props} />
    } else if(token != null && (page == LOGIN_PAGE || page == SIGNUP_PAGE)) {
      return <IntroPage  {...this.props}/>
    }
    switch(page) {
      case ADR_FORM_PAGE:
        return <ADRForm {...this.props} />
      case SAE_FORM_PAGE:
        return <SAEForm />
      case AEFI_REPORT_PAGE:
        return <AEFIReportingForm />
      case AEFI_INV_PAGE:
        return <AEFIInvForm />
      case READ_ONLY_PAGE:
        return <ReadOnlyReportComponent />
      case LOGIN_PAGE:
        return <LoginPage {...this.props}/>
      case SIGNUP_PAGE:
        return <SignupPage {...this.props}/>
      case MAIN_PAGE:
        return <IntroPage  {...this.props}/>
      case ADR_FOLLOW_UP_PAGE:
        return <ADRFollowUpForm {...this.props}/>
      case AEFI_FOLLOW_UP_PAGE:
        return <AEFIReportFollowupForm {...this.props}/>
      default:
        return <LoginPage {...this.props} />
    }
  }

  render() {
    const { showPage, logout, token } = this.props
    return (
      <div>
        <Header showPage={ showPage } logout={ logout } token={ token }/>
        { this.getPage() }
        <Footer connection={ this.props.connection }/>
        <NotificationSystem ref="notificationSystem" />
      </div>
    )
  }

  _addNotification(message) {
    const level = message.level? message.level : "info"
    this._notificationSystem.addNotification({
      message: message.message,
      level: level, position: 'tr'
    });
  }

  updateConnectionStatus() {
    const { changeConnection } = this.props
    changeConnection(navigator.onLine)
  }

  componentDidMount() {
    window.addEventListener('online',  this.updateConnectionStatus)
    window.addEventListener('offline',  this.updateConnectionStatus)
    this.updateConnectionStatus()
    this._notificationSystem = this.refs.notificationSystem
    const { fetchDeviceInfo } = this.props
    fetchDeviceInfo()
  }

  componentWillReceiveProps(nextProps) {
    const { notification, showPage } = this.props
    const nextNotification = nextProps.notification
    if(nextNotification && ((notification && notification.id != nextNotification.id) || notification == null)) {
      this._addNotification(nextNotification)
    }
    const { token } = this.state
    this.setState({ token : nextProps.token })
    if(token != null && nextProps.token == null) {
      showPage(LOGIN_PAGE)
    } else if(token == null && nextProps.token != null) {
      showPage(MAIN_PAGE)
    }
  }
}

const mapStateToProps = state => {
  return {
    connection: state.appState.connection,
    page : state.appState.page,
    drafts: state.appState.drafts,
    completed: state.appState.completed,
    uploaded: state.appState.uploaded,
    notification: state.appState.notification,
    token : state.appState.user.token,
    settings : state.appState.settings,
    user: state.appState.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showPage: (page) => {
      dispatch(showPage(page))
    },
    setReport: (model) => {
      dispatch(setReport(model))
    },
    changeConnection: (status) => {
      dispatch(changeConnection(status))
    },
    uploadCompletedReports: (completed, token) => {
      dispatch(uploadCompletedReports(completed, token))
    },
    setNotification: message => {
      dispatch(setNotification(message))
    },
    setFollowUp: followUp => {
      dispatch(setFollowUp(followUp))
    },
    login: data => {
      dispatch(login(data))
    },
    logout: data => {
      dispatch(logout(data))
    },
    signUp: data => {
      dispatch(signUp(data))
    },
    fetchReport: (id, url, token) => {
      dispatch(fetchReport(id, url, token))
    },
    fetchDeviceInfo: () => {
      dispatch(fetchDeviceInfo())
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
