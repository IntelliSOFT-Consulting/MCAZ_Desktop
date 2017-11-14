import React, { Component } from 'react';
import Header from './Header'
import Footer from './Footer'
import IntroPage from './IntroPage'
import ADRForm from '../forms/ADRForm'
import SAEForm from '../forms/SAEForm'
import AEFIReportingForm from '../forms/AEFIReportingForm'
import AEFIInvForm from '../forms/AEFIInvForm'

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const BrowserWindow = require('electron').remote.BrowserWindow
    let win = new BrowserWindow({ width: 400, height: 320 })
    win.on('close', function () { win = null })
    win.loadURL("http://google.com")
    win.show()
  }

  render() {
    return (
      <div>
        <Header />
        <ADRForm />
        <Footer />
      </div>
    )
  }
}
