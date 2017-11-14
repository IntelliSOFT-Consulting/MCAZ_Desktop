import React, { Component } from 'react'
import TextInput from '../components/TextInput'
import DateSelectInput from '../components/DateSelectInput'
import SingleMultipleInput from '../components/SingleMultipleInput'
import MedicationTableComponent from '../components/MedicationTableComponent'

export default class ADRForm extends Component {

  render() {
    return (
      <div>
        <h3 className="text-center">Adverse Drug Reaction (ADR) Report Form</h3>
        <h5 className="text-center">Identities of Reporter, Patient and Institute will remain confidential</h5>

        <form className="form-horizontal">
          <h5 className="text-center">Patient Details</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Clinic/Hospital Name" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Clinic/Hospital Number" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Patient Initials" required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="VCT/OI/TB Number" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DateSelectInput label="Date of Birth:" required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Weight (Kg)" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Age" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Height (meters)" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-md-offset-6 col-sm-12">
              <SingleMultipleInput label="Gender" name="gender" required={ true } inline={ true } options={["Male", "Female", "Unknown"]}/>
            </div>
          </div>
          <h5 className="text-center">Adverse Reaction</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <DateSelectInput label="Date of onset" />
            </div>
            <div className="col-md-6 col-sm-12">
              <DateSelectInput label="Date of end of reaction (if it ended)" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="Description of ADR" multiLine={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Serious" name="severity" required={ true } options={["Yes", "No"]}/>
            </div>
            <div className="col-md-6 col-sm-12">
              <SingleMultipleInput label="Reason for Seriousness" required={ true } options={["Death", "Hospitalization/prolonged", "Congenital-anomaly", "Life-threateing", "Disabling", "Other medically important condition"]}/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Relevant Medical History" multiLine={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Relevant Past Drug Therapy" multiLine={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="Laboratory tests results:" multiLine={ true }/>
            </div>
          </div>

          <h5 className="text-center">Current Medication (including OTC and herbals)</h5>
          <div className="container">
            <MedicationTableComponent />
          </div>
          <div className="container">
            <div className="col-md-4 col-sm-12">
              <SingleMultipleInput label="Action taken:" required={ true } options={["Yes", "No"]}/>
            </div>
            <div className="col-md-4 col-sm-12">
              <SingleMultipleInput label="Outcome of ADR:" required={ true } options={["Yes", "No"]}/>
            </div>
            <div className="col-md-4 col-sm-12">
              <SingleMultipleInput label="Relatedness of suspected medicine(s) to ADR:" options={["Yes", "No"]}/>
            </div>
          </div>
          <h5 className="text-center">Reported By</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Forenames & Surname" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Designation" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Email address" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Phone number" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Name and address of institution" required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-3 col-md-offset-1">
              <button className="btn btn-sm btn-primary">Save Changes</button>
            </div>
            <div className="col-md-3 col-md-offset-1">
              <button className="btn btn-sm btn-primary">Save and submit</button>
            </div>
            <div className="col-md-3 col-md-offset-1">
              <button className="btn btn-sm btn-default">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
