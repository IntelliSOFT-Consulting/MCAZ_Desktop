import React, { Component } from 'react'

import FormComponent from './FormComponent'

import Confirm from '../dialogs/Confirm'

import TextInput from '../inputs/TextInput'
import DateSelectInput from '../inputs/DateSelectInput'
import SingleMultipleInput from '../inputs/SingleMultipleInput'
import MedicationTableComponent from '../components/MedicationTableComponent'
import FileAttachmentComponent from '../components/FileAttachmentComponent'
import ConcomitantTableComponent from '../components/ConcomitantTableComponent'
import SelectInput from '../inputs/SelectInput'

import moment from 'moment'

import messages from '../utils/messages.json'

import { MAIN_PAGE, REPORT_TYPE_ADR, ADR_URL } from '../utils/Constants'

import { SEVERITY_REASON, OUTCOME, DESIGNATION, ACTION_TAKEN, RELATEDNESS_TO_ADR, AGE_GROUP } from '../utils/FieldOptions'

import { connect } from 'react-redux'
import { saveDraft, uploadData, saveCompleted, removeDraft, validate, showPage, setNotification } from '../actions'

class ADRForm extends FormComponent {

  constructor(props) {
    super(props)
    var { model } = this.props
    if(model == null) {
      model = {"rid":1510991587333,"type":"REPORT_TYPE_ADR"}
    }
    //model = {"rid":1510853208716,"type":"REPORT_TYPE_ADR","name_of_institution":"Nairobi Hosp","sadr_list_of_drugs":[{"brand_name":"dawa","dose_id":"7","route_id":"4","frequency_id":"4","drug_name":"wwqq","dose":"1","indication":"1","start_date":"1-10-2017","stop_date":"21-10-2017","suspected_drug":""}],"user":{},"patient_name":"xxsss","date_of_birth":"6-4-2015","weight":"34","height":"12","gender":"Male","date_of_onset_of_reaction":"8-2-2017","severity":"No","medical_history":"ss","lab_test_results":"ssds","action_taken":"Dose reduced","outcome":"Recovering","designation_id":"2","reporter_name":"John","reporter_email":"john@gmail.com","description_of_reaction":"hhhn"}
    this.state = { model : model, validate : null, confirmVisible : false, confirmCancel : false }

    this.saveAndSubmit = this.saveAndSubmit.bind(this)
    this.upload = this.upload.bind(this)
    this.setAgeGroup = this.setAgeGroup.bind(this)

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

    const followUpInput = followUp == true? (
      <div className="container"><div className="col-md-6 col-sm-12">
        <TextInput label="Parent MCAZ Ref #" model={ model } name="parent_id"/>
      </div></div>
    ) : null

    return (
      <div className='adr-form'>
        { confirmVisible }
        { confirmCancel }
        <h3 className="text-center">
          <span className="text-center">
            <img src="assets/images/mcaz_3.png" className="logo"></img>
          </span><br/>
          Adverse Drug Reaction (ADR) Report Form
        </h3>
        <h5 className="text-center">Identities of Reporter, Patient and Institute will remain confidential</h5>

        <form className="form-horizontal">
          { followUpInput }
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
              <DateSelectInput label="Date of Birth:" required={ true } validate={ this.state.validate } model={ model } name="date_of_birth" maxDate={ moment() } onChange={ this.setAgeGroup }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SelectInput label="Age group" model={ model } name="age_group" options={ AGE_GROUP } disabled={ "true" }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Weight (Kg)" model={ model } name="weight" type="number"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Height (centrimetres)" model={ model } name="height" type="number"/>
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
              <TextInput label="Relevant Medical History, including any allergies" multiLine={ true } model={ model } name="medical_history"/>
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
            <MedicationTableComponent label="Current Medication"  validate={ this.state.validate } name="sadr_list_of_drugs" model={ model }/>
          </div>

          <FileAttachmentComponent label="Do you have files that you would like to attach? click on the button to add them:" validate={ this.state.validate } name="attachments" model={ model }/>
          <div className="container">
            <div className="col-md-4 col-sm-12">
              <SelectInput label="Action taken:" model={ model } name="action_taken" required={ true } validate={ this.state.validate } options={ ACTION_TAKEN }/>
            </div>
            <div className="col-md-4 col-sm-12">
              <SelectInput label="Outcome of ADR:" model={ model } name="outcome" required={ true } validate={ this.state.validate } options={ OUTCOME }/>
            </div>
            <div className="col-md-4 col-sm-12">
              <SelectInput label="Relatedness of suspected medicine(s) to ADR:" model={ model } name="relatedness" options={ RELATEDNESS_TO_ADR }/>
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

  setAgeGroup(value) {
    const values = value.split("-")
    if(values[2] != "") {
      const time = moment().year(values[2]).month(values[1]).day(values[0])
      const now = moment()
      const age = now.diff(time, 'years', true);
      const months = now.diff(time, 'days', true);
      var age_group = ""
      if(months <= 28) {
        age_group = "neonate"
      } else if(age >= 50) {
        age_group = "elderly"
      } else if(age >= 19) {
        age_group = "adult"
      } else if(age >= 10) {
        age_group = "adolescent"
      } else {
        age_group = "child"
      }
      const { model } = this.state
      model['age_group'] = age_group
      this.setState({ model })
    }
  }

  /**
    When saved, check connection status.
  */
  saveAndSubmit(e) {
    e.preventDefault()
    const { model } = this.state
    const { uploadData, saveCompleted, connection, setNotification } = this.props

    var valid = true
    var names = ""
    var page = 0
    this.mandatory.forEach((field) => {
      if(field.fields) {
        const fields = field.fields
        const values = model[field.name]
        var arrayNames = []
        if(Array.isArray(values)) {
          var suspected_drug = 0
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
          if(suspected_drug == 0) {
            valid = false
          }
        } else {
          valid = false
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
      setNotification({ message : messages.validationErrors, level: "error", id: new Date().getTime() })
      return
    }

    this.setState({ confirmVisible : true })
  }

  upload() {
    const { uploadData, saveCompleted, connection } = this.props
    const { model } = this.state
    if(connection.isConnected) {
      uploadData(model, ADR_URL)
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
    followUp: state.appState.followUp
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
    setNotification: (notification) => {
      dispatch(setNotification(notification))
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ADRForm)

//<ConcomitantTableComponent label="Concomitant (Other) drugs taken, including herbal medicines &amp; Dates/period taken: " name="sadr_other_drugs" model={ model }/>
