import React, { Component } from 'react'
import TextInput from '../inputs/TextInput'
import DateSelectInput from '../inputs/DateSelectInput'
import SingleMultipleInput from '../inputs/SingleMultipleInput'
import MedicationTableComponent from '../components/MedicationTableComponent'
import FileAttachmentComponent from '../components/FileAttachmentComponent'
import ConcomitantTableComponent from '../components/ConcomitantTableComponent'
import SelectInput from '../inputs/SelectInput'

import { MAIN_PAGE, REPORT_TYPE_ADR, ADR_URL } from '../utils/Constants'

import { SEVERITY_REASON, OUTCOME, DESIGNATION, ACTION_TAKEN, RELATEDNESS_TO_ADR} from '../utils/FieldOptions'

import { connect } from 'react-redux'
import { saveDraft, uploadData, saveCompleted, removeDraft, validate, showPage } from '../actions'

class ADRForm extends Component {

  constructor(props) {
    super(props)
    var { model } = this.props
    if(model == null) {
      model = {"rid":1510991587333,"type":"REPORT_TYPE_ADR","name_of_institution":"Nairobi Hosp","sadr_list_of_drugs":[{"brand_name":"dawa","dose_id":"3","drug_name":"c","dose":"1","route_id":"3","frequency_id":"2","start_date":[],"stop_date":[],"suspected_drug":""}],"user":{},"patient_name":"JM","date_of_birth":[],"gender":"Male","date_of_onset_of_reaction":[],"description_of_reaction":"ds","severity":"Yes","severity_reason":"Death","action_taken":"Drug withdrawn","outcome":"Recovered","":"Certain","designation_id":"1","reporter_name":"John","reporter_email":"john@h.com","date_of_end_of_reaction":[]}
    }
    this.state = { model : model, validate : null }
    this.saveAndContinue = this.saveAndContinue.bind(this)
    this.saveAndSubmit = this.saveAndSubmit.bind(this)
    this.cancel = this.cancel.bind(this)
    this.goBack = this.goBack.bind(this)

    this.mandatory = [
      { name : "patient_name", text : "Patient Initials", page : 1 },
      { name : "date_of_birth", text: "Date of bith", page : 1},
      { name : "gender", text : "Sex", page : 1 },
      { name : "date_of_onset_of_reaction", text : "Date of onset", page : 2 },
      { name : 'description_of_reaction', text : "Description of ADR", page : 2},
      { name : "severity", text : "Serious", page : 2 }, { name : "outcome", text : "Outcome", page : 3 },
      { name : "sadr_list_of_drugs", fields: [{ name : "brand_name", text : "Generic/Brand name" }, { name : "dose_id", text : "Dose" },
        { name : "frequency_id", text : "Frequency" }, { name : "start_date", text : "Start date" }]}, // , { name : "suspected_drug", text : "Tick suspected medicine" }
      { name : 'action_taken', text : "Action taken", page : 3 },
      { name : "reporter_name", text : "Forename & Surname", page : 4 },
      { name : "designation_id", text : "Designation", page : 4 }, { name : "reporter_email", text : "Email Address", page : 4 }]
  }
  render() {
    var { model } = this.state
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
              <TextInput label="Clinic/Hospital Name" model={ model } name="name_of_institution"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Clinic/Hospital Number" model={ model } name="institution_code"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Patient Initials" required={ true } validate={ this.state.validate } model={ model } name="patient_name"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="VCT/OI/TB Number" model={ model } name="ip_no"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DateSelectInput label="Date of Birth:" required={ true } validate={ this.state.validate } model={ model } name="date_of_birth"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Weight (Kg)" model={ model } name="weight"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Age group" model={ model } name="age_group"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Height (meters)" model={ model } name="height"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-md-offset-6 col-sm-12">
              <SingleMultipleInput label="Gender" name="gender" model={ model } required={ true } validate={ this.state.validate } inline={ true } options={["Male", "Female", "Unknown"]}/>
            </div>
          </div>
          <h5 className="text-center">Adverse Reaction</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DateSelectInput label="Date of onset" model={ model } validate={ this.state.validate } required={ true } name="date_of_onset_of_reaction"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <DateSelectInput label="Date of end of reaction (if it ended)" model={ model } name="date_of_end_of_reaction"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="Description of ADR" multiLine={ true } model={ model } name="description_of_reaction"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Serious" model={ model } name="severity" required={ true } validate={ this.state.validate } options={ ["Yes", "No"] }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SelectInput label="Reason for Seriousness" model={ model } name="severity_reason" required={ true } validate={ this.state.validate } options={ SEVERITY_REASON }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Relevant Medical History" multiLine={ true } model={ model } name="medical_history"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Relevant Past Drug Therapy" multiLine={ true } model={ model } name="past_drug_therapy"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="Laboratory tests results:" multiLine={ true } model={ model } name="lab_test_results"/>
            </div>
          </div>

          <div className="container">
            <MedicationTableComponent label="Current Medication (including OTC and herbals) "  validate={ this.state.validate } name="sadr_list_of_drugs" model={ model }/>
          </div>
          <ConcomitantTableComponent label="Concomitant (Other) drugs taken, including herbal medicines & Dates/period taken: " name="sadr_other_drugs" model={ model }/>
          <FileAttachmentComponent label="Do you have files that you would like to attach? click on the button to add them:" validate={ this.state.validate } name="files" model={ model }/>
          <div className="container">
            <div className="col-md-4 col-sm-12">
              <SelectInput label="Action taken:" model={ model } name="action_taken" required={ true } validate={ this.state.validate } options={ ACTION_TAKEN }/>
            </div>
            <div className="col-md-4 col-sm-12">
              <SelectInput label="Outcome of ADR:" model={ model } name="outcome" required={ true } validate={ this.state.validate } options={ OUTCOME }/>
            </div>
            <div className="col-md-4 col-sm-12">
              <SelectInput label="Relatedness of suspected medicine(s) to ADR:" model={ model } name="" options={ RELATEDNESS_TO_ADR }/>
            </div>
          </div>
          <h5 className="text-center">Reported By</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Forenames & Surname" required={ true }  model={ model } name="reporter_name" />
            </div>
            <div className="col-md-6 col-sm-12">
              <SelectInput label="Designation" model={ model } required={ true } name="designation_id" options={ DESIGNATION }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Email address" model={ model } required={ true }  name="reporter_email"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Phone number" model={ model } name="reporter_phone"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Name and address of institution" model={ model } name=""/>
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
    uploadData(model)
    var valid = true
    var names = ""
    var page = 0
    this.mandatory.forEach((field) => {
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

    if(!valid) {
      this.setState({ validate : true })
      return
    }

    if(connection.isConnected) {
      uploadData(model, ADR_URL)
    } else {
      //Alert.alert("Offline", "data has been saved to memory and will be uploaded when online.")
      saveCompleted(model)
    }
    this.goBack()
  }

  cancel(e) {
    e.preventDefault()
    const { showPage } = this.props
    showPage(MAIN_PAGE)
  }

  goBack() {
    const { showPage } = this.props
    showPage(MAIN_PAGE)
  }
}

const mapStateToProps = state => {
  return {
    connection: state.appState.connection,
    model: state.appState.currentReport
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveDraft: (data) => {
      dispatch(saveDraft(data))
    },
    uploadData: (data, url) => { // Upload the data.
      dispatch(uploadData(data, url))
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

export default connect(mapStateToProps, mapDispatchToProps)(ADRForm)
