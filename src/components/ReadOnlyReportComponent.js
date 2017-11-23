import React, { Component } from 'react'
import ADRReadOnlyReportComponent from './ADRReadOnlyReportComponent'
import AEFIReadOnlyReportComponent from './AEFIReadOnlyReportComponent'
import DateSelectInput from '../inputs/DateSelectInput'
import SingleMultipleInput from '../inputs/SingleMultipleInput'
import MedicationTableComponent from '../components/MedicationTableComponent'
import FileAttachmentComponent from '../components/FileAttachmentComponent'
import ConcomitantTableComponent from '../components/ConcomitantTableComponent'
import SelectInput from '../inputs/SelectInput'

import { MAIN_PAGE, REPORT_TYPE_ADR, REPORT_TYPE_SAE, REPORT_TYPE_AEFI } from '../utils/Constants'

import { connect } from 'react-redux'
import { saveDraft, uploadData, saveCompleted, removeDraft, validate, showPage } from '../actions'

class ReadOnlyReportComponent extends Component {

  constructor(props) {
    super(props)
    var { model } = this.props
    if(model == null) {
      model = {"rid":1510991587333,"type":"REPORT_TYPE_ADR","name_of_institution":"Nairobi Hosp","sadr_list_of_drugs":[{"brand_name":"dawa","dose_id":"3","drug_name":"c","dose":"1","route_id":"3","frequency_id":"2","start_date":[],"stop_date":[],"suspected_drug":""}],"user":{},"patient_name":"JM","date_of_birth":[],"gender":"Male","date_of_onset_of_reaction":[],"description_of_reaction":"ds","severity":"Yes","severity_reason":"Death","action_taken":"Drug withdrawn","outcome":"Recovered","":"Certain","designation_id":"1","reporter_name":"John","reporter_email":"john@h.com","date_of_end_of_reaction":[]}
    }
    this.state = { model : model, validate : null }
    this.cancel = this.cancel.bind(this)
    this.goBack = this.goBack.bind(this)

  }

  render() {
    var { model } = this.state
    var page = null
    switch(model.type) {
      case REPORT_TYPE_ADR :
        page = <ADRReadOnlyReportComponent model={ model } goBack={ this.goBack }/>
        break
      case REPORT_TYPE_SAE:
        page = <AEFIReadOnlyReportComponent model={ model } goBack={ this.goBack }/>
        break
      case REPORT_TYPE_AEFI :
        page = <AEFIReadOnlyReportComponent model={ model } goBack={ this.goBack }/>
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
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadOnlyReportComponent)
