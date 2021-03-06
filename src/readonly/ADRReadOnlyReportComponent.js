import React, { Component } from 'react'
import TextInput from '../inputs/TextInput'
import ReadOnlyDataRenderer from './ReadOnlyDataRenderer'
import SingleMultipleInput from '../inputs/SingleMultipleInput'
import MedicationTableComponent from '../components/MedicationTableComponent'
import FileAttachmentComponent from '../components/FileAttachmentComponent'
import ConcomitantTableComponent from '../components/ConcomitantTableComponent'
import SelectInput from '../inputs/SelectInput'
import ReactionsComponent from '../components/ReactionsComponent'

import b64toBlob from 'b64-to-blob'

import { MAIN_PAGE, REPORT_TYPE_ADR, ADR_FOLLOW_UP_PAGE, REPORT_TYPE_ADR_FOLLOW_UP } from '../utils/Constants'

import { SEVERITY_REASON, OUTCOME, DESIGNATION, ACTION_TAKEN, RELATEDNESS_TO_ADR, BOOLEAN_OPTIONS } from '../utils/FieldOptions'

import { connect } from 'react-redux'
import { saveDraft, uploadData, saveCompleted, removeDraft, validate, showPage } from '../actions'

export default class ADRReadOnlyReportComponent extends Component {

  constructor(props) {
    super(props)
    var { model } = this.props
    if(model == null) {
      model = {}
    }
    this.state = { model : model, validate : null }
    this.print = this.print.bind(this)

    //this.saveAndContinue = this.saveAndContinue.bind(this)

  }

  print() {



  }

  render() {
    //var { model } = this.state
    const { goBack, model, showPage, printPDF } = this.props
    const newFollowUp = {...model, rid : Date.now(), "type": REPORT_TYPE_ADR_FOLLOW_UP, parent_reference : model.reference_number, report_type : "FollowUp" }
    const followUpBtn = model.reference_number != null? (<button className="btn btn-sm btn-success" onClick={ (e) => { e.preventDefault(); showPage(ADR_FOLLOW_UP_PAGE, newFollowUp) } }>Create follow-up report</button>) : null
    return (
      <div className='adr-form form'>
        <div id='form-read-only'>
          <h3 className="text-center">
            <span className="text-center">
              <img src="assets/images/mcaz_3.png" className="logo"></img>
            </span><br/>
            Adverse Drug Reaction (ADR) Report Form
          </h3>
          <h5 className="text-center">Identities of Reporter, Patient and Institute will remain confidential</h5>

          <form className="form-horizontal">
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="MCAZ Ref #" model={ model } name="reference_number"/>
              </div>
            </div>
            <hr/>
            <h4 className="text-center">Patient Details</h4>
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Clinic/Hospital Name" model={ model } name="name_of_institution"/>
              </div>
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Clinic/Hospital Number" model={ model } name="institution_code"/>
              </div>
            </div>
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Patient Initials" required={ true } validate={ this.state.validate } model={ model } name="patient_name"/>
              </div>
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="VCT/OI/TB Number" model={ model } name="ip_no"/>
              </div>
            </div>
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Date of Birth:" required={ true } type="date" model={ model } name="date_of_birth"/>
              </div>
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Weight (Kg)" model={ model } name="weight"/>
              </div>
            </div>
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="OR Age" model={ model } name="age" type="number" />
              </div>
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Height (meters)" model={ model } name="height"/>
              </div>
            </div>
            <div className="container">
              <div className="col-md-6 col-md-offset-6 ">
                <ReadOnlyDataRenderer label="Gender" name="gender" model={ model } required={ true } type="option" inline={ true } options={["Male", "Female", "Unknown"]}/>
              </div>
            </div>
            <hr/>
            <h4 className="text-center">Adverse Reaction</h4>
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Date of onset" model={ model } type="date"  required={ true } name="date_of_onset_of_reaction"/>
              </div>
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Date of end of reaction (if it ended)" type="date"  model={ model } name="date_of_end_of_reaction"/>
              </div>
            </div>
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Description of ADR" multiLine={ true } model={ model } name="description_of_reaction"/>
              </div>
              <div className="col-md-6 ">
                <ReactionsComponent label="Other reactions" multiLine={ true } model={ model } name="reactions" readonly={ true }/>
              </div>
            </div>
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Serious" model={ model } name="severity" required={ true } type="option" options={ BOOLEAN_OPTIONS }/>
              </div>
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Reason for Seriousness" model={ model } name="severity_reason" type="option" options={ SEVERITY_REASON }/>
              </div>
            </div>
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Relevant Medical History" multiLine={ true } model={ model } name="medical_history"/>
              </div>
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Relevant Past Drug Therapy" multiLine={ true } model={ model } name="past_drug_therapy"/>
              </div>
            </div>
            <div className="container">
              <div className="col-md-12 ">
                <ReadOnlyDataRenderer label="Laboratory tests results:" multiLine={ true } model={ model } name="lab_test_results"/>
              </div>
            </div>
            <hr/>
            <div className="container">
              <MedicationTableComponent label="Current Medication (including OTC and herbals) "  readonly={ true } name="sadr_list_of_drugs" model={ model }/>
            </div>

            <div className="container">
              <div className="col-md-4 ">
                <ReadOnlyDataRenderer label="Action taken:" model={ model } name="action_taken" type="option" validate={ this.state.validate } options={ ACTION_TAKEN }/>
              </div>
              <div className="col-md-4 ">
                <ReadOnlyDataRenderer label="Outcome of ADR:" model={ model } name="outcome" type="option" validate={ this.state.validate } options={ OUTCOME }/>
              </div>
              <div className="col-md-4 ">
                <ReadOnlyDataRenderer label="Relatedness of suspected medicine(s) to ADR:" model={ model } type="option" name="relatedness" options={ RELATEDNESS_TO_ADR }/>
              </div>
            </div>
            <hr/>
            <FileAttachmentComponent label="Do you have files that you would like to attach? click on the button to add them:" readonly={ true }  name="attachments" model={ model }/>
            <hr/>
            <h4 className="text-center">Reported By</h4>
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Reporter name" required={ true }  model={ model } name="reporter_name" />
              </div>
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Designation" model={ model } type="option" required={ true } name="designation_id" options={ DESIGNATION }/>
              </div>
            </div>
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Reporter email" model={ model } required={ true }  name="reporter_email"/>
              </div>
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Reporter phone" model={ model } name="reporter_phone"/>
              </div>
            </div>
            <div className="container">
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Institution Name" model={ model }  name="institution_name"/>
              </div>
              <div className="col-md-6 ">
                <ReadOnlyDataRenderer label="Institution Address" model={ model } name="institution_address"/>
              </div>
            </div>

          </form>
        </div>
        <div className="container well">
          <div className="col-md-6 col-md-offset-1 btn-toolbar">
            <button className="btn btn-sm btn-primary" onClick={ (e) => { e.preventDefault(); goBack(e) } }>Close</button>
            { followUpBtn }
            <button className="btn btn-sm btn-success" onClick={ (e) => { e.preventDefault(); printPDF() } }>Get PDF</button>
          </div>
        </div>
      </div>
    )
  }
}

/* <div className="col-md-6 ">
  <ReadOnlyDataRenderer label="Age group" model={ model } name="age_group"/>
</div>
*/
