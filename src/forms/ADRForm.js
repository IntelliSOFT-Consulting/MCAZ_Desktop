import React, { Component } from 'react'

import FormComponent from './FormComponent'

import Confirm from '../dialogs/Confirm'

import TextInput from '../inputs/TextInput'
import DateSelectInput from '../inputs/DateSelectInput'
import SingleMultipleInput from '../inputs/SingleMultipleInput'
import MedicationTableComponent from '../components/MedicationTableComponent'
import FileAttachmentComponent from '../components/FileAttachmentComponent'
import ConcomitantTableComponent from '../components/ConcomitantTableComponent'
import ReactionsComponent from '../components/ReactionsComponent'
import SelectInput from '../inputs/SelectInput'
import DatePickerInput from '../inputs/DatePickerInput'
import AutoSuggestInput from '../inputs/AutoSuggestInput'
import CheckboxInput from '../inputs/CheckboxInput'

import moment from 'moment'

import messages from '../utils/messages.json'

import { MAIN_PAGE, REPORT_TYPE_ADR, ADR_URL } from '../utils/Constants'

import { SEVERITY_REASON, OUTCOME, DESIGNATION, ACTION_TAKEN, RELATEDNESS_TO_ADR, AGE_GROUP, PROVINCES, BOOLEAN_OPTIONS } from '../utils/FieldOptions'

import { connect } from 'react-redux'
import { saveDraft, uploadData, saveCompleted, removeDraft, validate, showPage, setNotification } from '../actions'

class ADRForm extends FormComponent {

  constructor(props) {
    super(props)
    var { model, settings, user } = this.props
    if(model == null) {
      model = { "rid": Date.now(),"type":"REPORT_TYPE_ADR", data_source: "desktop", device_type : settings.device_type, reporter_email: user.email, reporter_name: user.name, in_utero: "" }
    }
    //model = {"rid":1510853208716,"type":"REPORT_TYPE_ADR","name_of_institution":"Nairobi Hosp","sadr_list_of_drugs":[{"brand_name":"dawa","dose_id":"7","route_id":"4","frequency_id":"4","drug_name":"wwqq","dose":"1","indication":"1","start_date":"1-10-2017","stop_date":"21-10-2017","suspected_drug":""}],"user":{},"patient_name":"xxsss","date_of_birth":"6-4-2015","weight":"34","height":"12","gender":"Male","date_of_onset_of_reaction":"8-2-2017","severity":"No","medical_history":"ss","lab_test_results":"ssds","action_taken":"Dose reduced","outcome":"Recovering","designation_id":"2","reporter_name":"John","reporter_email":"john@gmail.com","description_of_reaction":"hhhn"}
    this.state = { model : model, validate : null, confirmVisible : false, confirmCancel : false }

    this.saveAndSubmit = this.saveAndSubmit.bind(this)
    this.upload = this.upload.bind(this)
    this.setAgeGroup = this.setAgeGroup.bind(this)
    this.calculateAgeGroup = this.calculateAgeGroup.bind(this)
    this.onAgeChange = this.onAgeChange.bind(this)
    this.onSelectOfInstitution = this.onSelectOfInstitution.bind(this)
    this.onSeverityChange = this.onSeverityChange.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
    this.deleteConfirmed = this.deleteConfirmed.bind(this)
    this.onChange = this.onChange.bind(this)

    this.mandatory = [
      //{ name: "name_of_institution", text: "Clinic/Hospital name"},
      //{ name: "institution_code", text: "Clinic/Hospital Number" },
      //{ name : "patient_name", text : "Patient Initials", page : 1 },
      //{ name : "date_of_birth", text: "Date of bith", page : 1,  dependent: "age", value: ""},
      //{ name : "age", text: "Age", page : 1,  dependent: "date_of_birth", value: ""},
      //{ name : "gender", text : "Sex", page : 1 },
      //{ name : "date_of_onset_of_reaction", text : "Date of onset", page : 2 },
      //{ name : 'description_of_reaction', text : "Description of ADR", page : 2},
      //{ name : "severity", text : "Serious", page : 2 },
      //{ name : "outcome", text : "Outcome", page : 3 },
      { name : "sadr_list_of_drugs", fields: [
        //{ name : "drug_name", text : "Generic name" },
        //{ name : "dose_id", text : "Dose" },
        //{ name : "frequency_id", text : "Frequency" },
        //{ name : "start_date", text : "Start date" }
      ]}, // , { name : "suspected_drug", text : "Tick suspected medicine" }
      //{ name : 'action_taken', text : "Action taken", page : 3 },
      //{ name : "reporter_name", text : "Reporter name", page : 4 },
      { name : "designation_id", text : "Designation", page : 4 },
      { name : "reporter_email", text : "Email Address", page : 4 }
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

    const severityReason = this.state.model['severity'] == "Yes" ? (<div className="col-md-6 col-sm-12">
      <SelectInput label="Reason for Seriousness" model={ model } name="severity_reason" validate={ this.state.validate } options={ SEVERITY_REASON } dependent={ { name : "severity", value: "Yes" }} onChange={this.onChange}/>
    </div>) : null
    return (
      <div className='adr-form form'>
        { confirmVisible }
        { confirmCancel }
        { confirmDelete }
        <h3 className="text-center">
          <span className="text-center">
            <img src="assets/images/mcaz_3.png" className="logo"></img>
          </span><br/>
          Adverse Drug Reaction (ADR) Report Form
        </h3>
        <h5 className="text-center">Identities of Reporter, Patient and Institute will remain confidential</h5>
        <hr/>
        <form className="form-horizontal">
          { followUpInput }
          <h4 className="text-center">Patient Details</h4>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <AutoSuggestInput label="Clinic/Hospital Name" model={ model } name="name_of_institution" onChange={ this.onSelectOfInstitution } />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Clinic/Hospital Number" model={ model } name="institution_code" value={ this.state.institution_code } />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SelectInput label="Province" name="province_id" model={ model } options={ PROVINCES } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Patient Initials" validate={ this.state.validate } model={ model } name="patient_name" onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="VCT/OI/TB Number" model={ model } name="ip_no" onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DatePickerInput label="Date of Birth:" validate={ this.state.validate } model={ model } name="date_of_birth" maxDate={ moment() }  dependent={ "age" } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Weight (Kg)" model={ model } name="weight" type="number" validate={ this.state.validate } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="OR Age" model={ model } name="age" type="number" onChange={ this.onAgeChange }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Height (centrimetres)" model={ model } name="height" type="number" onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-md-offset-6 col-sm-12">
              <SingleMultipleInput label="Gender" name="gender" model={ model } validate={ this.state.validate } inline={ true } options={["Male", "Female", "Unknown"]} onChange={this.onChange}/>
            </div>
          </div>
          <hr/>
          <h4 className="text-center">Adverse Reaction</h4>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DatePickerInput label="Date of onset of reaction" model={ model } validate={ this.state.validate } name="date_of_onset_of_reaction" maxDate={ moment() } onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <DatePickerInput label="Date of end of reaction (if it ended)" model={ model } name="date_of_end_of_reaction" maxDate={ moment() } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <CheckboxInput label="Did reaction occur in utero?" name="in_utero" model={ model } options={ ['1'] } validate={ this.state.validate }  onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Description of ADR" multiLine={ true } model={ model } name="description_of_reaction" validate={ this.state.validate } onChange={this.onChange}/>
            </div>
            <ReactionsComponent model={ model } name="reactions" onChange={this.onChange}/>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Serious" model={ model } name="severity" validate={ this.state.validate } options={ BOOLEAN_OPTIONS } onChange={ this.onSeverityChange }/>
            </div>
            { severityReason }
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Relevant Medical History, including any allergies" multiLine={ true } model={ model } name="medical_history" onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Relevant Past Drug Therapy" multiLine={ true } model={ model } name="past_drug_therapy" onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="Laboratory tests results:" multiLine={ true } model={ model } name="lab_test_results" onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="Any other information:" multiLine={ true } model={ model } name="any_other_information" onChange={this.onChange}/>
            </div>
          </div>
          <hr/>
          <div className="container">
            <MedicationTableComponent label="Current Medication"  validate={ this.state.validate } name="sadr_list_of_drugs" model={ model } onChange={this.onChange}/>
          </div>
          <div className="container">
            <div className="col-md-4 col-sm-12">
              <SelectInput label="Action taken:" model={ model } name="action_taken" validate={ this.state.validate } options={ ACTION_TAKEN } onChange={this.onChange}/>
            </div>
            <div className="col-md-4 col-sm-12">
              <SelectInput label="Outcome of ADR:" model={ model } name="outcome" validate={ this.state.validate } options={ OUTCOME } onChange={this.onChange}/>
            </div>
            <div className="col-md-4 col-sm-12">
              <SelectInput label="Relatedness of suspected medicine(s) to ADR:" model={ model } name="relatedness" options={ RELATEDNESS_TO_ADR } onChange={this.onChange}/>
            </div>
          </div>
          <hr/>
          <FileAttachmentComponent label="Do you have files that you would like to attach? click on the button to add them" validate={ this.state.validate } name="attachments" model={ model } onChange={this.onChange}/>
          <hr/>
          <h4 className="text-center">Reported By</h4>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Reporter name" required={ true }  model={ model } name="reporter_name" onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SelectInput label="Designation" model={ model } required={ true } name="designation_id" options={ DESIGNATION } onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Reporter email" model={ model } required={ true }  name="reporter_email" onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Reporter phone" model={ model } name="reporter_phone" onChange={this.onChange}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Institution Name" model={ model } name="institution_name" onChange={this.onChange}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Institution Address" model={ model } name="institution_address" onChange={this.onChange}/>
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
    const newModel = Object.assign({}, model, newValue);
    this.setState({ model: newModel });
  }

  setAgeGroup(value) {
    const values = value.split("-")
    if(values[2] != "") {
      const time = moment().year(values[2]).month(values[1]).day(values[0])
      const now = moment()
      const age = now.diff(time, 'years', true);
      const days = now.diff(time, 'days', true);

      var age_group = this.calculateAgeGroup(age, days)


      this.onChange({ age_group: age_group, age: '' })
    }
  }

  calculateAgeGroup(age, days) {
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
    return age_group
  }

  onSelectOfInstitution(value) {
    const { model } = this.state
    if(typeof value == "object") {
      this.setState({ institution_code : value.code })
      this.onChange({ institution_code: value.code });
    } else {
      this.setState({ institution_code : "" });
      this.onChange({ institution_code: '' });
    }
  }

  onSeverityChange(value) {
    const { model } = this.state
    if (value['severity'] === 'No') {
      value['severity_reason'] = '';
    }
    this.onChange(value);
  }

  onAgeChange(value) {
    var age_group = this.calculateAgeGroup(value.age)
    const { model } = this.state
    const newValue = Object.assign({}, value, { age_group: age_group, date_of_birth: '' });
    this.onChange(newValue);
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

    var valid = true
    var names = ""
    var page = 0
    // Validate the weight should not be less than 0
    if(Number(model['weight']) < 0) {
      valid = false;
    }
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
          /*if(suspected_drug == 0) {
            valid = false
          }*/
        } else {
          //valid = false
        }
        if(names != "") {
          names += ",\n"
        }
        names += arrayNames.join(',\n')
      } else {
        if(field.dependent) {
          if((model[field.dependent] == "" || model[field.dependent] == null) && (model[field.name] == null || model[field.name] === "")) {
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
      uploadData(model, ADR_URL, token)
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

export default connect(mapStateToProps, mapDispatchToProps)(ADRForm)

//<ConcomitantTableComponent label="Concomitant (Other) drugs taken, including herbal medicines &amp; Dates/period taken: " name="sadr_other_drugs" model={ model }/>
/*
<div className="col-md-6 col-sm-12">
  <SelectInput label="Age group" model={ model } name="age_group" options={ AGE_GROUP } disabled={ "true" }/>
</div>
*/
