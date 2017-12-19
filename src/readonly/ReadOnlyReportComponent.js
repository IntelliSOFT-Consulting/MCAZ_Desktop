import React, { Component } from 'react'
import ADRReadOnlyReportComponent from './ADRReadOnlyReportComponent'
import AEFIReadOnlyReportComponent from './AEFIReadOnlyReportComponent'
import AEFIInvReadOnlyReportComponent from './AEFIInvReadOnlyReportComponent'
import SAEReadOnlyComponent from './SAEReadOnlyComponent'
import DateSelectInput from '../inputs/DateSelectInput'
import SingleMultipleInput from '../inputs/SingleMultipleInput'
import MedicationTableComponent from '../components/MedicationTableComponent'
import FileAttachmentComponent from '../components/FileAttachmentComponent'
import ConcomitantTableComponent from '../components/ConcomitantTableComponent'
import SelectInput from '../inputs/SelectInput'

import { MAIN_PAGE, REPORT_TYPE_ADR, REPORT_TYPE_SAE, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_INV } from '../utils/Constants'

import { connect } from 'react-redux'
import { saveDraft, uploadData, saveCompleted, removeDraft, validate, showPage, setReport } from '../actions'

class ReadOnlyReportComponent extends Component {

  constructor(props) {
    super(props)
    var { model } = this.props
    if(model == null) {
      model = {}
    }
    this.state = { model : model, validate : null }
    this.cancel = this.cancel.bind(this)
    this.goBack = this.goBack.bind(this)
    this.showPage = this.showPage.bind(this)

  }

  render() {
    var { model } = this.state
    var page = null
    switch(model.type) {
      case REPORT_TYPE_ADR :
        page = <ADRReadOnlyReportComponent model={ model } goBack={ this.goBack } showPage={ this.showPage }/>
        break
      case REPORT_TYPE_SAE:
        page = <SAEReadOnlyComponent model={ model } goBack={ this.goBack }/>
        break
      case REPORT_TYPE_AEFI :
        page = <AEFIReadOnlyReportComponent model={ model } goBack={ this.goBack } showPage={ this.showPage }/>
        break
      case REPORT_TYPE_AEFI_INV :
        page = <AEFIInvReadOnlyReportComponent model={ model } goBack={ this.goBack } showPage={ this.showPage }/>
        break
      default:
        page = null
    }
    return page
  }


  cancel(e) {
    e.preventDefault()
    const { showPage } = this.props
    showPage(MAIN_PAGE)
  }

  goBack() {
    const { showPage } = this.props
    showPage(MAIN_PAGE)
  }

  showPage(page, model) {
    const { showPage, setReport } = this.props
    if(model) {
      setReport(model)
    }

    showPage(page)
  }
}

const mapStateToProps = state => {
  return {
    connection: state.appState.connection,
    model: state.appState.currentReport
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
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadOnlyReportComponent)
