import React, { Component } from 'react'
import messages from '../utils/messages.json'

import { MAIN_PAGE } from '../utils/Constants'

export default class FormComponent extends Component {

  constructor(props) {
    super(props)
    this.saveAndContinue = this.saveAndContinue.bind(this)
    this.cancel = this.cancel.bind(this)
    this.goBack = this.goBack.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.cancelConfirmed = this.cancelConfirmed.bind(this)
  }

  saveAndContinue(e) {
    e.preventDefault()
    const { saveDraft,setNotification } = this.props
    const { model } = this.state
    saveDraft(model)
    setNotification({ message : messages.changesSaved, level: "info", id: new Date().getTime() })
  }

  closeModal() {
    this.setState({ confirmVisible : false, confirmCancel: false })
  }

  cancel(e) {
    e.preventDefault()
    this.setState({ confirmCancel: true })
  }

  cancelConfirmed() {
    const { showPage } = this.props
    showPage(MAIN_PAGE)
  }

  goBack() {
    const { showPage } = this.props
    showPage(MAIN_PAGE)
  }
}
