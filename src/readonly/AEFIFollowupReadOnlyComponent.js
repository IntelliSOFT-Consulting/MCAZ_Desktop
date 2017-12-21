import React, { Component } from 'react'
import TextInput from '../inputs/TextInput'
import ReadOnlyDataRenderer from './ReadOnlyDataRenderer'


import FileAttachmentComponent from '../components/FileAttachmentComponent'
import AEFIVaccinationTableComponent from '../components/AEFIVaccinationTableComponent'
import AEFIDilutentTableComponent from '../components/AEFIDilutentTableComponent'

import { MAIN_PAGE, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_FOLLOW_UP, AEFI_FOLLOW_UP_PAGE } from '../utils/Constants'

import { BOOLEAN_OPTIONS, BOOLEAN_UNKNOWN_OPTIONS, GENDER, AEFI_SEVERITY_REASON, DESIGNATION, AEFI_OUTCOME, AEFI_ADVERSE_EVENTS, PROVINCES } from '../utils/FieldOptions'

import { connect } from 'react-redux'
import { saveDraft, uploadData, saveCompleted, removeDraft, validate, showPage } from '../actions'

export default class AEFIFollowupReadOnlyComponent extends Component {

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
    const { model, goBack, showPage, printPDF } = this.props

    return (
      <div className="aefi-form form">
        <div id="form-read-only">
          <h3 className="text-center">
            <span className="text-center">
              <img src="assets/images/mcaz_3.png" className="logo"></img>
            </span><br/>
          Adverse Event After Immunization (AEFI) Reporting Form - Follow up
          </h3>
          <h5 className="text-center">Identities of Reporter, Patient and Institute will remain confidential</h5>
          <div className="container">
            <div className="col-md-6 ">
              <ReadOnlyDataRenderer label="MCAZ Ref #" model={ model } name="reference_number"/>
            </div>
          </div>
          <form className="form-horizontal">
            <hr/>
            <div className="container">
              <div className="col-md-6 ">
                <AEFIVaccinationTableComponent readonly={ true } name="vaccination" model={ model }  label="Vaccine   "/>
              </div>
            </div>
            <hr/>
            <h4 className="text-center">Adverse events</h4>
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Adverse events" required={ true }   name="adverse_events" model={ model } type="option" options={ AEFI_ADVERSE_EVENTS }/>
              </div>
            </div>

            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Date and time AEFI started"  name="aefi_date" model={ model } showTime={ true } type="date" />
              </div>
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Was patient hospitalized?"  name="patient_hospitalization" model={ model } inline={ true } options={ BOOLEAN_OPTIONS }/>
              </div>
            </div>

            <div className="container">
              <div className="col-md-12 ">
                <ReadOnlyDataRenderer label="Date patient notified event to health system" name="notification_date" model={ model } type="date"/>
              </div>
            </div>

            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Describe AEFI" multiLine={ true } name="description_of_reaction" model={ model }/>
              </div>
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Treatment provided"  name="treatment_provided" model={ model } type="option" options={ BOOLEAN_OPTIONS } inline={ true }/>
              </div>
            </div>
          </form>
        </div>
        <div className="container well">
          <div className="col-md-3 col-md-offset-1 btn-toolbar">
            <button className="btn btn-sm btn-default" onClick={ (e) => { e.preventDefault(); goBack(e) } }>Close</button>
            <button className="btn btn-sm btn-success" onClick={ (e) => { e.preventDefault(); printPDF() } }>Get PDF</button>
          </div>
        </div>
      </div>
    )
  }
}
