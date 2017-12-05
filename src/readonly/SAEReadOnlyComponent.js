import React, { Component } from 'react'

import ReadOnlyDataRenderer from './ReadOnlyDataRenderer'

import SAEDrugsTableComponent from '../components/SAEDrugsTableComponent'
import SAEConcomitantTableComponent from '../components/SAEConcomitantTableComponent'
import FileAttachmentComponent from '../components/FileAttachmentComponent'
import SAELabTestsTableComponent from '../components/SAELabTestsTableComponent'

import AEFIVaccinationTableComponent from '../components/AEFIVaccinationTableComponent'

import { MAIN_PAGE, REPORT_TYPE_AEFI } from '../utils/Constants'

import { DESIGNATION, SAE_REPORT_TYPE, EVENT_TYPE, SAE_EVENT_TYPE, SAE_TOXICITY_GRADE, RESEARCH_INVOLVES, LOCATION_ADVERSE_EVENT } from '../utils/FieldOptions'

import { connect } from 'react-redux'
import { saveDraft, uploadData, saveCompleted, removeDraft, validate, showPage } from '../actions'

export default class SAEReadOnlyComponent extends Component {

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
              <ReadOnlyDataRenderer label="MRCZ Protocol #:" required={ true } name="mrcz_protocol_number" model={ model } validate={ this.state.validate } required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Institution" required={ true } name="name_of_institution" model={ model } validate={ this.state.validate } required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="MCAZ Protocol #" name="mcaz_protocol_number" model={ model } validate={ this.state.validate } required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Principal Investigator" name="principal_investigator" model={ model } validate={ this.state.validate } required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Phone:" required={ true } name="reporter_phone" model={ model } validate={ this.state.validate } required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Report prepared by" required={ true } name="reporter_name" model={ model } validate={ this.state.validate } required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Email" name="reporter_email" model={ model } validate={ this.state.validate } required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer type="option"  label="Designation in the study:" name="designation_id" model={ model } validate={ this.state.validate } required={ true } options={ DESIGNATION }/>
            </div>

          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Study title" name="study_title" model={ model } validate={ this.state.validate } required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Study sponsor" name="study_sponsor" model={ model } validate={ this.state.validate } required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer type="date"  label="Date of Adverse Event:" name="date_of_adverse_event" model={ model } validate={ this.state.validate } required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Participant ID:" name="participant_number" model={ model } validate={ this.state.validate } required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Hosp. Num.:" name="institution_code" model={ model } validate={ this.state.validate } required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer type="option" label="Type of Report:" name="report_type" inline={ true } model={ model } validate={ this.state.validate } required={ true } options={ SAE_REPORT_TYPE } validate={ this.state.validate } required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer type="date"  label="Date of Site Awareness:" name="date_of_site_awareness" model={ model } validate={ this.state.validate } required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer type="date" label="Date of Birth:" name="date_of_birth" model={ model } validate={ this.state.validate } required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer type="option" label="Gender" name="gender" model={ model } validate={ this.state.validate } required={ true } inline={ true } options={["Male", "Female", "Unknown"]} validate={ this.state.validate } required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Study week:-" name="study_week" model={ model } validate={ this.state.validate } required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Visit number:-" name="visit_number" model={ model } validate={ this.state.validate } required={ true }/>
            </div>
          </div>

          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer type="option" label="1. What type of adverse event is this?" name="adverse_event_type" model={ model } validate={ this.state.validate } required={ true } inline={ true } options={ EVENT_TYPE }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer type="option"  label="2a. If SAE, is it:" name="sae_type" model={ model } validate={ this.state.validate } required={ true } options={ SAE_EVENT_TYPE } dependent={ { name: "adverse_event_type", value: "SAE" } }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="If Other, specify" name="sae_description" model={ model } validate={ this.state.validate } required={ true } dependent={ { name: "sae_type", value: "Any other important medical event." } }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <ReadOnlyDataRenderer type="option" label="2b. Toxicity Grade:" name="toxicity_grade" model={ model } validate={ this.state.validate } required={ true } inline={ true } options={ SAE_TOXICITY_GRADE }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer type="option" label="3a. Any previous Adverse Event’s report on this participant?:" name="previous_events" model={ model } validate={ this.state.validate } required={ true } inline={ true } options={ BOOLEAN_OPTIONS }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="If yes, how many?" name="previous_events_number" model={ model } validate={ this.state.validate } required={ true } dependent={ { name: "previous_events", value: "Yes" } }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="3b. Total Number of SAEs to date for the whole study:" name="total_saes" model={ model } validate={ this.state.validate } required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer type="option"  options={ LOCATION_ADVERSE_EVENT } inline={ true } label="4. Location of the current Adverse Event:" required={ true } name="location_event" model={ model } validate={ this.state.validate } required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="If other, specify:" name="location_event_specify" model={ model } validate={ this.state.validate } required={ true } dependent={ { name: "location_event", value: "Other" } }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer type="option"  label="5. Research involves a:" required={ true } name="research_involves" model={ model } validate={ this.state.validate } required={ true } options={ RESEARCH_INVOLVES }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="If other, specify: " required={ true } name="research_involves_specify" model={ model } validate={ this.state.validate } required={ true } dependent={ { name: "research_involves", value: "Other" } }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="6. Name of Drug, Device or Procedure:" required={ true } name="name_of_drug" model={ model } validate={ this.state.validate } required={ true } />
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer type="option" label="7. Is the drug/device investigational:" required={ true } name="drug_investigational" model={ model } validate={ this.state.validate } required={ true } options={ BOOLEAN_OPTIONS } inline={ true }/>
            </div>
          </div>
          <div className="container">
            <SAEDrugsTableComponent name="adr_list_of_drugs" model={ model } validate={ this.state.validate } required={ true } label="8a. List all study / intervention drugs being taken at the time of onset of the SAE, or within 30 days prior to onset, and describe
their relationship to the SAE: " readonly={ true }/>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <ReadOnlyDataRenderer type="option" label="9. Was the patient taking any other drug at the time of onset of the AE?" required={ true } name="patient_other_drug" model={ model } validate={ this.state.validate } required={ true } options={ BOOLEAN_OPTIONS } inline={ true }/>
            </div>
          </div>
          <div className="container">
            <SAEConcomitantTableComponent name="adr_other_drugs" model={ model } validate={ this.state.validate } required={ true } label="10. If yes, then list all concomitant medication being taken at least one month before the onset of the SAE and describe the relationship to the SAE:  "
              dependent={ { name: "patient_other_drug", value: "Yes" } } readonly={ true }/>
          </div>
          <div className="container">
            <h4>11. Has the Adverse Event been reported to:</h4>
            <div className="col-md-3 col-sm-12">
              <ReadOnlyDataRenderer type="option" label="MCAZ" options={ BOOLEAN_OPTIONS } required={ true } name="report_to_mcaz" model={ model } validate={ this.state.validate } required={ true } inline={ true }/>
              <ReadOnlyDataRenderer type="date"  label="Date" required={ true } name="report_to_mcaz_date" model={ model } validate={ this.state.validate } required={ true } dependent={ { name: "report_to_mcaz", value: "Yes" } }/>
            </div>
            <div className="col-md-3 col-sm-12">
              <ReadOnlyDataRenderer type="option" label="MCRZ" options={ BOOLEAN_OPTIONS } required={ true } name="report_to_mrcz" model={ model } validate={ this.state.validate } required={ true } inline={ true }/>
              <ReadOnlyDataRenderer type="date"  label="Date" required={ true } name="report_to_mrcz_date" model={ model } validate={ this.state.validate } required={ true } dependent={ { name: "report_to_mrcz", value: "Yes" } }/>
            </div>
            <div className="col-md-3 col-sm-12">
              <ReadOnlyDataRenderer type="option" label="Sponsor" options={ BOOLEAN_OPTIONS } required={ true } name="report_to_sponsor" model={ model } validate={ this.state.validate } required={ true } inline={ true }/>
              <ReadOnlyDataRenderer type="date"  label="Date" required={ true } name="report_to_sponsor_date" model={ model } validate={ this.state.validate } required={ true } dependent={ { name: "report_to_sponsor", value: "Yes" } }/>
            </div>
            <div className="col-md-3 col-sm-12">
              <ReadOnlyDataRenderer type="option" label="IRB" options={ BOOLEAN_OPTIONS } required={ true } name="report_to_irb" model={ model } validate={ this.state.validate } required={ true } inline={ true }/>
              <ReadOnlyDataRenderer type="date"  label="Date" required={ true } name="report_to_irb_date" model={ model } validate={ this.state.validate } required={ true } dependent={ { name: "report_to_irb", value: "Yes" } }/>
            </div>
          </div>
          <div className="container">
          <h5>12. Describe the SAE with diagnosis, immediate cause or precipitating events, symptoms, any investigations, management,
            results and outcome (with dates where possible). Include relevant medical history. Additional narrative, photocopies of
            results of abnormal investigations and a hospital discharge letter may be attached:</h5>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <ReadOnlyDataRenderer label="Summary of relevant past medical history of participant" required={ true } name="medical_history" model={ model } validate={ this.state.validate } required={ true } multiLine={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="(a) Diagnosis :" required={ true } name="diagnosis" model={ model } validate={ this.state.validate } required={ true } multiLine={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="(b) Immediate Cause:" required={ true } name="immediate_cause" model={ model } validate={ this.state.validate } required={ true } multiLine={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="(c) Symptoms:" required={ true } name="symptoms" model={ model } validate={ this.state.validate } required={ true } multiLine={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="(d) Investigations-Laboratory and any other significant investigations conducted:" required={ true } name="investigations" model={ model } validate={ this.state.validate } required={ true } multiLine={ true }/>
            </div>
          </div>
          <div className="container">
            <SAELabTestsTableComponent model={ model } validate={ this.state.validate } required={ true } name="adr_lab_tests" label="Add Lab test: " readonly={ true }/>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="(e) Results:" required={ true } name="results" model={ model } validate={ this.state.validate } required={ true } multiLine={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="(f) Management (Include management of study treatment, continued, temporarily held, reduced dose, permanent discontinuation, off Product):" required={ true }
                name="management" model={ model } validate={ this.state.validate } required={ true } multiLine={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="(g) Outcome:" required={ true } name="outcome" model={ model } validate={ this.state.validate } required={ true } multiLine={ true }/>
            </div>
          </div>
          <div className="container">
            <h6>NB If the outcome is death, please complete &amp; attach the death form.</h6>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer type="option" label="D1. Was this Adverse Event originally addressed in the protocol and consent form?" name="d1_consent_form" model={ model } validate={ this.state.validate } required={ true } options={["Yes", "No", "Unknown"]} inline={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer type="option" label="D2. Was this Adverse Event originally addressed in Investigators Brochure?" required={ true } name="d2_brochure" model={ model } validate={ this.state.validate } required={ true } options={["Yes", "No", "Unknown"]} inline={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer type="option" label="D3. Are changes required to the protocol as a result of this SAE?" name="d3_changes_sae" model={ model } validate={ this.state.validate } required={ true } options={["Yes", "No", "Unknown"]} inline={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer type="option" label="D4. Are changes required to the consent form as a result of this SAE?" required={ true } name="d4_consent_sae" model={ model } validate={ this.state.validate } required={ true } options={["Yes", "No", "Unknown"]} inline={ true }/>
            </div>
          </div>
          <div className="container">
            <FileAttachmentComponent model={ model } validate={ this.state.validate } required={ true } name="attachments" label="Do you have files that you would like to attach? click on the button to add them:" readonly={ true }/>
          </div>
          <div className="container">
            <h6>If changes are required, please attach a copy of the revised protocol/consent form with changes highlighted with a bright coloured highlighter.</h6>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="If changes are not required, please explain as to why changes to the protocol /consent form are not necessary based on the event."
                required={ true } name="changes_explain" model={ model } validate={ this.state.validate } required={ true } multiLine={ true } dependent={ [{ name: "d3_changes_sae", value: "No" }, { name: "d4_consent_sae", value: "No" }] }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer type="option" label="From the data obtained or from currently available information, do you see any need to reassess the risks and benefits to the subjects in
this research." name="assess_risk" model={ model } validate={ this.state.validate } required={ true } options={ BOOLEAN_OPTIONS } inline={ true }/>
            </div>
          </div>
          <div className="container well">
            <div className="col-md-3 col-md-offset-1">
              <button className="btn btn-sm btn-default" onClick={ (e) => { e.preventDefault(); goBack(e) } }>Close</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
