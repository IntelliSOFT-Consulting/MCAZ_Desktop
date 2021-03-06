import React, { Component } from 'react'

import FormComponent from './FormComponent'

import Confirm from '../dialogs/Confirm'

import TextInput from '../inputs/TextInput'
import SelectInput from '../inputs/SelectInput'
import SingleMultipleInput from '../inputs/SingleMultipleInput'
import DatePickerInput from '../inputs/DatePickerInput'
import SAEDrugsTableComponent from '../components/SAEDrugsTableComponent'
import SAEConcomitantTableComponent from '../components/SAEConcomitantTableComponent'
import FileAttachmentComponent from '../components/FileAttachmentComponent'
import SAELabTestsTableComponent from '../components/SAELabTestsTableComponent'
import CheckboxInput from '../inputs/CheckboxInput'

import moment from 'moment'

import messages from '../utils/messages.json'

import { MAIN_PAGE, REPORT_TYPE_SAE, SAE_URL } from '../utils/Constants'
import { SAE_MANDATORY_FIELS } from '../utils/FormFields'

import { DESIGNATION, SAE_REPORT_TYPE, EVENT_TYPE, SAE_EVENT_TYPE, SAE_TOXICITY_GRADE, RESEARCH_INVOLVES, LOCATION_ADVERSE_EVENT, BOOLEAN_OPTIONS, BOOLEAN_NA_OPTIONS, OUTCOME, GENDER } from '../utils/FieldOptions'

import { connect } from 'react-redux'
import { saveDraft, uploadData, saveCompleted, removeDraft, validate, showPage, setNotification } from '../actions'

class SAEForm extends FormComponent {

  constructor(props) {
    super(props)

    var { model, settings, user } = this.props
    if(model == null) {
      model = {
        rid : Date.now(),
        type : REPORT_TYPE_SAE,
        data_source: "desktop",
        device_type : settings.device_type,
        reporter_email: user.email,
        reporter_name: user.name,
        in_utero: "",
        adr_list_of_drugs: [],
        adr_other_drugs: []
      }
    }
    //model = {"rid":1511180361456,"type":"REPORT_TYPE_SAE","mrcz_protocol_number":"nn","mcaz_protocol_number":"sds","name_of_institution":"sdsd","reporter_phone":"09023","principal_investigator":"x","reporter_name":"s","designation_id":"1","study_title":"s","date_of_adverse_event":"4-10-2017","institution_code":"s","reporter_email":"s","study_sponsor":"d","participant_number":"d","report_type":"Initial","date_of_birth":"3-10-2017","gender":"Male","date_of_site_awareness":"3-10-2017","study_week":"1","adverse_event_type":"AE","visit_number":"2","toxicity_grade":"Grade 1","previous_events":"No","total_saes":"2","location_event":"Home","research_involves":"Drug","name_of_drug":"s","drug_investigational":"Yes","adr_list_of_drugs":[{"drug_name":"s","dosage":"s","dose_id":"4","route_id":"2","frequency_id":"3","start_date":"3-10-2017","taking_drug":"No","relationship_to_sae":"Definitely related"}],"adr_other_drugs":[],"report_to_mcaz":"No","report_to_mrcz":"No","report_to_sponsor":"No","report_to_irb":"No","medical_history":"s","diagnosis":"s","immediate_cause":"s","symptoms":"s","investigations":"s","results":"s","management":"s","outcome":"s","d1_consent_form":"Unknown","d3_changes_sae":"Unknown","d2_brochure":"Unknown","d4_consent_sae":"Unknown","changes_explain":"s","assess_risk":"No","patient_other_drug":"No","mraz_protocol_number":"Vbbb"}

    this.state = { model : model, validate : null, confirmVisible : false, confirmCancel : false }

    this.saveAndSubmit = this.saveAndSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.upload = this.upload.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
    this.deleteConfirmed = this.deleteConfirmed.bind(this)
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
      <div className='sae-form form'>
        { confirmVisible }
        { confirmCancel }
        { confirmDelete }
        <h3 className="text-center">
          <span className="text-center">
            <img src="assets/images/mcaz_3.png" className="logo"></img>
          </span><br/>SERIOUS ADVERSE EVENT REPORTING FORM</h3>
        <h5 className="text-center">Identities of Reporter, Patient and Institute will remain confidential</h5>
        <hr/>
        <form className="form-horizontal">
          { followUpInput }

          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="MRCZ Protocol #:" name="mrcz_protocol_number" model={ model } validate={ this.state.validate } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Institution" required={ true } name="name_of_institution" model={ model } validate={ this.state.validate } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="MCAZ Protocol #" name="mcaz_protocol_number" model={ model } validate={ this.state.validate } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Principal Investigator" name="principal_investigator" model={ model } validate={ this.state.validate } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Phone:" name="reporter_phone" model={ model } validate={ this.state.validate } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Reporter name" name="reporter_name" model={ model } validate={ this.state.validate } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Email" name="reporter_email" model={ model } validate={ this.state.validate } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SelectInput label="Designation in the study:" name="designation_id" model={ model } validate={ this.state.validate } options={ DESIGNATION } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Study title" name="study_title" model={ model } validate={ this.state.validate } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Study sponsor" name="study_sponsor" model={ model } validate={ this.state.validate } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DatePickerInput label="Date of Adverse Event:" name="date_of_adverse_event" model={ model } validate={ this.state.validate }  maxDate={ moment() } onChange={this.onChange} />
            </div>
            <div className="col-md-6 col-sm-12">
              <DatePickerInput label="Date of Site Awareness:" name="date_of_site_awareness" model={ model } validate={ this.state.validate } maxDate={ moment() } minDate={ this.state.model['date_of_adverse_event'] } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            {/*<div className="col-md-6 col-sm-12">
              <TextInput label="Hosp. Num.:" name="institution_code" model={ model } validate={ this.state.validate } required={ true } onChange={this.onChange}/>
            </div>*/}
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Type of Report:" name="report_type" inline={ true } model={ model } validate={ this.state.validate } options={ SAE_REPORT_TYPE } validate={ this.state.validate } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Participant ID:" name="participant_number" model={ model } validate={ this.state.validate } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <DatePickerInput label="Date of Birth:" name="date_of_birth" model={ model } validate={ this.state.validate } maxDate={ moment() } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Gender" name="gender" model={ model } validate={ this.state.validate } inline={ true } options={GENDER} validate={ this.state.validate } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Study week:-" name="study_week" model={ model } validate={ this.state.validate } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Visit number:-" name="visit_number" model={ model } validate={ this.state.validate } onChange={this.onChange}/>
            </div>
          </div>
          <hr/>
          <h4 className="text-center">Section B</h4>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="1. What type of adverse event is this?" name="adverse_event_type" model={ model } validate={ this.state.validate } required={ true } inline={ true } options={ EVENT_TYPE } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SelectInput label="2a. If SAE, is it:" name="sae_type" model={ model } validate={ this.state.validate } options={ SAE_EVENT_TYPE } dependent={ { name: "adverse_event_type", value: "SAE" } } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="If Other, specify" name="sae_description" model={ model } validate={ this.state.validate } dependent={ { name: "sae_type", value: "Any other important medical event." } } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <SingleMultipleInput label="2b. Toxicity Grade:" name="toxicity_grade" model={ model } validate={ this.state.validate } inline={ true } options={ SAE_TOXICITY_GRADE } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="3a. Any previous Adverse Event’s report on this participant?:" name="previous_events" model={ model } validate={ this.state.validate } inline={ true } options={ BOOLEAN_OPTIONS } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="If yes, how many?" name="previous_events_number" model={ model } validate={ this.state.validate } dependent={ { name: "previous_events", value: "Yes" } } type="number" onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="3b. Total Number of SAEs to date for the whole study:" name="total_saes" model={ model } validate={ this.state.validate } type="number" onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SelectInput options={ LOCATION_ADVERSE_EVENT } inline={ true } label="4. Location of the current Adverse Event:"  name="location_event" model={ model } validate={ this.state.validate } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="If other, specify:" name="location_event_specify" model={ model } validate={ this.state.validate } dependent={ { name: "location_event", value: "Other" } } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SelectInput label="5. Research involves a:" name="research_involves" model={ model } validate={ this.state.validate }  options={ RESEARCH_INVOLVES } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="If other, specify: " name="research_involves_specify" model={ model } validate={ this.state.validate } dependent={ { name: "research_involves", value: "Other" } } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="6. Name of Drug, Device or Procedure:" name="name_of_drug" model={ model } validate={ this.state.validate } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="7. Is the drug/device investigational:" name="drug_investigational" model={ model } validate={ this.state.validate } options={ BOOLEAN_OPTIONS } inline={ true } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
            <CheckboxInput label="Did reaction occur in utero?" name="in_utero" model={ model } options={ ['1'] } validate={ this.state.validate } onChange={this.onChange}/>
            </div>
          </div>
          <hr/>
          <h4 className="text-center">Section C</h4>
          <div className="container">
            <SAEDrugsTableComponent name="adr_list_of_drugs" model={ model } validate={ this.state.validate } label="8a. List all study / intervention drugs being taken at the time of onset of the SAE, or within 30 days prior to onset, and describe their relationship to the SAE: " onChange={this.onChange}/>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <SingleMultipleInput label="9. Was the patient taking any other drug at the time of onset of the AE?" name="patient_other_drug" model={ model } validate={ this.state.validate } options={ BOOLEAN_OPTIONS } inline={ true } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <SAEConcomitantTableComponent name="adr_other_drugs" model={ model } validate={ this.state.validate } label="10. If yes, then list all concomitant medication being taken at least one month before the onset of the SAE and describe the relationship to the SAE:  "
              dependent={ { name: "patient_other_drug", value: "Yes" } } onChange={this.onChange}/>
          </div>
          <div className="container">
            <h5>11. Has the Adverse Event been reported to:</h5>
            <div className="col-md-3 col-sm-12">
              <SingleMultipleInput label="MCAZ" options={ BOOLEAN_OPTIONS } name="report_to_mcaz" model={ model } validate={ this.state.validate } inline={ true } onChange={this.onChange}/>
              {model['report_to_mcaz'] === 'Yes' && (
                <DatePickerInput label="Date" name="report_to_mcaz_date" model={ model } validate={ this.state.validate } dependent={ { name: "report_to_mcaz", value: "Yes" } } maxDate={ moment() } onChange={this.onChange}/>
              )}
            </div>
            <div className="col-md-3 col-sm-12">
              <SingleMultipleInput label="MCRZ" options={ BOOLEAN_OPTIONS } name="report_to_mrcz" model={ model } validate={ this.state.validate } inline={ true } onChange={this.onChange}/>
              {model['report_to_mrcz'] === 'Yes' && (
                <DatePickerInput label="Date"  name="report_to_mrcz_date" model={ model } validate={ this.state.validate } dependent={ { name: "report_to_mrcz", value: "Yes" } } maxDate={ moment() } onChange={this.onChange}/>
              )}
            </div>
            <div className="col-md-3 col-sm-12">
              <SingleMultipleInput label="Sponsor" options={ BOOLEAN_OPTIONS } name="report_to_sponsor" model={ model } validate={ this.state.validate } inline={ true } onChange={this.onChange}/>
              {model['report_to_sponsor'] === 'Yes' && (
                <DatePickerInput label="Date"  name="report_to_sponsor_date" model={ model } validate={ this.state.validate } dependent={ { name: "report_to_sponsor", value: "Yes" } } maxDate={ moment() } onChange={this.onChange}/>
              )}
            </div>
            <div className="col-md-3 col-sm-12">
              <SingleMultipleInput label="IRB" options={ BOOLEAN_OPTIONS } name="report_to_irb" model={ model } validate={ this.state.validate } inline={ true } onChange={this.onChange}/>
              {model['report_to_irb'] === 'Yes' && (
                <DatePickerInput label="Date" name="report_to_irb_date" model={ model } validate={ this.state.validate } dependent={ { name: "report_to_irb", value: "Yes" } } maxDate={ moment() } onChange={this.onChange}/>
              )}
            </div>
          </div>
          <div className="container">
          <h5>12. Describe the SAE with diagnosis, immediate cause or precipitating events, symptoms, any investigations, management,
            results and outcome (with dates where possible). Include relevant medical history. Additional narrative, photocopies of
            results of abnormal investigations and a hospital discharge letter may be attached:</h5>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="Summary of relevant past medical history of participant" name="medical_history" model={ model } validate={ this.state.validate } multiLine={ true } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="(a) Diagnosis :" name="diagnosis" model={ model } validate={ this.state.validate }  multiLine={ true } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="(b) Immediate Cause:" name="immediate_cause" model={ model } validate={ this.state.validate } multiLine={ true } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="(c) Symptoms:" name="symptoms" model={ model } validate={ this.state.validate } multiLine={ true } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="(d) Investigations-Laboratory and any other significant investigations conducted:" name="investigations" model={ model } validate={ this.state.validate } multiLine={ true } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <SAELabTestsTableComponent model={ model } validate={ this.state.validate } name="adr_lab_tests" label="Add Lab test: " onChange={this.onChange}/>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="(e) Results:" name="results" model={ model } validate={ this.state.validate } multiLine={ true } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="(f) Management (Include management of study treatment, continued, temporarily held, reduced dose, permanent discontinuation, off Product):"
                name="management" model={ model } validate={ this.state.validate }  multiLine={ true } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SelectInput label="(g) Outcome:" name="outcome" model={ model } validate={ this.state.validate } multiLine={ true } options={ OUTCOME } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <h6>NB If the outcome is death, please complete &amp; attach the death form.</h6>
          </div>
          <hr/>
          <h4 className="text-center">Section D</h4>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="D1. Was this Adverse Event originally addressed in the protocol and consent form?" name="d1_consent_form" model={ model } validate={ this.state.validate } options={ BOOLEAN_NA_OPTIONS } inline={ true } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="D2. Was this Adverse Event originally addressed in Investigators Brochure?" name="d2_brochure" model={ model } validate={ this.state.validate } options={ BOOLEAN_NA_OPTIONS } inline={ true } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="D3. Are changes required to the protocol as a result of this SAE?" name="d3_changes_sae" model={ model } validate={ this.state.validate } options={ BOOLEAN_NA_OPTIONS } inline={ true } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="D4. Are changes required to the consent form as a result of this SAE?" name="d4_consent_sae" model={ model } validate={ this.state.validate }  options={ BOOLEAN_NA_OPTIONS } inline={ true } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <FileAttachmentComponent model={ model } validate={ this.state.validate } name="attachments" label="Do you have files that you would like to attach? click on the button to add them:" onChange={this.onChange}/>
          </div>
          <div className="container">
            <h6>If changes are <strong>required</strong>, please attach a copy of the revised protocol/consent form with changes highlighted with a bright coloured highlighter.</h6>

          </div>
          <div className="container">
            <p>If changes are <strong>not required</strong>, please explain as to why changes to the protocol /consent form are not necessary based on the event.</p>
            <div className="col-md-6 col-sm-12">
              <TextInput label="" hideLabel={ true } onChange={this.onChange}
                name="changes_explain" model={ model } validate={ this.state.validate } multiLine={ true } dependent={ [{ name: "d3_changes_sae", value: "No" }, { name: "d4_consent_sae", value: "No" }] }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="From the data obtained or from currently available information, do you see any need to reassess the risks and benefits to the subjects in this research." name="assess_risk" model={ model } validate={ this.state.validate } options={ BOOLEAN_OPTIONS } inline={ true } onChange={this.onChange}/>
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
    if (newValue['report_to_mcaz'] === 'No') {
      newValue[''] = '';
    }
    if (newValue['report_to_mcaz'] === 'No') {
      newValue['report_to_mcaz_date'] = '';
    } else if (newValue['report_to_mrcz'] == 'No') {
      newValue['report_to_mrcz_date'] = '';
    } else if (newValue['report_to_sponsor'] == 'No') {
      newValue['report_to_sponsor_date'] = '';
    } else if (newValue['report_to_irb'] === 'No') {
      newValue['report_to_irb_date'] = '';
    }
    const newModel = Object.assign({}, model, newValue);
    this.setState({ model: newModel });
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
    var page = 0
    SAE_MANDATORY_FIELS.forEach((field) => {
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
    })

    if(!valid) {
      this.setState({ validate : true })
      setNotification({ message :  `${messages.validationErrors}\r${names}`, level: "error", id: new Date().getTime() })
      return
    }

    this.setState({ confirmVisible : true })
  }

  upload() {
    const { uploadData, saveCompleted, connection, token } = this.props
    var { model } = this.state
    model.submitted = 2
    if(connection.isConnected) {
      uploadData(model, SAE_URL, token)
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
    token: state.appState.user.token,
    settings: state.appState.settings,
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

export default connect(mapStateToProps, mapDispatchToProps)(SAEForm)
