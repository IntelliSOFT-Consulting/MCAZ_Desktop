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
import ReadOnlyDataRenderer from '../readonly/ReadOnlyDataRenderer'

import moment from 'moment'

import messages from '../utils/messages.json'

import { MAIN_PAGE, REPORT_TYPE_AEFI, AEFI_URL } from '../utils/Constants'

import { BOOLEAN_OPTIONS, BOOLEAN_UNKNOWN_OPTIONS, GENDER, AEFI_SEVERITY_REASON, DESIGNATION, AEFI_OUTCOME, AEFI_ADVERSE_EVENTS, AGE_ON_ONSET, PROVINCES } from '../utils/FieldOptions'
import { AEFI_FOLLOW_UP_MANDATORY_FIELDS } from '../utils/FormFields'

import { connect } from 'react-redux'
import { saveDraft, uploadData, saveCompleted, removeDraft, validate, showPage, setNotification } from '../actions'

class AEFIReportFollowupForm extends FormComponent {

  constructor(props) {
    super(props)

    var { model, settings } = this.props
    if(model == null) {
      model = { rid : Date.now(), type : REPORT_TYPE_AEFI, data_source: "desktop", device_type : settings.device_type }
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
      <div>

      <div className="container"><div className="col-md-6 col-sm-12">
        <TextInput label="Parent MCAZ Ref #" model={ model } name="parent_id"/>
      </div></div></div>
    ) : null

    return (
      <div className="aefi-form form">
        { confirmVisible }
        { confirmCancel }
        <h3 className="text-center">
          <span className="text-center">
            <img src="assets/images/mcaz_3.png" className="logo"></img>
          </span><br/>
          Adverse Event After Immunization (AEFI) Reporting Form
        </h3>

        <h5 className="text-center">Identities of Reporter, Patient and Institute will remain confidential</h5>

        <form className="form-horizontal">
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Parent MCAZ Ref #" model={ model } name="parent_reference" readOnly={ true }/>
            </div>
          </div>
          <hr/>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <AEFIVaccinationTableComponent name="aefi_list_of_vaccines" model={ model } validate={ this.state.validate } label="Vaccine   "/>
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
          <FileAttachmentComponent label="Do you have files that you would like to attach? click on the button to add them" validate={ this.state.validate } name="attachments" model={ model }/>

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

  /**
    When saved, check connection status.
  */
  saveAndSubmit(e) {
    e.preventDefault()
    const { model } = this.state
    const { uploadData, saveCompleted, connection, setNotification } = this.props
    var valid = true, names = "", page = 0;

    AEFI_FOLLOW_UP_MANDATORY_FIELDS.forEach((field) => {
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
    const { model } = this.state
    if(connection.isConnected) {
      const url = AEFI_URL + "/followup/" + btoa(model.parent_reference)
      uploadData(model, url, token)
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
    token: state.appState.token,
    settings: state.appState.settings
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

export default connect(mapStateToProps, mapDispatchToProps)(AEFIReportFollowupForm)
