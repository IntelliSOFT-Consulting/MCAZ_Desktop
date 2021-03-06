import React, { Component } from 'react'

import FormComponent from './FormComponent'

import Confirm from '../dialogs/Confirm'

import TextInput from '../inputs/TextInput'
import SingleMultipleInput from "../inputs/SingleMultipleInput"
import DatePickerInput from "../inputs/DatePickerInput"
import SelectInput from "../inputs/SelectInput"
import FileAttachmentComponent from '../components/FileAttachmentComponent'
import AEFIInvVaccinationTableComponent from '../components/AEFIInvVaccinationTableComponent'
import FileInputComponent from '../inputs/FileInputComponent'
import DateSelectInput from "../inputs/DateSelectInput"
import AgeAtOnSetInput from '../inputs/AgeAtOnSetInput'
import CheckboxInput from '../inputs/CheckboxInput'
import AEFIVaccinationTableComponent from '../components/AEFIVaccinationTableComponent'

import moment from 'moment'

import messages from '../utils/messages.json'

import { MAIN_PAGE, REPORT_TYPE_AEFI_INV, SAEFI_URL } from '../utils/Constants'

import { BOOLEAN_OPTIONS, BOOLEAN_UNKNOWN_OPTIONS, GENDER, STATUS_ON_DATE, DESIGNATION, INFANT_BIRTH_OPTS, MULTI_VIALS, DELIVERY_OPTS, SOURCE_INFO,
  WHEN_VACCINATED, SYRINGES_USED, PLACE_VACCINATION, SITE_TYPE, VACCINATION_IN, BOOLEAN_UNABLE_OPTIONS, BOOLEAN_NA_OPTIONS, PROVINCES, AGE_GROUP_YEARS } from '../utils/FieldOptions'
import { getDateTimeFromString } from '../utils/utils'
import { connect } from 'react-redux'
import { saveDraft, uploadData, saveCompleted, removeDraft, validate, showPage, setNotification } from '../actions'

class AEFIInvForm extends FormComponent {

  constructor(props) {
    super(props)
    var { model, settings, user } = this.props
    if(model == null) {
      model = { rid : Date.now(), type : REPORT_TYPE_AEFI_INV, data_source: "desktop", device_type : settings.device_type, reporter_email: user.email, reporter_name: user.name }
    }

    if(model.reports == null) {
      model.reports = [{}]
    }
    this.validateDateofBirth = this.validateDateofBirth.bind(this)
    this.validateAge = this.validateAge.bind(this)
    this.validateAgeGroup = this.validateAgeGroup.bind(this)
    this.saveAndSubmit = this.saveAndSubmit.bind(this)
    this.upload = this.upload.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
    this.deleteConfirmed = this.deleteConfirmed.bind(this)
    this.onChange = this.onChange.bind(this)

    this.state = { model : model, validate : null, confirmVisible : false, confirmCancel : false }
    this.mandatory = [
      //{ name : "name_of_vaccination_site", text : "Name of vaccination site", page : 1 },
      //{ name : "designation_id", text: "Designation id", page : 1},
      //{ name : "gender", text : "Sex", page : 1 },
      //{ name : "patient_name", text : "Patient name", page : 1 },
      //{ name : 'signs_symptoms', text : "Signs and symptoms", page : 3},
      { name : "aefi_list_of_vaccines", fields: [
        //{ name : "vaccine_name", text : "Vaccine name" },
        //{ name : "vaccination_date", text : "Date of vaccination" },
        //{ name : "vaccination_time", text : "Time of vaccination" },
        //{ name : "dosage", text : "Dose (1st, 2nd...)" },
        //{ name : "batch_number", text : "Batch/Lot no" }
      ]},
    ];
  }

  closeModal() {
    this.setState({ confirmVisible : false, confirmCancel : false })
  }

  render() {
    const { model } = this.state
    const { followUp } = this.props

    var confirmVisible = null
    if(this.state.confirmVisible) {
      confirmVisible = (
        <Confirm
          visible={ this.state.confirmVisible }
          title="Confirm"
          cancel={ this.closeModal }
          body={ "Submit the data to MCAZ?" }
          confirmText={ "Upload" }
          confirmBSStyle={ "success" }
          onConfirm={ this.upload }
          cancelText={ "Cancel" }
          >
        </Confirm>
      )
    }

    var confirmCancel = null
    if(this.state.confirmCancel) {
      confirmCancel = (
        <Confirm
          visible={ this.state.confirmCancel }
          title="Confirm"
          cancel={ this.closeModal }
          body={ "Cancel filling form?" }
          confirmText={ "Yes" }
          confirmBSStyle={ "danger" }
          onConfirm={ this.cancelConfirmed }
          cancelText={ "No" }
          >
        </Confirm>
      )
    }

    var confirmDelete = null
    if(this.state.confirmDelete) {
      confirmDelete = (
        <Confirm
          visible={ this.state.confirmDelete }
          title="Confirm"
          cancel={ this.closeModal }
          body={ "Delete this report?" }
          confirmText={ "Yes" }
          confirmBSStyle={ "danger" }
          onConfirm={ this.deleteConfirmed }
          cancelText={ "No" }
          >
        </Confirm>
      )
    }

    const followUpInput = followUp == true? (
      <div className="container"><div className="col-md-6 col-sm-12">
        <TextInput label="Parent MCAZ Ref #" model={ model } name="parent_id"/>
      </div></div>
    ) : null

    return (
      <div className="saefi-form form">
        { confirmVisible }
        { confirmCancel }
        { confirmDelete }
        <h3 className="text-center">
          <span className="text-center">
            <img src="assets/images/mcaz_3.png" className="logo"></img>
          </span><br/>
        Adverse Event After Immunization (AEFI) Investigation Form
        </h3>
        <h5 className="text-center">(Only for Serious Adverse Events Following Immunization - Death / Disability / Hospitalization / Cluster)</h5>

        <form className="form-horizontal">
          { followUpInput }
          <hr/>
          <h5 className="text-center">Basic Details</h5>
          <div className="container">
            <div className="col-md-4 col-sm-12">
              <SelectInput label="Province" name="province_id" model={ model } options={ PROVINCES } onChange={this.onChange}/>
            </div>
            <div className="col-md-4 col-sm-12">
              <SelectInput label="District" name="district" model={ model } options={ PROVINCES } onChange={this.onChange}/>
            </div>
            <div className="col-md-4 col-sm-12">
              <TextInput label="AEFI Report ID" name="aefi_report_ref" model={ model } required={ true } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-offset-2 col-md-8 col-sm-12 top-margins">
              <TextInput label="Name of vaccination site" name="name_of_vaccination_site" model={ model }  validate={ this.state.validate} onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SelectInput label="Place of vaccination" name="place_vaccination" model={ model } options={ PLACE_VACCINATION } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="If other, specify:" name="place_vaccination_other" model={ model } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SelectInput label="Type of site" name="site_type" model={ model } options={ SITE_TYPE } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="If other, specify:"  name="site_type_other" model={ model } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SelectInput label="Vaccination in" name="vaccination_in" options={ VACCINATION_IN } model={ model } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Specify:" name="vaccination_in_other" model={ model } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Name of Investigating Health Worker:" name="reporter_name" model={ model } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SelectInput name="designation_id" label="Designation / Position:" model={ model } options={ DESIGNATION } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Telephone # landline (with code):" name="telephone" model={ model } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Mobile" name="mobile" model={ model } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Email"  name="reporter_email" model={ model } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DatePickerInput label="Date AEFI reported:" name="report_date" model={ model } maxDate={ moment() } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <DatePickerInput label="Date investigation started:" name="start_date" model={ model } maxDate={ moment() } minDate={ this.state.model['report_date'] } onChange={this.onChange} />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DatePickerInput label="Date investigation completed:" name="complete_date" model={ model } maxDate={ moment() } minDate={ this.state.model['start_date'] } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Patient Name" name="patient_name" model={ model } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput inline={ true } label="Gender" model={ model } name="gender" options={ GENDER } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-offset-2 col-md-8 col-sm-12 top-margins">
              <TextInput label="Patient's physical address" name="patient_address" model={ model } multiLine={ true } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DatePickerInput label="Date of Birth:" validate={ this.state.validate } model={ model } name="date_of_birth" maxDate={ moment() } onChange={ (value) => this.validateDateofBirth(value) }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <AgeAtOnSetInput label="OR Age at onset" inline={ true } name="age_at_onset" model={ model } onChange={ (value) => this.validateAge(value) }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="OR Age Group" name="age_group" model={ model } inline={ true } options={ AGE_GROUP_YEARS } onChange={ (value) => this.validateAgeGroup(value) }/>
            </div>
          </div>
          <div className="container">
            <p>*Complete below table if vaccination information missing on the AEFI reporting form</p>
            <div className="col-md-6 col-sm-12">
              <AEFIVaccinationTableComponent name="aefi_list_of_vaccines" model={ model } validate={ this.state.validate } label="Vaccine   " onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DatePickerInput label="Date of first/key symptom (DD/MM/YYYY)" name="symptom_date" model={ model } onChange={this.onChange} maxDate={ this.state.model['complete_date'] ?  getDateTimeFromString(this.state.model['complete_date']) : moment() } showTime={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DatePickerInput label="Date of hospitalization (DD/MM/YYYY):" name="hospitalization_date" model={ model } maxDate={ moment() } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <SingleMultipleInput inline={ true } label="Status on the date of investigation" name="status_on_date" model={ model }
                options={ STATUS_ON_DATE } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DatePickerInput label="If died, date and time of death (DD/MM/YYYY):" name="died_date" model={ model } showTime={ true } onChange={this.onChange} maxDate={ moment() }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput inline={ true } model={ model } label="Autopsy done?" options={ BOOLEAN_OPTIONS } name="autopsy_done" onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <DatePickerInput label="If yes, date " name="autopsy_done_date" model={ model } maxDate={ moment() } minDate={ this.state.model['died_date'] } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput inline={ true } model={ model } label="Autopsy planned?" options={ BOOLEAN_OPTIONS } name="autopsy_planned" onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <DatePickerInput label="If yes, date " name="autopsy_planned_date" model={ model } minDate={ this.state.model['died_date'] } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <FileInputComponent name="reports" label="Attach report (if available)" model={ model.reports[0] } onChange={this.onChange}/>
            </div>
          </div>
          <hr/>
          <div className="container">
            <h4>Section B: Relevant patient information prior to immunization</h4>
          </div>
          <div className="container">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Criteria</th>
                  <th>Findings</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="col-md-6"><label>Past history of similar event</label></td>
                  <td className="col-md-3"><SingleMultipleInput hideLabel={ true }  inline={ true } options={ BOOLEAN_UNKNOWN_OPTIONS } name="past_history" model={ model }/></td>
                  <td className="col-md-3"><TextInput multiLine={ true } hideLabel={ true }  name="past_history_remarks" model={ model }/></td>
                </tr>
                <tr>
                  <td><label>Adverse event after previous vaccination(s)</label></td>
                  <td><SingleMultipleInput hideLabel={ true } inline={ true } options={ BOOLEAN_UNKNOWN_OPTIONS } name="adverse_event" model={ model } onChange={this.onChange}/></td>
                  <td><TextInput hideLabel={ true } multiLine={ true } name="adverse_event_remarks" model={ model } onChange={this.onChange}/></td>
                </tr>
                <tr>
                  <td><label>History of allergy to vaccine, drug or food</label></td>
                  <td><SingleMultipleInput hideLabel={ true }  inline={ true } options={ BOOLEAN_UNKNOWN_OPTIONS } name="allergy_history" model={ model } onChange={this.onChange}/></td>
                  <td><TextInput hideLabel={ true } multiLine={ true } name="allergy_history_remarks" model={ model } onChange={this.onChange}/></td>
                </tr>
                <tr>
                  <td><label>Pre-existing illness (30 days) / congenital disorder</label></td>
                  <td><SingleMultipleInput hideLabel={ true }  inline={ true } options={ BOOLEAN_UNKNOWN_OPTIONS } name="existing_illness" model={ model } onChange={this.onChange}/></td>
                  <td><TextInput hideLabel={ true } multiLine={ true } name="existing_illness_remarks" model={ model } onChange={this.onChange}/></td>
                </tr>
                <tr>
                  <td><label>History of hospitalization in last 30 days, with cause</label></td>
                  <td><SingleMultipleInput hideLabel={ true }  inline={ true } options={ BOOLEAN_UNKNOWN_OPTIONS } name="hospitalization_history" model={ model } onChange={this.onChange}/></td>
                  <td><TextInput hideLabel={ true } multiLine={ true } name="hospitalization_history_remarks" model={ model } onChange={this.onChange}/></td>
                </tr>
                <tr>
                  <td><label>Was patient on medication at time of vaccination? (If yes, name the drug, indication, doses &amp; treatment dates)</label></td>
                  <td><SingleMultipleInput hideLabel={ true }  inline={ true } options={ BOOLEAN_UNKNOWN_OPTIONS } name="medication_vaccination" model={ model } onChange={this.onChange}/></td>
                  <td><TextInput hideLabel={ true }  multiLine={ true } name="medication_vaccination_remarks" model={ model } onChange={this.onChange}/></td>
                </tr>
                <tr>
                  <td><label>Did patient consult faith healers before/after vaccination? *specify</label></td>
                  <td><SingleMultipleInput hideLabel={ true }  inline={ true } options={ BOOLEAN_UNKNOWN_OPTIONS } name="faith_healers" model={ model } onChange={this.onChange}/></td>
                  <td><TextInput hideLabel={ true }  multiLine={ true } name="faith_healers_remarks" model={ model }/></td>
                </tr>
                <tr>
                  <td><label>Family history of any disease (relevant to AEFI) or allergy</label></td>
                  <td><SingleMultipleInput hideLabel={ true }  inline={ true } options={ BOOLEAN_UNKNOWN_OPTIONS } name="family_history" model={ model } onChange={this.onChange}/></td>
                  <td><TextInput hideLabel={ true }  multiLine={ true } name="family_history_remarks" model={ model } onChange={this.onChange}/></td>
                </tr>
              </tbody>
            </table>
          </div>


          <div className="container">
            <h5>For adult women</h5>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput inline={ true } label="Currently pregnant?" name="pregnant" model={ model } options={ BOOLEAN_UNKNOWN_OPTIONS } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Weeks" name="pregnant_weeks" type="number" model={ model } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput inline={ true } label="Currently breast feeding?" model={ model } name="breastfeeding" options={ BOOLEAN_UNKNOWN_OPTIONS } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <h5>For infants</h5>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="The birth was" inline={ true } name="infant" model={ model } options={ INFANT_BIRTH_OPTS } onChange={this.onChange} />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Birth weight:" name="birth_weight" type="number" model={ model } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Delivery procedure was" name="delivery_procedure" model={ model } options={ DELIVERY_OPTS } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="If with complications, specify:" name="delivery_procedure_specify" model={ model } onChange={this.onChange}/>
            </div>
          </div>
          <hr/>
          <div className="container">
            <h4>Section C : Details of first examination** of serious AEFI case</h4>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <SingleMultipleInput inline={ true } label="Source of information" name="source_examination" options={ SOURCE_INFO } model={ model } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="If from verbal autopsy, please mention source" name="verbal_source" model={ model } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="If other, specify" name="source_other_specify" model={ model } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Name of the person who first examined/treated the patient:" name="examiner_name" model={ model } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Other sources who provided information (specify):" model={ model } name="other_sources" onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput multiLine={ true } label="Signs and symptoms in chronological order from the time of vaccination:" model={ model } name="signs_symptoms" onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Name and contact information of person completing these clinical details:"
                multiLine={ true } name="person_details" model={ model } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Designation:" name="person_designation" model={ model } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DatePickerInput label="Date/time" model={ model } name="person_date" onChange={this.onChange}/>
            </div>
          </div>
          <div className="container"><h4>**Instructions – Attach copies of ALL available documents (including case sheet, discharge summary, case notes,
              laboratory reports and autopsy reports) and then complete additional information NOT AVAILABLE in existing
          documents, i.e.</h4></div>
          <div className="container">
            <h5>If patient has received medical care attach copies of all available documents (including case sheet, discharge
summary, laboratory reports and autopsy reports, if available) and write only the information that is not available in the
attached documents below</h5>
            <TextInput multiLine={ true } hideLabel={ true } name="medical_care" model={ model } onChange={this.onChange}/>
            <h5>If patient has not received medical care – obtain history, examine the patient and write down your findings below (add
additional sheets if necessary)</h5>
            <div className="col-md-12 col-sm-12">
              <TextInput multiLine={ true }  hideLabel={ true } label="" name="not_medical_care" model={ model } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <FileAttachmentComponent model={ model } name="attachments" label="Do you have files that you would like to attach? click on the button to add them:  " onChange={this.onChange}/>
          </div>
          <div className="container">
            <TextInput label="Provisional / Final diagnosis:" multiLine={ true } name="final_diagnosis" model={ model } onChange={this.onChange}/>
          </div>
          <hr/>
          <div className="container">
            <h4>Section D: Details of vaccines provided at the site linked to AEFI on the corresponding day</h4>
          </div>
          <div className="container">
            <AEFIInvVaccinationTableComponent model={ model } name="saefi_list_of_vaccines" label="Number vaccinated for each antigen at session site. Attach record if available.  " onChange={this.onChange}/>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="a. When was the patient vaccinated?" model={ model } name="when_vaccinated" options={ WHEN_VACCINATED } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="In case of multidose vials, was the vaccine given" model={ model } name="vaccine_given" options={ MULTI_VIALS } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput name="when_vaccinated_specify" model={ model } label="Specify" onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="col-md-6">Criteria</th>
                  <th className="col-md-3">Findings</th>
                  <th className="col-md-3">Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="col-md-6"><label>b. Was there an error in prescribing or non-adherence to recommendations for use of this vaccine?</label></td>
                  <td className="col-md-3"><SingleMultipleInput hideLabel={ true } inline={ true } options={ BOOLEAN_OPTIONS } name="prescribing_error" model={ model } onChange={this.onChange}/></td>
                  <td className="col-md-3"><TextInput multiLine={ true } hideLabel={ true } name="prescribing_error_specify" model={ model } onChange={this.onChange}/></td>
                </tr>
                <tr>
                  <td><label>c. Based on your investigation, do you feel that the vaccine (ingredients) administered could have
    been unsterile?</label></td>
                  <td><SingleMultipleInput inline={ true } hideLabel={ true } options={ BOOLEAN_UNABLE_OPTIONS } name="vaccine_unsterile" model={ model } onChange={this.onChange}/></td>
                  <td><TextInput multiLine={ true } hideLabel={ true } name="vaccine_unsterile_specify" model={ model } onChange={this.onChange}/></td>
                </tr>
                <tr>
                  <td><label>d. Based on your investigation, do you feel that the vaccine&#39;s physical condition (e.g. colour, turbidity,
    foreign substances etc.) was abnormal at the time of administration?</label></td>
                  <td><SingleMultipleInput inline={ true } hideLabel={ true } options={ BOOLEAN_UNABLE_OPTIONS } name="vaccine_condition" model={ model } onChange={this.onChange}/></td>
                  <td><TextInput multiLine={ true } hideLabel={ true } name="vaccine_condition_specify" model={ model } onChange={this.onChange}/></td>
                </tr>
                <tr>
                  <td><label>e. Based on your investigation, do you feel that there was an error in vaccine
    reconstitution/preparation by the vaccinator (e.g. wrong product, wrong diluent, improper mixing,
    improper syringe filling etc.)?</label></td>
                  <td><SingleMultipleInput inline={ true }hideLabel={ true }  options={ BOOLEAN_UNABLE_OPTIONS } name="vaccine_reconstitution" model={ model } onChange={this.onChange}/></td>
                  <td><TextInput multiLine={ true } hideLabel={ true } name="vaccine_reconstitution_specify" model={ model } onChange={this.onChange}/></td>
                </tr>
                <tr>
                  <td><label>f. Based on your investigation, do you feel that there was an error in vaccine handling (e.g. cold
    chain failure during transport, storage and/or immunization session etc.)?</label></td>
                  <td><SingleMultipleInput inline={ true } hideLabel={ true } options={ BOOLEAN_UNABLE_OPTIONS } name="vaccine_handling" model={ model } onChange={this.onChange}/></td>
                  <td><TextInput multiLine={ true } hideLabel={ true } name="vaccine_handling_specify" model={ model } onChange={this.onChange}/></td>
                </tr>
                <tr>
                  <td><label>g. Based on your investigation, do you feel that the vaccine was administered incorrectly (e.g. wrong
    dose, site or route of administration, wrong needle size, not following good injection practice etc.)?</label></td>
                  <td><SingleMultipleInput inline={ true } hideLabel={ true } options={ BOOLEAN_UNABLE_OPTIONS } name="vaccine_administered" model={ model } onChange={this.onChange}/></td>
                  <td><TextInput multiLine={ true } hideLabel={ true } name="vaccine_administered_specify" model={ model } onChange={this.onChange}/></td>
                </tr>
                <tr>
                  <td><label>h. Number vaccinated from the concerned vaccine vial/ampoule</label></td>
                  <td><TextInput inline={ true } hideLabel={ true } name="vaccinated_vial" model={ model } type="number" onChange={this.onChange}/></td>
                  <td></td>
                </tr>
                <tr>
                  <td><label>i. Number vaccinated with the concerned vaccine in the same session</label></td>
                  <td><TextInput inline={ true } hideLabel={ true } name="vaccinated_session" model={ model } type="number" onChange={this.onChange}/></td>
                  <td></td>
                </tr>
                <tr>
                  <td><label>j. Number vaccinated with the concerned vaccine having the same batch number in other locations.</label></td>
                  <td><TextInput inline={ true } hideLabel={ true } name="vaccinated_locations" model={ model } type="number" onChange={this.onChange}/></td>
                  <td><TextInput multiLine={ true } inline={ true } hideLabel={ true } name="vaccinated_locations_specify" model={ model } type="number" onChange={this.onChange}/></td>
                </tr>
                <tr>
                  <td><label>k. Is this case a part of a cluster?</label></td>
                  <td><SingleMultipleInput inline={ true } hideLabel={ true } name="vaccinated_cluster" model={ model } options={ BOOLEAN_UNKNOWN_OPTIONS } onChange={this.onChange}/></td>
                  <td></td>
                </tr>
                <tr>
                  <td><label>If yes, how many other cases have been detected in the cluster?</label></td>
                  <td><TextInput inline={ true } hideLabel={ true } name="vaccinated_cluster_number" model={ model } type="number" onChange={this.onChange}/></td>
                  <td></td>
                </tr>
                <tr>
                  <td><label>a. Did all the cases in the cluster receive vaccine from the same vial?</label></td>
                  <td><SingleMultipleInput inline={ true } hideLabel={ true } name="vaccinated_cluster_vial" model={ model } options={ BOOLEAN_UNKNOWN_OPTIONS } onChange={this.onChange}/></td>
                  <td></td>
                </tr>
                <tr>
                  <td><label>b. If no, number of vials used in the cluster (enter details separately)</label></td>
                  <td><TextInput inline={ true } hideLabel={ true } name="vaccinated_cluster_vial_number" model={ model } type="number" onChange={this.onChange}/></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr/>

          <div className="container">
            <h4>SECTION E: Immunization practices at the place(s) where concerned vaccine was used</h4>
            <h6>(Complete this section by asking and/or observing practice)</h6>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput inline={ true } name="syringes_used" label="Are AD syringes used for immunization?" options={ BOOLEAN_UNKNOWN_OPTIONS } model={ model } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput model={ model } name="syringes_used_specify" label="If no, specify the type of syringes used:" options={ SYRINGES_USED } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-md-offset-6 col-sm-12">
              <TextInput label="If other, specify" name="syringes_used_other" model={ model } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput name="syringes_used_findings" label="Specific key findings/additional observations and comments:" model={ model } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <h5>Reconstitution: (complete only if applicable,  NA if not applicable)</h5>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Same reconstitution syringe used for multiple vials of same vaccine?" options={ BOOLEAN_NA_OPTIONS } name="reconstitution_multiple" model={ model } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Same reconstitution syringe used for reconstituting different vaccines?" model={ model } name="reconstitution_different" options={ BOOLEAN_NA_OPTIONS } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Separate reconstitution syringe for each vaccine vial?" name="reconstitution_vial" model={ model } options={ BOOLEAN_NA_OPTIONS } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Separate reconstitution syringe for each vaccination?" name="reconstitution_syringe" model={ model } options={ BOOLEAN_NA_OPTIONS } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Are the vaccines and diluents used the same as those recommended by the manufacturer?" name="reconstitution_vaccines" model={ model } options={ BOOLEAN_NA_OPTIONS } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput multiLine={ true } label="Specific key findings/additional observations and comments:" name="reconstitution_observations" model={ model } onChange={this.onChange}/>
            </div>
          </div>
          <hr />
          <div className="container">
            <h4>SECTION F : Cold chain and transport</h4>
            <h6>(Complete this section by asking and/or observing practice)</h6>
          </div>
          <div className="container">
            <h5>Last vaccine storage point:</h5>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput inline={ true } label="Is the temperature of the vaccine storage refrigerator monitored?" name="cold_temperature" model={ model } options={ BOOLEAN_OPTIONS } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput inline={ true } label="If “yes”, was there any deviation outside of 2-8 ° C after the vaccine was placed inside?" name="cold_temperature_deviation" model={ model } options={ BOOLEAN_OPTIONS } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput name="cold_temperature_specify" multiLine={ true } model={ model } label="If “yes”, provide details of monitoring separately." onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput name="procedure_followed" options={ BOOLEAN_UNKNOWN_OPTIONS } model={ model } label="Was the correct procedure for storing vaccines, diluents and syringes followed?" onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput name="other_items" options={ BOOLEAN_UNKNOWN_OPTIONS } model={ model } label="Was any other item (other than EPI vaccines and diluents) in the refrigerator or freezer?" onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput name="partial_vaccines" options={ BOOLEAN_UNKNOWN_OPTIONS } model={ model } label="Were any partially used reconstituted vaccines in the refrigerator?" onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput name="unusable_vaccines" options={ BOOLEAN_UNKNOWN_OPTIONS } model={ model } label="Were any unusable vaccines (expired, no label, VVM at stages 3 or 4, frozen) in the refrigerator?" onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput name="unusable_diluents" model={ model } options={ BOOLEAN_UNKNOWN_OPTIONS } label="Were any unusable diluents (expired, manufacturer not matched, cracked, dirty ampoule) in the store?" onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Specific key findings/additional observations and comments:" name="additional_observations" model={ model } multiLine={ true } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <h5>Vaccine transportation from the refrigerator to the vaccination centre:</h5>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput name="cold_transportation" model={ model } options={ BOOLEAN_UNKNOWN_OPTIONS } label="Was cold chain properly maintained during transportation?" onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput name="vaccine_carrier" model={ model } options={ BOOLEAN_UNKNOWN_OPTIONS } label="Was the vaccine carrier sent to the site on the same day as vaccination?" onChange={this.onChange} />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput name="coolant_packs" model={ model} options={ BOOLEAN_UNKNOWN_OPTIONS } label="Were conditioned coolant-packs used?" onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput name="transport_findings" multiLine={ true } model={ model } label="Specific key findings/additional observations and comments:" onChange={this.onChange}/>
            </div>
          </div>
          <hr/>
          <div className="container">
            <h4>SECTION G: Community investigation (Please visit locality and interview parents/others)</h4>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput model={ model } name="similar_events" options={ BOOLEAN_UNKNOWN_OPTIONS } label="Were any similar events reported within a time period similar to when the adverse event occurred and in the same locality?" onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="If yes, describe:" name="similar_events_describe" model={ model } multiLine={ true } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="If yes, how many events/episodes?" name="similar_events_episodes" model={ model } type="number" onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <h5>Of those affected, how many are</h5>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Vaccinated:" name='affected_vaccinated' model={ model } type="number" onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Not vaccinated::" name="affected_not_vaccinated" model={ model } type="number" onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Unknown:" name="affected_unknown" model={ model } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput multiLine={ true } label="Other comments:" name="community_comments" model={ model } onChange={this.onChange}/>
            </div>
          </div>
          <hr/>
          <div className="container">
            <div className="form-group">
              <h4>Section H : Other relevant findings/observations/comments</h4>
              <div className="col-md-12 col-sm-12">
                <TextInput label="" hideLabel={ true } multiLine={ true } name="relevant_findings" model={ model } onChange={this.onChange}/>
              </div>
            </div>
          </div>

          <div className="container well">
            <div className="col-md-2 col-md-offset-1">
              <button className="btn btn-sm btn-primary" onClick={ this.saveAndContinue }>Save Changes</button>
            </div>
            <div className="col-md-2 col-md-offset-1">
              <button className="btn btn-sm btn-primary" onClick={ this.saveAndSubmit }>Save and submit</button>
            </div>
            <div className="col-md-2 col-md-offset-1">
              <button className="btn btn-sm btn-default" onClick={ this.cancel }>Cancel</button>
            </div>
            <div className="col-md-2 col-md-offset-1">
              <button className="btn btn-sm btn-danger" onClick={ this.confirmDelete }>Delete</button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  onChange(newValue) {
    const { model } = this.state;
    const newModel = Object.assign({}, model, newValue);
    this.setState({ model: newModel });
  }

  validateDateofBirth(value) {
    const model = Object.assign({}, this.state.model, value)
    if(value != '') {
      model['age_at_onset_days'] = ""
      model['age_at_onset_months'] = ""
      model['age_at_onset_years'] = ""
      model['age_group'] = ""
    }
    this.setState({ model })
  }

  validateAge(value) {
    const model = Object.assign({}, this.state.model, value)
    if(value != '') {
      model['date_of_birth'] = ''
      model['age_group'] = ""
    }
    this.setState({ model : model })
  }

  validateAgeGroup(value) {
    const model = Object.assign({}, this.state.model, value)
    if(value != '') {
      model['date_of_birth'] = ''
      model['age_at_onset_days'] = ""
      model['age_at_onset_months'] = ""
      model['age_at_onset_years'] = ""
    }
    this.setState({ model : model })
  }

  confirmDelete(e) {
    e.preventDefault()
    this.setState({ confirmDelete : true })
  }

  deleteConfirmed() {
    const { removeDraft } = this.props
    removeDraft(this.state.model)
    this.goBack()
  }

  /**
    When saved, check connection status.
  */
  saveAndSubmit(e) {
    e.preventDefault()
    const { model } = this.state
    const { uploadData, saveCompleted, connection, setNotification } = this.props
    var valid = true;
    var names = "";
    var page = 0;
    this.mandatory.forEach((field) => {
      if(field.fields) {
        const fields = field.fields
        const values = model[field.name]
        var arrayNames = []
        if(Array.isArray(values)) {
          var suspected_drug = -1;
          if (field.name === 'aefi_list_of_vaccines') {
            suspected_drug = 0;
          }
          for(let i = 0; i < values.length; i++) {
            const val = values[i]
            fields.forEach((f) => {
              if(val[f.name] == null || val[f.name] === "") {
                valid = false
                if(page == 0) {
                  page = field.page
                }
                if(arrayNames.indexOf(f.text) == -1) {
                  arrayNames.push(f.text)
                }
              }
            })
            if(val['suspected_drug'] == '1') {
              suspected_drug++
            }
          }
          /*if(suspected_drug == 0) {
            valid = false
            arrayNames.push("Select at least one suspected drug");
          }*/
        }
        if(names != "") {
          names += ",\n"
        }
        names += arrayNames.join(',\n')
      } else {
        if(model[field.name] == null || model[field.name] === "") {
          valid = false
          if(names != "") {
            names += ",\n "
          } else {
            page = field.page
          }
          names += field.text
        }
      }
    })
    /*SAE_MANDATORY_FIELS.forEach((field) => {
      if(field.fields) {
        const fields = field.fields
        const values = model[field.name]
        var arrayNames = []
        if(Array.isArray(values)) {
          for(let i = 0; i < values.length; i++) {
            const val = values[i]
            fields.forEach((f) => {
              if(val[f.name] == null || val[f.name] === "") {
                valid = false
                if(page == 0) {
                  page = field.page
                }
                if(arrayNames.indexOf(f.text) == -1) {
                  arrayNames.push(f.text)
                }
              }
            })
          }
        }
        if(names != "") {
          names += ",\n"
        }
        names += arrayNames.join(',\n')
      } else {
        if(field.dependent) {
          if(model[field.dependent] == field.value && (model[field.name] == null || model[field.name] === "")) {
            valid = false
            if(names != "") {
              names += ",\n "
            } else {
              page = field.page
            }
            names += field.text
          }
        } else if(model[field.name] == null || model[field.name] === "") {
          valid = false
          if(names != "") {
            names += ",\n "
          } else {
            page = field.page
          }
          names += field.text
        }
      }
    })*/

    if(!valid) {
      this.setState({ validate : true })
      setNotification({ message : `${messages.validationErrors}\r${names}`, level: "error", id: new Date().getTime() })
      return
    }
    this.setState({ confirmVisible : true })
  }

  upload() {
    const { uploadData, saveCompleted, connection, token } = this.props
    var { model } = this.state
    model.submitted = 2
    if(connection.isConnected) {
      uploadData(model, SAEFI_URL, token)
    } else {
      //Alert.alert("Offline", "data has been saved to memory and will be uploaded when online.")
      saveCompleted(model)
    }
    this.goBack()
  }
}

const mapStateToProps = state => {
  return {
    connection: state.appState.connection,
    model: state.appState.currentReport,
    followUp: state.appState.followUp,
    token : state.appState.user.token,
    settings : state.appState.settings,
    user: state.appState.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveDraft: (data) => {
      dispatch(saveDraft(data))
    },
    uploadData: (data, url, token) => { // Upload the data.
      dispatch(uploadData(data, url, token))
    },
    validate: (valid) => { // Validate the form
      dispatch(validate(valid))
    },
    saveCompleted: (data) => { // save the completed data and remove any draft.
      dispatch(saveCompleted(data))
      dispatch(removeDraft(data))
    },
    showPage: (page) => {
      dispatch(showPage(page))
    },
    setNotification: (notification) => {
      dispatch(setNotification(notification))
    },
    removeDraft: (report) => {
      dispatch(removeDraft(report))
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AEFIInvForm)
