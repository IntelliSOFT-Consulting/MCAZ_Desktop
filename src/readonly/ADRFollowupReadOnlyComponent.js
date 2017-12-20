import React, { Component } from 'react'
import TextInput from '../inputs/TextInput'
import ReadOnlyDataRenderer from './ReadOnlyDataRenderer'
import SingleMultipleInput from '../inputs/SingleMultipleInput'
import MedicationTableComponent from '../components/MedicationTableComponent'
import FileAttachmentComponent from '../components/FileAttachmentComponent'
import ConcomitantTableComponent from '../components/ConcomitantTableComponent'
import SelectInput from '../inputs/SelectInput'

import { MAIN_PAGE, REPORT_TYPE_ADR, ADR_FOLLOW_UP_PAGE, REPORT_TYPE_ADR_FOLLOW_UP } from '../utils/Constants'

import { SEVERITY_REASON, OUTCOME, DESIGNATION, ACTION_TAKEN, RELATEDNESS_TO_ADR, BOOLEAN_OPTIONS } from '../utils/FieldOptions'

import { connect } from 'react-redux'
import { saveDraft, uploadData, saveCompleted, removeDraft, validate, showPage } from '../actions'

export default class ADRFollowupReadOnlyComponent extends Component {

  constructor(props) {
    super(props)
    var { model } = this.props
    if(model == null) {
      model = {}
    }
    this.state = { model : model, validate : null }
    //this.saveAndContinue = this.saveAndContinue.bind(this)

  }
  render() {
    //var { model } = this.state
    const { goBack, model } = this.props

    return (
      <div className='adr-form form'>
        <h3 className="text-center">
          <span className="text-center">
            <img src="assets/images/mcaz_3.png" className="logo"></img>
          </span><br/>
        Adverse Drug Reaction (ADR) Report Form - Follow Up
        </h3>
        <h5 className="text-center">Identities of Reporter, Patient and Institute will remain confidential</h5>

        <form className="form-horizontal">
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="MCAZ Ref #" model={ model } name="reference_number"/>
            </div>
          </div>
          <hr/>
          <h4 className="text-center">Adverse Reaction</h4>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Date of onset of reaction" model={ model } type="date"  required={ true } name="date_of_onset_of_reaction"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Date of end of reaction (if it ended)" type="date"  model={ model } name="date_of_end_of_reaction"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <ReadOnlyDataRenderer label="Description of ADR" multiLine={ true } model={ model } name="description_of_reaction"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Serious" model={ model } name="severity" required={ true } type="option" options={ BOOLEAN_OPTIONS }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Reason for Seriousness" model={ model } name="severity_reason" type="option" options={ SEVERITY_REASON }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Relevant Medical History" multiLine={ true } model={ model } name="medical_history"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Relevant Past Drug Therapy" multiLine={ true } model={ model } name="past_drug_therapy"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <ReadOnlyDataRenderer label="Laboratory tests results:" multiLine={ true } model={ model } name="lab_test_results"/>
            </div>
          </div>
          <hr/>
          <div className="container">
            <MedicationTableComponent label="Current Medication (including OTC and herbals) "  readonly={ true } name="sadr_list_of_drugs" model={ model }/>
          </div>

          <hr/>
          <FileAttachmentComponent label="Do you have files that you would like to attach? click on the button to add them:" readonly={ true }  name="attachments" model={ model }/>
          <hr/>
          <div className="container well">
            <div className="col-md-3 col-md-offset-1 btn-toolbar">
              <button className="btn btn-sm btn-primary" onClick={ (e) => { e.preventDefault(); goBack(e) } }>Close</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
