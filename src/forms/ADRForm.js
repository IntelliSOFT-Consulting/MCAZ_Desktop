import React, { Component } from 'react'
import TextInput from '../components/TextInput'
import DateSelectInput from '../components/DateSelectInput'
import SingleMultipleInput from '../components/SingleMultipleInput'
import MedicationTableComponent from '../components/MedicationTableComponent'

import { REPORT_TYPE_ADR } from '../utils/Constants'

import { connect } from 'react-redux'
import { saveDraft, uploadData, saveCompleted, removeDraft } from '../actions'

class ADRForm extends Component {

  constructor(props) {
    super(props)
    var { model } = this.props
    if(model == null) {
      model = { rid : Date.now(), type : REPORT_TYPE_ADR, "name_of_institution" : "Nairobi Hosp", "sadr_list_of_drugs" : [ { "brand_name" : "dawa", "dose_id" : "1" }], user: {} }
    }
    this.state = { model }
    this.saveAndContinue = this.saveAndContinue.bind(this)
    this.saveAndSubmit = this.saveAndSubmit.bind(this)
    this.cancel = this.cancel.bind(this)
  }
  render() {
    var { model } = this.state
    return (
      <div>
        <h3 className="text-center">Adverse Drug Reaction (ADR) Report Form</h3>
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
              <TextInput label="Patient Initials" required={ true } model={ model } name="patient_name"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="VCT/OI/TB Number" model={ model } name="ip_no"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DateSelectInput label="Date of Birth:" required={ true } model={ model } name="date_of_birth"/>
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
              <SingleMultipleInput label="Gender" name="gender" model={ model } required={ true } inline={ true } options={["Male", "Female", "Unknown"]}/>
            </div>
          </div>
          <h5 className="text-center">Adverse Reaction</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DateSelectInput label="Date of onset" model={ model } name="date_of_onset_of_reaction"/>
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
              <SingleMultipleInput label="Serious" model={ model } name="severity" required={ true } options={["Yes", "No"]}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Reason for Seriousness" model={ model } name="severity_reason" required={ true } options={["Death", "Hospitalization/prolonged", "Congenital-anomaly", "Life-threateing", "Disabling", "Other medically important condition"]}/>
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
            <MedicationTableComponent label="Current Medication (including OTC and herbals) " name="sadr_list_of_drugs" model={ model }/>
          </div>
          <div className="container">
            <div className="col-md-4 col-sm-12">
              <SingleMultipleInput label="Action taken:" model={ model } name="" required={ true } options={["Yes", "No"]}/>
            </div>
            <div className="col-md-4 col-sm-12">
              <SingleMultipleInput label="Outcome of ADR:" model={ model } name="outcome" required={ true } options={["Yes", "No"]}/>
            </div>
            <div className="col-md-4 col-sm-12">
              <SingleMultipleInput label="Relatedness of suspected medicine(s) to ADR:" model={ model } name="" options={["Yes", "No"]}/>
            </div>
          </div>
          <h5 className="text-center">Reported By</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Forenames & Surname" model={ model } name="reporter_name" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Designation" model={ model } name="designation_id" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Email address" model={ model } name="reporter_email"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Phone number" model={ model } name="reporter_phone"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Name and address of institution" required={ true } model={ model } name=""/>
            </div>
          </div>
          <div className="container">
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
    Alert.alert("Confirm", "Stop data entry?", [
      {text: 'Yes', onPress: () => this.goBack() },
      {text: 'No' }
    ])
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
    saveCompleted: (data) => { // save the completed data and remove any draft.
      dispatch(saveCompleted(data))
      dispatch(removeDraft(data))
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ADRForm)
