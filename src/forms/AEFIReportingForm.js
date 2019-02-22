import React, { Component } from 'react'

import FormComponent from './FormComponent'

import Confirm from '../dialogs/Confirm'

import TextInput from '../inputs/TextInput'
import SingleMultipleInput from '../inputs/SingleMultipleInput'
import SelectInput from '../inputs/SelectInput'
import DatePickerInput from '../inputs/DatePickerInput'
import DateSelectInput from '../inputs/DateSelectInput'
import AgeAtOnSetInput from '../inputs/AgeAtOnSetInput'
import AEFIVaccinationTableComponent from '../components/AEFIVaccinationTableComponent'
import AEFIDilutentTableComponent from '../components/AEFIDilutentTableComponent'
import FileAttachmentComponent from '../components/FileAttachmentComponent'
import AEFIAdverseEventsInput from "../inputs/AEFIAdverseEventsInput"

import moment from 'moment'

import messages from '../utils/messages.json'

import { MAIN_PAGE, REPORT_TYPE_AEFI, AEFI_URL } from '../utils/Constants'

import { BOOLEAN_OPTIONS, BOOLEAN_UNKNOWN_OPTIONS, GENDER, AEFI_SEVERITY_REASON, SEIZURES, DESIGNATION, AEFI_OUTCOME, AEFI_ADVERSE_EVENTS, AGE_ON_ONSET, PROVINCES,
  SEVERE_LOCAL_REACTIONS } from '../utils/FieldOptions'
import { AEFI_MANDATORY_FIELS } from '../utils/FormFields'

import { connect } from 'react-redux'
import { saveDraft, uploadData, saveCompleted, removeDraft, validate, showPage, setNotification } from '../actions'

class AEFIReportingForm extends FormComponent {

  constructor(props) {
    super(props)

    var { model, settings, user } = this.props
    if(model == null) {
      model = { rid : Date.now(), type : REPORT_TYPE_AEFI, data_source: "desktop", device_type : settings.device_type, reporter_email: user.email, reporter_name: user.name }
    }

    this.saveAndSubmit = this.saveAndSubmit.bind(this)
    this.validateDateofBirth = this.validateDateofBirth.bind(this)
    this.validateAge = this.validateAge.bind(this)
    this.upload = this.upload.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
    this.deleteConfirmed = this.deleteConfirmed.bind(this)
    this.updateAnswer = this.updateAnswer.bind(this);
    this.state = { model , validate : null, confirmVisible : false, confirmCancel : false }
  }

  closeModal() {
    this.setState({ confirmVisible : false, confirmCancel : false })
  }

  updateAnswer(model) {
    this.setState({ model })
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
      <div>

      <div className="container"><div className="col-md-6 col-sm-12">
        <TextInput label="Parent MCAZ Ref #" model={ model } name="parent_id"/>
      </div></div></div>
    ) : null

    return (
      <div className="aefi-form form">
        { confirmVisible }
        { confirmCancel }
        { confirmDelete }
        <h3 className="text-center">
          <span className="text-center">
            <img src="assets/images/mcaz_3.png" className="logo"></img>
          </span><br/>
          Adverse Event After Immunization (AEFI) Reporting Form
        </h3>

        <h5 className="text-center">Identities of Reporter, Patient and Institute will remain confidential</h5>

        <form className="form-horizontal">

          { followUpInput }
          <hr/>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Patient first name" required={ true } validate={ this.state.validate } name="patient_name" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Surname"  required={ true } name="patient_surname" model={ model }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Patient Next of Kin"  name="patient_next_of_kin" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Patient's physical address" required={ true } validate={ this.state.validate } name="patient_address" model={ model }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Patient Telephone" name="patient_telephone" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Gender" name="gender" model={ model } required={ true } options={ GENDER } inline={ true } validate={ this.state.validate }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DatePickerInput label="Date of Birth" required={ true } validate={ this.state.validate }  name="date_of_birth" model={ model } onChange={ (value) => this.validateDateofBirth(value) } maxDate={ moment() }/>
            </div>

          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <AgeAtOnSetInput label="OR Age at onset" inline={ true } name="age_at_onset" model={ model } options={ AGE_ON_ONSET } onChange={ (value) => this.validateAge(value) }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Reporter's name" required={ true } validate={ this.state.validate }  name="reporter_name" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SelectInput label="Designation" name="designation_id" model={ model } options={ DESIGNATION }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Department" name="reporter_department" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Address" name="reporter_address" model={ model }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="District" name="reporter_district" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SelectInput label="Province" name="province_id" model={ model } options={ PROVINCES }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Reporter Telephone" name="reporter_phone" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Reporter Email" name="reporter_email" model={ model }/>
            </div>
          </div>

          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Name of vaccination center" required={ true } validate={ this.state.validate } name="name_of_vaccination_center" model={ model }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <AEFIVaccinationTableComponent name="aefi_list_of_vaccines" model={ model } validate={ this.state.validate } label="Vaccine   "/>
            </div>
          </div>

          <h5 className="text-center">Adverse events</h5>
          <div className="container">
            <AEFIAdverseEventsInput label="Adverse events" model={ model } options={ AEFI_ADVERSE_EVENTS } name="adverse_events" />
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DatePickerInput label="Date and time AEFI started"  name="aefi_date" model={ model } showTime={ true } maxDate={ moment() } onChange={ (value) => this.setState(value) }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Was patient hospitalized?"  name="patient_hospitalization" model={ model } inline={ true } options={ BOOLEAN_OPTIONS }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-6">
              <DatePickerInput label="Date patient notified event to health system" name="notification_date" model={ model } maxDate={ moment() } minDate={ this.state.model['aefi_date'] }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Treatment provided"  name="treatment_provided" model={ model } options={ BOOLEAN_OPTIONS } inline={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="Describe AEFI" multiLine={ true } name="description_of_reaction" model={ model }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Serious" required={ true } validate={ this.state.validate } name="serious" model={ model } inline={ true } options={ BOOLEAN_OPTIONS }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SelectInput label="If yes"  name="serious_yes" model={ model } options={ AEFI_SEVERITY_REASON }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SelectInput label="Outcome"  name="outcome" required={ true } validate={ this.state.validate } model={ model } options={ AEFI_OUTCOME } onChange={this.updateAnswer}/>
            </div>

          </div>
          { model.outcome == 'Died' ? (
            <div className="container">
              <div className="col-md-6 col-sm-12">
                <DatePickerInput label="If died, date of death" name="died_date" model={ model } maxDate={ moment() } />
              </div>
              <div className="col-md-6 col-sm-12">
                <SingleMultipleInput label="Autopsy done" name="autopsy" model={ model } options={ BOOLEAN_UNKNOWN_OPTIONS } inline={ true }/>
              </div>
            </div>
          ) : null
          }
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="Past medical history (including history of similar reaction or other allergies), concomitant medication and other relevant information (e.g. other cases). Use additional sheet if needed :"
                multiLine={ true } name="past_medical_history" model={ model } />
            </div>
          </div>
          <FileAttachmentComponent label="Do you have files that you would like to attach? click on the button to add them" validate={ this.state.validate } name="attachments" model={ model }/>
          <h5 className="text-center">First decision making level to complete (District level):</h5>
          <div className="container">
            <div className="col-md-4 col-sm-12">
              <DatePickerInput label="Date report recieved at District level" name="district_receive_date" model={ model } maxDate={ moment() }/>
            </div>
            <div className="col-md-4 col-sm-12">
              <SingleMultipleInput label="Investigation needed?"  name="investigation_needed" model={ model } options={ BOOLEAN_OPTIONS } inline={ true }/>
            </div>
            <div className="col-md-4 col-sm-12">
              <DatePickerInput label="If yes, date investigation planned"  name="investigation_date" model={ model } minDate={ this.state.model['aefi_date'] }/>
            </div>
          </div>
          <h5 className="text-center">National level to complete:</h5>
          <div className="container">
            <div className="col-md-4 col-sm-12">
              <DatePickerInput label="Date report received at national level (DD/MM/YYYY):" name="national_receive_date" model={ model } maxDate={ moment() }/>
            </div>
            <div className="col-md-8 col-sm-12">
              <TextInput label="Comments" multiLine={ true } name="comments" model={ model }/>
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

  validateDateofBirth(value) {
    var { model } = this.state
    if(value != '' && value != '--') {
      model['age_at_onset_days'] = ""
      model['age_at_onset_months'] = ""
      model['age_at_onset_years'] = ""
      //model['age_at_onset_specify'] = ""
    }
    this.setState({ model })
  }

  validateAge(value) {
    var { model } = this.state
    if(value != '') {
      model['date_of_birth'] = ''
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
    var valid = true, names = "", page = 0;

    AEFI_MANDATORY_FIELS.forEach((field) => {
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
          if((model[field.dependent] == field.value || (field.value == "" && model[field.name] == null)) && (model[field.name] == null || model[field.name] === "")) {
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
      setNotification({ message : messages.validationErrors, level: "error", id: new Date().getTime() })
      return
    }
    this.setState({ confirmVisible : true })
  }

  upload() {
    const { uploadData, saveCompleted, connection, token } = this.props
    var { model } = this.state
    model.submitted = 2
    if(connection.isConnected) {
      uploadData(model, AEFI_URL, token)
    } else {
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

export default connect(mapStateToProps, mapDispatchToProps)(AEFIReportingForm)

/*
<div className="container">
  <div className="col-md-6 col-sm-12">
    <SingleMultipleInput label="Adverse events" required={ true } multiple={ true } validate={ this.state.validate }  name="adverse_events" model={ model } options={ AEFI_ADVERSE_EVENTS }/>
  </div>
  <div className="col-md-6 col-sm-12">
    <SingleMultipleInput label="Severe local reaction" required={ true } inline={ true } validate={ this.state.validate }  name="adverse_events" model={ model } options={ SEVERE_LOCAL_REACTIONS }/>
    <SingleMultipleInput label="Seizures" required={ true } validate={ this.state.validate } inline={ true } name="adverse_events" model={ model } options={ SEIZURES }/>
    <TextInput label="If other, specify"  name="adverse_events_specify" model={ model } showTime={ true }/>
  </div>
</div>
*/
