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

export default class AEFIReadOnlyReportComponent extends Component {

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
    const newFollowUp = { rid : Date.now(), "type": REPORT_TYPE_AEFI_FOLLOW_UP, parent_reference : model.reference_number, report_type : "FollowUp" }
    const followUpBtn = model.reference_number != null? (<button className="btn btn-sm btn-success" onClick={ (e) => { e.preventDefault(); showPage(AEFI_FOLLOW_UP_PAGE, newFollowUp) } }>Create follow-up report</button>) : null
    return (
      <div className="aefi-form form">
        <div id='form-read-only'>
          <h3 className="text-center">
            <span className="text-center">
              <img src="assets/images/mcaz_3.png" className="logo"></img>
            </span><br/>
            Adverse Event After Immunization (AEFI) Reporting Form
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
                <ReadOnlyDataRenderer label="Patient first name" required={ true }  name="patient_name" model={ model }/>
              </div>
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Surname"  name="patient_surname" model={ model }/>
              </div>
            </div>
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Next of kin"  name="patient_next_of_kin" model={ model }/>
              </div>
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Patient's physical address" required={ true }  name="patient_address" model={ model }/>
              </div>
            </div>
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Telephone" name="patient_telephone" model={ model }/>
              </div>
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Gender" name="gender" model={ model } type="option" options={ GENDER } inline={ true }/>
              </div>
            </div>
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Date of Birth:" required={ true }   name="date_of_birth" model={ model } type="date"/>
              </div>
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Age at onset"  name="age_at_onset" model={ model } />
              </div>
            </div>
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Age on onset"  name="age_at_onset_specify" model={ model }/>
              </div>
            </div>
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Reporter's name" required={ true }   name="reporter_name" model={ model }/>
              </div>
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Designation" name="designation_id" model={ model } type="option" options={ DESIGNATION }/>
              </div>
            </div>
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Department" name="reporter_department" model={ model }/>
              </div>
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Address" name="reporter_address" model={ model }/>
              </div>
            </div>
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="District" name="reporter_district" model={ model }/>
              </div>
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Province" name="reporter_province" model={ model } options={ PROVINCES } type="option"/>
              </div>
            </div>
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Telephone" name="reporter_phone" model={ model }/>
              </div>
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Email" name="reporter_email" model={ model }/>
              </div>
            </div>

            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Name of vaccination center" required={ true }  name="name_of_vaccination_center" model={ model }/>
              </div>
            </div>
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
                <ReadOnlyDataRenderer label="Was patient hospitalized?"  name="patient_hospitalization" model={ model } inline={ true } type="option" options={ BOOLEAN_OPTIONS }/>
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
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Serious" required={ true }  name="serious" model={ model } inline={ true } type="option" options={ BOOLEAN_OPTIONS }/>
              </div>
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="If yes"  name="serious_yes" model={ model } type="option" options={ AEFI_SEVERITY_REASON }/>
              </div>
            </div>
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Outcome"  name="outcome" required={ true }  model={ model } type="option" options={ AEFI_OUTCOME }/>
              </div>
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="If died, date of death" name="died_date" model={ model } type="date"/>
              </div>
            </div>
            <div className="container">
              <div className="col-md-12 ">
                <ReadOnlyDataRenderer label="Autopsy done" name="autopsy" model={ model } type="option" options={ BOOLEAN_UNKNOWN_OPTIONS } inline={ true }/>
              </div>
            </div>
            <div className="container">
              <div className="col-md-12 ">
                <ReadOnlyDataRenderer label="Past medical history (including history of similar reaction or other allergies), concomitant medication and other relevant information (e.g. other cases). Use additional sheet if needed :"
                  multiLine={ true } name="past_medical_history" model={ model } />
              </div>
            </div>
            <h5 className="text-center">First decision making level to complete (District level):</h5>
            <div className="container">
              <div className="col-md-4 ">
                <ReadOnlyDataRenderer label="Date report recieved at District level" name="district_receive_date" model={ model } type="date"/>
              </div>
              <div className="col-md-4 ">
                <ReadOnlyDataRenderer label="Investigation needed?"  name="investigation_needed" model={ model } type="option" options={ BOOLEAN_OPTIONS } inline={ true }/>
              </div>
              <div className="col-md-4 ">
                <ReadOnlyDataRenderer label="If yes, date investigation planned"  name="investigation_date" model={ model } type="date"/>
              </div>
            </div>
            <h5 className="text-center">National level to complete:</h5>
            <div className="container">
              <div className="col-md-4 ">
                <ReadOnlyDataRenderer label="Date report received at national level (DD/MM/YYYY):" name="national_receive_date" model={ model } type="date"/>
              </div>
              <div className="col-md-8 ">
                <ReadOnlyDataRenderer label="Comments" multiLine={ true } name="comments" model={ model }/>
              </div>
            </div>

          </form>
        </div>
        <div className="container well">
          <div className="col-md-6 col-md-offset-1 btn-toolbar">
            <button className="btn btn-sm btn-default" onClick={ (e) => { e.preventDefault(); goBack(e) } }>Close</button>
            { followUpBtn }
            <button className="btn btn-sm btn-success" onClick={ (e) => { e.preventDefault(); printPDF() } }>Get PDF</button>
          </div>
        </div>
      </div>
    )
  }
}
