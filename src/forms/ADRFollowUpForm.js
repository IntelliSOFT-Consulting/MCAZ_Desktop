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
import AutoSuggestInput from '../inputs/AutoSuggestInput'
import ReadOnlyDataRenderer from '../readonly/ReadOnlyDataRenderer'

import moment from 'moment'

import messages from '../utils/messages.json'

import { MAIN_PAGE, REPORT_TYPE_ADR, ADR_URL } from '../utils/Constants'

import { SEVERITY_REASON, OUTCOME, DESIGNATION, ACTION_TAKEN, RELATEDNESS_TO_ADR, AGE_GROUP, PROVINCES } from '../utils/FieldOptions'

import { connect } from 'react-redux'
import { saveDraft, uploadData, saveCompleted, removeDraft, validate, showPage, setNotification } from '../actions'

class ADRFollowUpForm extends FormComponent {

  constructor(props) {
    super(props)
    var { model, settings } = this.props
    if(model == null) {
      model = { "rid": Date.now(),"type": REPORT_TYPE_ADR_FOLLOW_UP, data_source: "desktop", device_type : settings.device_type }
    }
    if(model.device_type == null) {
      model.device_type = settings.device_type
    }
    if(model.data_source == null) {
      model.data_source = "desktop"
    }
    //model = {"rid":1510853208716,"type":"REPORT_TYPE_ADR","name_of_institution":"Nairobi Hosp","sadr_list_of_drugs":[{"brand_name":"dawa","dose_id":"7","route_id":"4","frequency_id":"4","drug_name":"wwqq","dose":"1","indication":"1","start_date":"1-10-2017","stop_date":"21-10-2017","suspected_drug":""}],"user":{},"patient_name":"xxsss","date_of_birth":"6-4-2015","weight":"34","height":"12","gender":"Male","date_of_onset_of_reaction":"8-2-2017","severity":"No","medical_history":"ss","lab_test_results":"ssds","action_taken":"Dose reduced","outcome":"Recovering","designation_id":"2","reporter_name":"John","reporter_email":"john@gmail.com","description_of_reaction":"hhhn"}
    this.state = { model : model, validate : null, confirmVisible : false, confirmCancel : false }

    this.saveAndSubmit = this.saveAndSubmit.bind(this)
    this.upload = this.upload.bind(this)
    this.setAgeGroup = this.setAgeGroup.bind(this)
    this.closeModal = this.closeModal.bind(this)

    this.mandatory = [
      { name : "date_of_onset_of_reaction", text : "Date of onset", page : 2 },
      { name : 'description_of_reaction', text : "Description of ADR", page : 2},
      { name : "severity", text : "Serious", page : 2 },
      { name : "sadr_list_of_drugs", fields: [{ name : "drug_name", text : "Generic name" }, { name : "dose_id", text : "Dose" },
        { name : "frequency_id", text : "Frequency" }, { name : "start_date", text : "Start date" }]}, // , { name : "suspected_drug", text : "Tick suspected medicine" }

    ]
  }

  closeModal() {
    this.setState({ confirmVisible : false, confirmCancel : false })
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
      <div className='adr-form form'>
        { confirmVisible }
        { confirmCancel }
        { confirmDelete }
        <h3 className="text-center">
          <span className="text-center">
            <img src="assets/images/mcaz_3.png" className="logo"></img>
          </span><br/>
        Adverse Drug Reaction (ADR) Report Form - Folow Up
        </h3>
        <h5 className="text-center">Identities of Reporter, Patient and Institute will remain confidential</h5>
        <hr/>
        <form className="form-horizontal">
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <ReadOnlyDataRenderer label="Parent MCAZ Ref #" model={ model } name="parent_reference" readOnly={ true }/>
            </div>
          </div>
          <hr/>
          <h4 className="text-center">Adverse Reaction</h4>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DateSelectInput label="Date of onset of reaction" model={ model } validate={ this.state.validate } required={ true } name="date_of_onset_of_reaction"/>
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
          <hr/>
          <div className="container">
            <MedicationTableComponent label="Add Medication"  validate={ this.state.validate } name="sadr_list_of_drugs" model={ model }/>
          </div>
          <hr/>
          <FileAttachmentComponent label="Do you have files that you would like to attach? click on the button to add them" validate={ this.state.validate } name="attachments" model={ model }/>
          <hr/>
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

  setAgeGroup(value) {
    const values = value.split("-")
    if(values[2] != "") {
      const time = moment().year(values[2]).month(values[1]).day(values[0])
      const now = moment()
      const age = now.diff(time, 'years', true);
      const days = now.diff(time, 'days', true);
      var age_group = ""
      if(days <= 28) {
        age_group = "neonate"
      } else if(age >= 70) {
        age_group = "elderly"
      } else if(age >= 17) {
        age_group = "adult"
      } else if(age >= 12) {
        age_group = "adolescent"
      } else if(age >= 5) {
        age_group = "child"
      } else {
        age_group = "infant"
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
    const { uploadData, saveCompleted, connection, token } = this.props
    var { model } = this.state
    model.submitted = 2
    if(connection.isConnected) {
      const url = ADR_URL + "/followup/" + btoa(model.parent_reference)
      uploadData(model, url, token)
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
    removeDraft: (report) => {
      dispatch(removeDraft(report))
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ADRFollowUpForm)

//<ConcomitantTableComponent label="Concomitant (Other) drugs taken, including herbal medicines &amp; Dates/period taken: " name="sadr_other_drugs" model={ model }/>
