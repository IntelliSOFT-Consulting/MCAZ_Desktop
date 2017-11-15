import React, { Component } from 'react';
import Header from './Header'
import Footer from './Footer'
import IntroPage from './IntroPage'
import ADRForm from '../forms/ADRForm'
import SAEForm from '../forms/SAEForm'
import AEFIReportingForm from '../forms/AEFIReportingForm'
import AEFIInvForm from '../forms/AEFIInvForm'

import { connect } from 'react-redux'

import { MAIN_PAGE, ADR_FORM_PAGE, SAE_FORM_PAGE, AEFI_REPORT_PAGE, REPORTS_LIST_PAGE } from '../utils/Constants'

import { showPage } from '../actions'

class Home extends Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.getPage = this.getPage.bind(this)
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
      case REPORTS_LIST_PAGE:
        return <ADRForm />
      default:
        return <IntroPage {...this.props} />
    }
  }

  render() {

    return (
      <div>
        <Header />
        { this.getPage() }
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    connection: state.appState.connection,
    page : state.appState.page
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showPage: (page) => {
      dispatch(showPage(page))
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
