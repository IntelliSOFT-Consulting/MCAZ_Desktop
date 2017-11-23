import React, { Component } from 'react'
import TextInput from '../inputs/TextInput'
import ReadOnlyDataRenderer from './ReadOnlyDataRenderer'


import FileAttachmentComponent from '../components/FileAttachmentComponent'
import AEFIVaccinationTableComponent from '../components/AEFIVaccinationTableComponent'

import { MAIN_PAGE, REPORT_TYPE_AEFI } from '../utils/Constants'

import { BOOLEAN_OPTIONS, BOOLEAN_UNKNOWN_OPTIONS, GENDER, AEFI_SEVERITY_REASON, DESIGNATION, OUTCOME } from '../utils/FieldOptions'

import { connect } from 'react-redux'
import { saveDraft, uploadData, saveCompleted, removeDraft, validate, showPage } from '../actions'

export default class AEFIReadOnlyReportComponent extends Component {

  constructor(props) {
    super(props)
    var { model } = this.props
    if(model == null) {
      model = {"rid":1510991587333,"type":"REPORT_TYPE_ADR","name_of_institution":"Nairobi Hosp","sadr_list_of_drugs":[{"brand_name":"dawa","dose_id":"3","drug_name":"c","dose":"1","route_id":"3","frequency_id":"2","start_date":[],"stop_date":[],"suspected_drug":""}],"user":{},"patient_name":"JM","date_of_birth":[],"gender":"Male","date_of_onset_of_reaction":[],"description_of_reaction":"ds","severity":"Yes","severity_reason":"Death","action_taken":"Drug withdrawn","outcome":"Recovered","":"Certain","designation_id":"1","reporter_name":"John","reporter_email":"john@h.com","date_of_end_of_reaction":[]}
    }
    this.state = { model : model, validate : null }
    //this.saveAndContinue = this.saveAndContinue.bind(this)

  }
  render() {
    const { model, goBack } = this.props
    return (
      <div>
        <h3 className="text-center">Adverse Drug Reaction (ADR) Report Form</h3>
        <h5 className="text-center">Identities of Reporter, Patient and Institute will remain confidential</h5>

        <form className="form-horizontal">
          <h5 className="text-center">Patient Details</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Patient first name" required={ true }  name="patient_name" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Surname"  name="patient_surname" model={ model }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Next of kin"  name="patient_next_of_kin" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Patient's physical address" required={ true }  name="patient_address" model={ model }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Telephone" name="patient_telephone" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Gender" name="gender" model={ model } type="options" options={ GENDER } inline={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Date of Birth:" required={ true }   name="date_of_birth" model={ model } type="date"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Age on onset"  name="age_at_onset" model={ model } options={ [] } type="options"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Age on onset"  name="age_at_onset_specify" model={ model }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Reporter's name" required={ true }   name="reporter_name" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Designation" name="designation_id" model={ model } type="options" options={ DESIGNATION }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Department" name="reporter_department" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Address" name="reporter_address" model={ model }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="District" name="reporter_district" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Province" name="reporter_province" model={ model }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Telephone" name="reporter_phone" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Email" name="reporter_email" model={ model }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Today's date" name="" model={ model } type="date"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Name of vaccination center" required={ true }  name="name_of_vaccination_center" model={ model }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <AEFIVaccinationTableComponent readonly={ true } name="vaccination" model={ model }  label="Vaccine/Dilutent   "/>
            </div>
          </div>
          <h5 className="text-center">Adverse events</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Adverse events" required={ true }   name="adverse_events" model={ model } type="options" options={ [] }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Date and time AEFI started"  name="aefi_date" model={ model } showTime={ true } type="date" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <ReadOnlyDataRenderer label="Date patient notified event to health system" name="notification_date" model={ model } type="date"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Describe AEFI" multiLine={ true } name="description_of_reaction" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Treatment provided"  name="treatment_provided" model={ model } type="options" options={ BOOLEAN_OPTIONS } inline={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Serious" required={ true }  name="serious" model={ model } inline={ true } type="options" options={ BOOLEAN_OPTIONS }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="If yes"  name="serious_yes" model={ model } type="options" options={ AEFI_SEVERITY_REASON }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Outcome"  name="outcome" required={ true }  model={ model } type="options" options={ OUTCOME }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="If died, date of death" name="died_date" model={ model } type="date"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <ReadOnlyDataRenderer label="Autopsy done" name="autopsy" model={ model } type="options" options={ BOOLEAN_UNKNOWN_OPTIONS } inline={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <ReadOnlyDataRenderer label="Past medical history (including history of similar reaction or other allergies), concomitant medication and other relevant information (e.g. other cases). Use additional sheet if needed :"
                multiLine={ true } name="past_medical_history" model={ model } />
            </div>
          </div>
          <h5 className="text-center">First decision making level to complete (District level):</h5>
          <div className="container">
            <div className="col-md-4 col-sm-12">
              <ReadOnlyDataRenderer label="Date report recieved at District level" name="district_receive_date" model={ model } type="date"/>
            </div>
            <div className="col-md-4 col-sm-12">
              <ReadOnlyDataRenderer label="Investigation needed?"  name="investigation_needed" model={ model } type="options" options={ BOOLEAN_OPTIONS } inline={ true }/>
            </div>
            <div className="col-md-4 col-sm-12">
              <ReadOnlyDataRenderer label="If yes, date investigation planned"  name="investigation_date" model={ model } type="date"/>
            </div>
          </div>
          <h5 className="text-center">National level to complete:</h5>
          <div className="container">
            <div className="col-md-4 col-sm-12">
              <ReadOnlyDataRenderer label="Date report received at national level (DD/MM/YYYY):" name="national_receive_date" model={ model } type="date"/>
            </div>
            <div className="col-md-8 col-sm-12">
              <ReadOnlyDataRenderer label="Comments" multiLine={ true } name="comments" model={ model }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-3 col-md-offset-1">
              <button className="btn btn-sm btn-default" onClick={ (e) => { e.preventDefault(); goBack(e) } }>Close</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
