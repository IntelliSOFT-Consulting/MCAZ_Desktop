import React, { Component } from 'react'
import TextInput from '../inputs/TextInput'
import SelectInput from '../inputs/SelectInput'
import SingleMultipleInput from '../inputs/SingleMultipleInput'
import DatePickerInput from '../inputs/DatePickerInput'
import DateSelectInput from '../inputs/DateSelectInput'
import SAEDrugsTableComponent from '../components/SAEDrugsTableComponent'
import ConcomitantTableComponent from '../components/ConcomitantTableComponent'
import FileAttachmentComponent from '../components/FileAttachmentComponent'

import { MAIN_PAGE, REPORT_TYPE_SAE } from '../utils/Constants'

import { DESIGNATION } from '../utils/FieldOptions'

import { connect } from 'react-redux'
import { saveDraft, uploadData, saveCompleted, removeDraft, validate, showPage } from '../actions'

class SAEForm extends Component {

  constructor(props) {
    super(props)

    var { model } = this.props
    if(model == null) {
      model = { rid : Date.now(), type : REPORT_TYPE_SAE }
    }

    this.saveAndContinue = this.saveAndContinue.bind(this)
    this.saveAndSubmit = this.saveAndSubmit.bind(this)
    this.cancel = this.cancel.bind(this)

    this.state = { model }
  }
  render() {
    const { model } = this.state
    return (
      <div className='sae-form'>
        <h3 className="text-center">
          <span className="text-center">
            <img src="assets/images/mcaz_3.png" className="logo"></img>
          </span><br/>SERIOUS ADVERSE EVENT REPORTING FORM</h3>
        <h5 className="text-center">Identities of Reporter, Patient and Institute will remain confidential</h5>

        <form className="form-horizontal">
          <h5 className="text-center">Patient Details</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="MRCZ Protocol #:" required={ true } name="mrcz_protocol_number" model={ model } validate={ this.state.validate }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Institution" required={ true } name="name_of_institution" model={ model } validate={ this.state.validate }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="MRCZ Protocol #" name="mcaz_protocol_number" model={ model } validate={ this.state.validate }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Principal Investigator" name="principal_investigator" model={ model } validate={ this.state.validate }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Phone:" required={ true } name="reporter_phone" model={ model }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Report prepared by" required={ true } name="reporter_name" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Email" name="reporter_email" model={ model }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SelectInput label="Designation in the study:" required={ true } name="designation_id" model={ model } options={ DESIGNATION }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Date Form completed" required={ true } name="" model={ model }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Study title" name="study_title" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Study sponsor" name="study_sponsor" model={ model }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DatePickerInput label="Date of Adverse Event:" name="date_of_adverse_event" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Participant ID:" name="participant_number" model={ model }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Hosp. Num.:" name="institution_code" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Type of Report:" name="report_type" inline={ true } model={ model } options={ [] } validate={ this.state.validate }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DatePickerInput label="Date of Site Awareness:" name="date_of_site_awareness" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <DateSelectInput label="Date of Birth:" name="date_of_birth" model={ model }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Gender" name="gender" model={ model } inline={ true } options={["Male", "Female", "Unknown"]} validate={ this.state.validate }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Study week:-" name="study_week" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Visit number:-" name="visit_number" model={ model }/>
            </div>
          </div>

          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="1. What type of adverse event is this?" name="adverse_event_type" model={ model } inline={ true } options={["AE", "SAE", "Death"]}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SelectInput label="2a. If SAE, is it:" name="sae_type" model={ model } options={[]}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="2b. Toxicity Grade:" name="toxicity_grade" model={ model } options={["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"]}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="3a. Any previous Adverse Event’s report on this participant?:" name="previous_events" model={ model } inline={ true } options={["Yes", "No"]}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="If yes, how many?" name="previous_events_number" model={ model } />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="3b. Total Number of SAEs to date for the whole study:" name="total_saes" model={ model }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput options={[""]} inline={ true } label="4. Location of the current Adverse Event:" required={ true } name="location_event" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SelectInput label="5. Research involves a:" required={ true } name="research_involves" model={ model } options={[]}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="6. Name of Drug, Device or Procedure:" required={ true } name="name_of_drug" model={ model } />
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="7. Is the drug/device investigational:" required={ true } name="drug_investigational" model={ model } options={["Yes", "No"]} inline={ true }/>
            </div>
          </div>
          <div className="container">
            <h5>8a. List all study / intervention drugs being taken at the time of onset of the SAE, or within 30 days prior to onset, and describe
their relationship to the SAE:</h5>
            <SAEDrugsTableComponent name="adr_list_of_drugs" model={ model }/>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="9. Was the patient taking any other drug at the time of onset of the AE?" required={ true } name="patient_other_drug" model={ model } options={["Yes", "No"]} inline={ true }/>
            </div>
          </div>
          <div className="container">
            <h5>10. If yes, then list all concomitant medication being taken at least one month before the onset of the SAE and describe the relationship to the SAE:</h5>
            <ConcomitantTableComponent name="adr_other_drugs" model={ model }/>
          </div>
          <div className="container">
            <h4>11. Has the Adverse Event been reported to:</h4>
            <div className="col-md-3 col-sm-12">
              <SingleMultipleInput label="MCAZ" options={["Yes", "No"]} required={ true } name="report_to_mcaz" model={ model } inline={ true }/>
              <DatePickerInput label="Date" required={ true } name="report_to_mcaz_date" model={ model }/>
            </div>
            <div className="col-md-3 col-sm-12">
              <SingleMultipleInput label="MCRZ" options={["Yes", "No"]} required={ true } name="report_to_mrcz" model={ model } inline={ true }/>
              <DatePickerInput label="Date" required={ true } name="report_to_mrcz_date" model={ model }/>
            </div>
            <div className="col-md-3 col-sm-12">
              <SingleMultipleInput label="Sponsor" options={["Yes", "No"]} required={ true } name="report_to_sponsor" model={ model } inline={ true }/>
              <DatePickerInput label="Date" required={ true } name="report_to_sponsor_date" model={ model }/>
            </div>
            <div className="col-md-3 col-sm-12">
              <SingleMultipleInput label="IRB" options={["Yes", "No"]} required={ true } name="report_to_irb" model={ model } inline={ true }/>
              <DatePickerInput label="Date" required={ true } name="report_to_irb_date" model={ model }/>
            </div>
          </div>
          <h5>12. Describe the SAE with diagnosis, immediate cause or precipitating events, symptoms, any investigations, management,
results and outcome (with dates where possible). Include relevant medical history. Additional narrative, photocopies of
results of abnormal investigations and a hospital discharge letter may be attached:</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Summary of relevant past medical history of participant" required={ true } name="medical_history" model={ model } multiLine={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="(a) Diagnosis :" required={ true } name="diagnosis" model={ model } multiLine={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="(b) Immediate Cause:" required={ true } name="immediate_cause" model={ model } multiLine={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="(c) Symptoms:" required={ true } name="symptoms" model={ model } multiLine={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="(d) Investigations-Laboratory and any other significant investigations conducted:" required={ true } name="investigations" model={ model } multiLine={ true }/>
            </div>
          </div>
          <div className="container">
            Labs
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="(e) Results:" required={ true } name="results" model={ model } multiLine={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="(f) Management (Include management of study treatment, continued, temporarily held, reduced dose, permanent discontinuation, off Product):" required={ true }
                name="management" model={ model } multiLine={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="(g) Outcome:" required={ true } name="outcome" model={ model } multiLine={ true }/>
            </div>
          </div>
          <h6>NB If the outcome is death, please complete &amp; attach the death form.</h6>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="D1. Was this Adverse Event originally addressed in the protocol and consent form?" name="d1_consent_form" model={ model } options={["Yes", "No", "Unknown"]} inline={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="D2. Was this Adverse Event originally addressed in Investigators Brochure?" required={ true } name="d2_brochure" model={ model } options={["Yes", "No", "Unknown"]} inline={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="D3. Are changes required to the protocol as a result of this SAE?" name="d3_changes_sae" model={ model } options={["Yes", "No", "Unknown"]} inline={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="D4. Are changes required to the consent form as a result of this SAE?" required={ true } name="d4_consent_sae" model={ model } options={["Yes", "No", "Unknown"]} inline={ true }/>
            </div>
          </div>
          <div className="container">
            <FileAttachmentComponent model={ model } name="attachment"/>
          </div>
          <h6>If changes are required, please attach a copy of the revised protocol/consent form with changes highlighted with a bright coloured highlighter.</h6>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="If changes are not required, please explain as to why changes to the protocol /consent form are not necessary based on the event."
                required={ true } name="changes_explain" model={ model } multiLine={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="From the data obtained or from currently available information, do you see any need to reassess the risks and benefits to the subjects in
this research." name="assess_risk" model={ model } options={["Yes", "No"]} inline={ true }/>
            </div>
          </div>
          <div className="container well">
            <div className="col-md-3 col-md-offset-1">
              <button className="btn btn-sm btn-primary" onClick={ this.saveAndContinue }>Save Changes</button>
            </div>
            <div className="col-md-3 col-md-offset-1">
              <button className="btn btn-sm btn-primary" onClick={ this.saveAndSubmit }>Save and submit</button>
            </div>
            <div className="col-md-3 col-md-offset-1">
              <button className="btn btn-sm btn-default" onClick={ this.cancel }>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  saveAndContinue(e) {
    e.preventDefault()
    const { saveDraft } = this.props
    const { model } = this.state
    saveDraft(model)
  }

  /**
    When saved, check connection status.
  */
  saveAndSubmit(e) {
    e.preventDefault()
    const { model } = this.state
    const { uploadData, saveCompleted, connection } = this.props
    var valid = false;
    if(!valid) {
      this.setState({ validate : true })
      return
    }

    if(connection.isConnected) {
      uploadData(model)
    } else {
      Alert.alert("Offline", "data has been saved to memory and will be uploaded when online.")
      saveCompleted(data)
    }
    this.goBack()
  }

  cancel(e) {
    e.preventDefault()
    const { showPage } = this.props
    showPage(MAIN_PAGE)
  }
}

const mapStateToProps = state => {
  return {
    connection: state.appState.connection,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveDraft: (data) => {
      dispatch(saveDraft(data))
    },
    uploadData: (data) => { // Upload the data.
      dispatch(uploadData(data))
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
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SAEForm)
