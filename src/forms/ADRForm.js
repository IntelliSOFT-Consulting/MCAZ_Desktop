import React, { Component } from 'react'
import TextInput from '../components/TextInput'
import DateSelectInput from '../components/DateSelectInput'
import SingleMultipleInput from '../components/SingleMultipleInput'
import MedicationTableComponent from '../components/MedicationTableComponent'

export default class ADRForm extends Component {

  constructor(props) {
    super(props)
    const { model } = this.props

    this.saveAndContinue = this.saveAndContinue.bind(this)
    this.saveAndSubmit = this.saveAndSubmit.bind(this)
    this.cancel = this.cancel.bind(this)
  }
  render() {
    const { model } = this.props
    return (
      <div>
        <h3 className="text-center">Adverse Drug Reaction (ADR) Report Form</h3>
        <h5 className="text-center">Identities of Reporter, Patient and Institute will remain confidential</h5>

        <form className="form-horizontal">
          <h5 className="text-center">Patient Details</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Clinic/Hospital Name" model={ model } name=""/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Clinic/Hospital Number" model={ model } name=""/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Patient Initials" required={ true } model={ model } name=""/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="VCT/OI/TB Number" model={ model } name=""/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DateSelectInput label="Date of Birth:" required={ true } model={ model } name=""/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Weight (Kg)" model={ model } name=""/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Age" model={ model } name=""/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Height (meters)" model={ model } name=""/>
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
              <DateSelectInput label="Date of onset" model={ model } name=""/>
            </div>
            <div className="col-md-6 col-sm-12">
              <DateSelectInput label="Date of end of reaction (if it ended)" model={ model } name=""/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="Description of ADR" multiLine={ true } model={ model } name=""/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Serious" model={ model } name="severity" required={ true } options={["Yes", "No"]}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Reason for Seriousness" model={ model } name="" required={ true } options={["Death", "Hospitalization/prolonged", "Congenital-anomaly", "Life-threateing", "Disabling", "Other medically important condition"]}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Relevant Medical History" multiLine={ true } model={ model } name=""/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Relevant Past Drug Therapy" multiLine={ true } model={ model } name=""/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="Laboratory tests results:" multiLine={ true } model={ model } name=""/>
            </div>
          </div>

          <div className="container">
            <MedicationTableComponent label="Current Medication (including OTC and herbals) " name="sadr_list_of_drugs" model={ {} }/>
          </div>
          <div className="container">
            <div className="col-md-4 col-sm-12">
              <SingleMultipleInput label="Action taken:" model={ model } name="" required={ true } options={["Yes", "No"]}/>
            </div>
            <div className="col-md-4 col-sm-12">
              <SingleMultipleInput label="Outcome of ADR:" model={ model } name="" required={ true } options={["Yes", "No"]}/>
            </div>
            <div className="col-md-4 col-sm-12">
              <SingleMultipleInput label="Relatedness of suspected medicine(s) to ADR:" model={ model } name="" options={["Yes", "No"]}/>
            </div>
          </div>
          <h5 className="text-center">Reported By</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Forenames & Surname" model={ model } name="" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Designation" model={ model } name="" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Email address" model={ model } name=""/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Phone number" model={ model } name=""/>
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

  saveAndContinue() {
    const { saveDraft } = this.props
    const { model } = this.state
    saveDraft(model)
  }

  /**
    When saved, check connection status.
  */
  saveAndSubmit() {
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

  cancel() {
    Alert.alert("Confirm", "Stop data entry?", [
      {text: 'Yes', onPress: () => this.goBack() },
      {text: 'No' }
    ])
  }
}
