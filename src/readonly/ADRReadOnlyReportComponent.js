import React, { Component } from 'react'
import TextInput from '../inputs/TextInput'
import ReadOnlyDataRenderer from './ReadOnlyDataRenderer'
import SingleMultipleInput from '../inputs/SingleMultipleInput'
import MedicationTableComponent from '../components/MedicationTableComponent'
import FileAttachmentComponent from '../components/FileAttachmentComponent'
import ConcomitantTableComponent from '../components/ConcomitantTableComponent'
import SelectInput from '../inputs/SelectInput'

import { MAIN_PAGE, REPORT_TYPE_ADR } from '../utils/Constants'

import { SEVERITY_REASON, OUTCOME, DESIGNATION, ACTION_TAKEN, RELATEDNESS_TO_ADR} from '../utils/FieldOptions'

import { connect } from 'react-redux'
import { saveDraft, uploadData, saveCompleted, removeDraft, validate, showPage } from '../actions'

export default class ADRReadOnlyReportComponent extends Component {

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
    //var { model } = this.state
    const { goBack, model } = this.props
    return (
      <div className='adr-form'>
        <h3 className="text-center">
          <span className="text-center">
            <img src="assets/images/mcaz_3.png" className="logo"></img>
          </span><br/>
          Adverse Drug Reaction (ADR) Report Form
        </h3>
        <h5 className="text-center">Identities of Reporter, Patient and Institute will remain confidential</h5>

        <form className="form-horizontal">
          <h5 className="text-center">Patient Details</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Clinic/Hospital Name" model={ model } name="name_of_institution"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Clinic/Hospital Number" model={ model } name="institution_code"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Patient Initials" required={ true } validate={ this.state.validate } model={ model } name="patient_name"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="VCT/OI/TB Number" model={ model } name="ip_no"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Date of Birth:" required={ true } type="date" model={ model } name="date_of_birth"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Weight (Kg)" model={ model } name="weight"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Age group" model={ model } name="age_group"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Height (meters)" model={ model } name="height"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-md-offset-6 col-sm-12">
              <ReadOnlyDataRenderer label="Gender" name="gender" model={ model } required={ true } type="option" inline={ true } options={["Male", "Female", "Unknown"]}/>
            </div>
          </div>
          <h5 className="text-center">Adverse Reaction</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Date of onset" model={ model } type="date"  required={ true } name="date_of_onset_of_reaction"/>
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
              <ReadOnlyDataRenderer label="Serious" model={ model } name="severity" required={ true } type="option" options={ ["Yes", "No"] }/>
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

          <div className="container">
            <MedicationTableComponent label="Current Medication (including OTC and herbals) "  readonly={ true } name="sadr_list_of_drugs" model={ model }/>
          </div>
          <ConcomitantTableComponent label="Concomitant (Other) drugs taken, including herbal medicines & Dates/period taken: " readonly={ true }  name="sadr_other_drugs" model={ model }/>
          <FileAttachmentComponent label="Do you have files that you would like to attach? click on the button to add them:" readonly={ true }  name="files" model={ model }/>
          <div className="container">
            <div className="col-md-4 col-sm-12">
              <ReadOnlyDataRenderer label="Action taken:" model={ model } name="action_taken" type="option" validate={ this.state.validate } options={ ACTION_TAKEN }/>
            </div>
            <div className="col-md-4 col-sm-12">
              <ReadOnlyDataRenderer label="Outcome of ADR:" model={ model } name="outcome" type="option" validate={ this.state.validate } options={ OUTCOME }/>
            </div>
            <div className="col-md-4 col-sm-12">
              <ReadOnlyDataRenderer label="Relatedness of suspected medicine(s) to ADR:" model={ model } type="option" name="" options={ RELATEDNESS_TO_ADR }/>
            </div>
          </div>
          <h5 className="text-center">Reported By</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Forenames & Surname" required={ true }  model={ model } name="reporter_name" />
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Designation" model={ model } type="option" required={ true } name="designation_id" options={ DESIGNATION }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Email address" model={ model } required={ true }  name="reporter_email"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Phone number" model={ model } name="reporter_phone"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Name and address of institution" model={ model } name=""/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-3 col-md-offset-1">
              <button className="btn btn-sm btn-primary" onClick={ (e) => { e.preventDefault(); goBack(e) } }>Close</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}