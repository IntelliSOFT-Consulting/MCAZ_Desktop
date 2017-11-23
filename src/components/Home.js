import React, { Component } from 'react';
import Header from './Header'
import Footer from './Footer'
import IntroPage from './IntroPage'
import ADRForm from '../forms/ADRForm'
import SAEForm from '../forms/SAEForm'
import AEFIReportingForm from '../forms/AEFIReportingForm'
import AEFIInvForm from '../forms/AEFIInvForm'
import ReadOnlyReportComponent from '../readonly/ReadOnlyReportComponent'

import { connect } from 'react-redux'

import { MAIN_PAGE, ADR_FORM_PAGE, SAE_FORM_PAGE, AEFI_REPORT_PAGE, REPORTS_LIST_PAGE, READ_ONLY_PAGE } from '../utils/Constants'

import { showPage, setReport, changeConnection } from '../actions'

class Home extends Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.getPage = this.getPage.bind(this)
    this.updateConnectionStatus = this.updateConnectionStatus.bind(this)
  }

  handleClick() {
    const BrowserWindow = require('electron').remote.BrowserWindow
    let win = new BrowserWindow({ width: 400, height: 320 })
    win.on('close', function () { win = null })
    win.loadURL("http://google.com")
    win.show()
  }

  getPage() {
    const { page } = this.props
    switch(page) {
      case ADR_FORM_PAGE:
        return <ADRForm {...this.props} />
      case SAE_FORM_PAGE:
        return <SAEForm />
      case AEFI_REPORT_PAGE:
        return <AEFIReportingForm />
      case READ_ONLY_PAGE:
        return <ReadOnlyReportComponent />
      default:
        return <IntroPage {...this.props} />
    }
  }

  render() {

    return (
      <div>
        <Header />
        { this.getPage() }
        <Footer isConnected={ this.props.isConnected }/>
      </div>
    )
  }

  updateConnectionStatus() {
    const { changeConnection } = this.props
    changeConnection(navigator.onLine)
  }

  componentDidMount() {
    window.addEventListener('online',  this.updateConnectionStatus)
    window.addEventListener('offline',  this.updateConnectionStatus)
    this.updateConnectionStatus()

  }
}

const mapStateToProps = state => {
  return {
    connection: state.appState.connection,
    page : state.appState.page,
    drafts: state.appState.drafts,
    completed: state.appState.completed,
    uploaded: state.appState.uploaded,
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
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
