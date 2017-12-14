import React, { Component } from 'react'

import FormComponent from './FormComponent'

import Confirm from '../dialogs/Confirm'

import TextInput from '../inputs/TextInput'
import SingleMultipleInput from '../inputs/SingleMultipleInput'
import SelectInput from '../inputs/SelectInput'
import DatePickerInput from '../inputs/DatePickerInput'
import DateSelectInput from '../inputs/DateSelectInput'
import AEFIVaccinationTableComponent from '../components/AEFIVaccinationTableComponent'
import AEFIDilutentTableComponent from '../components/AEFIDilutentTableComponent'

import moment from 'moment'

import messages from '../utils/messages.json'

import { MAIN_PAGE, REPORT_TYPE_AEFI, AEFI_URL } from '../utils/Constants'

import { BOOLEAN_OPTIONS, BOOLEAN_UNKNOWN_OPTIONS, GENDER, AEFI_SEVERITY_REASON, DESIGNATION, AEFI_OUTCOME, AEFI_ADVERSE_EVENTS, AGE_ON_ONSET, PROVINCES } from '../utils/FieldOptions'
import { AEFI_MANDATORY_FIELS } from '../utils/FormFields'

import { connect } from 'react-redux'
import { saveDraft, uploadData, saveCompleted, removeDraft, validate, showPage, setNotification } from '../actions'

class AEFIReportingForm extends FormComponent {

  constructor(props) {
    super(props)

    var { model } = this.props
    if(model == null) {
      model = { rid : Date.now(), type : REPORT_TYPE_AEFI }
    }

    //model = {"rid":1511898412729,"type":"REPORT_TYPE_AEFI","patient_name":"JMM","patient_next_of_kin":"s","patient_surname":"s","patient_address":"s","gender":"Male","patient_telephone":"s","date_of_birth":"4-2-2016","age_at_onset":"s","reporter_name":"s","designation_id":"3","name_of_vaccination_center":"ss","aefi_list_of_vaccines":[{"vaccine_name":"ss","vaccination_date":"14-10-2017","dosage":"s","batch_number":"ss","expiry_date":"22-10-2017"}],"aefi_list_of_diluents":[{"diluent_name":"sss","diluent_date":"9-10-2017","batch_number":"ss","expiry_date":"15-10-2017"}],"adverse_events":"ae_seizures,ae-thrombocytopenia","aefi_date":"21-10-2017","notification_date":"21-10-2017","description_of_reaction":"ss","serious":"Yes","serious_yes":"Hospitalizaion/Prolonged","outcome":"Recovering","autopsy":"No","past_medical_history":"ss","district_receive_date":"1-10-2017","investigation_needed":"Yes","investigation_date":"13-10-2017","national_receive_date":"20-10-2017","comments":"sss"}

    this.saveAndSubmit = this.saveAndSubmit.bind(this)
    this.validateDateofBirth = this.validateDateofBirth.bind(this)
    this.validateAge = this.validateAge.bind(this)
    this.upload = this.upload.bind(this)

    this.state = { model , validate : null, confirmVisible : false, confirmCancel : false }
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

    const followUpInput = followUp == true? (
      <div className="container"><div className="col-md-6 col-sm-12">
        <TextInput label="Parent MCAZ Ref #" model={ model } name="parent_id"/>
      </div></div>
    ) : null

    return (
      <div className="aefi-form">
        { confirmVisible }
        { confirmCancel }
        <h3 className="text-center">Adverse Event After Immunization (AEFI) Reporting Form</h3>
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
              <DateSelectInput label="Date of Birth" required={ true } validate={ this.state.validate }  name="date_of_birth" model={ model } onChange={ (value) => this.validateDateofBirth(value) }/>
            </div>

          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="OR Age on onset" inline={ true } name="age_at_onset" model={ model } options={ AGE_ON_ONSET } onChange={ (value) => this.validateAge(value) }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Specify"  name="age_at_onset_specify"  type="number" model={ model } onChange={ (value) => this.validateAge(value) }/>
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
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <AEFIDilutentTableComponent name="aefi_list_of_diluents" model={ model } validate={ this.state.validate } label="Diluent   "/>
            </div>
          </div>
          <h5 className="text-center">Adverse events</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Adverse events" required={ true } multiple={ true } validate={ this.state.validate }  name="adverse_events" model={ model } options={ AEFI_ADVERSE_EVENTS }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="If other, specify"  name="adverse_events_specify" model={ model } showTime={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DatePickerInput label="Date and time AEFI started"  name="aefi_date" model={ model } showTime={ true } maxDate={ moment() } onChange={ (value) => this.setState(value) }/>
            </div>
            <div className="col-md-6 col-sm-6">
              <DatePickerInput label="Date patient notified event to health system" name="notification_date" model={ model } maxDate={ moment() } minDate={ this.state.model['aefi_date'] }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Describe AEFI" multiLine={ true } name="description_of_reaction" model={ model }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Treatment provided"  name="treatment_provided" model={ model } options={ BOOLEAN_OPTIONS } inline={ true }/>
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
              <SelectInput label="Outcome"  name="outcome" required={ true } validate={ this.state.validate } model={ model } options={ AEFI_OUTCOME }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <DatePickerInput label="If died, date of death" name="died_date" model={ model } maxDate={ moment() } />
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <SingleMultipleInput label="Autopsy done" name="autopsy" model={ model } options={ BOOLEAN_UNKNOWN_OPTIONS } inline={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="Past medical history (including history of similar reaction or other allergies), concomitant medication and other relevant information (e.g. other cases). Use additional sheet if needed :"
                multiLine={ true } name="past_medical_history" model={ model } />
            </div>
          </div>
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

  validateDateofBirth(value) {
    var { model } = this.state
    if(value != '' && value != '--') {
      model['age_at_onset'] = ""
      model['age_at_onset_specify'] = ""
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
          if((model[field.dependent] == field.value || (field.value == "" && model[name] == null)) && (model[field.name] == null || model[field.name] === "")) {
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
    const { model } = this.state
    if(connection.isConnected) {
      uploadData(model, AEFI_URL, token)
    } else {
      saveCompleted(data)
    }
    this.goBack()
  }
}

const mapStateToProps = state => {
  return {
    connection: state.appState.connection,
    model: state.appState.currentReport,
    followUp: state.appState.followUp,
    token: state.appState.token
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
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AEFIReportingForm)
