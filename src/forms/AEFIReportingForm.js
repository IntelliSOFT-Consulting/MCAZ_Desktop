import React, { Component } from 'react'
import TextInput from '../components/TextInput'

export default class AEFIReportingForm extends Component {

  render() {
    return (
      <div>
        <h3 className="text-center">Adverse Drug Reaction (ADR) Report Form</h3>
        <h5 className="text-center">Identities of Reporter, Patient and Institute will remain confidential</h5>

        <form className="form-horizontal">
          <h5 className="text-center">Patient Details</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Patient first name" required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Surname" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Next of kin"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Patient's physical address"  required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Telephone" required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Gender" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Date of Birth:" required={ true } />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Age on onset" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Reporter's name" required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Designation" required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Department" required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Address" required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="District" required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Province" required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Telephone" required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Email" required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Today's date" required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Name of vaccination center" required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              Vaccine/Dilutent
            </div>
          </div>
          <h5 className="text-center">Adverse events</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Adverse events" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Date and time AEFI started" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="Date patient notified event to health system"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Describe AEFI" multiLine={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Treatment provided" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Serious" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="If yes" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Outcome" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="If died, date of death" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="Autopsy done" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="Past medical history (including history of similar reaction or other allergies), concomitant medication and other relevant information (e.g. other cases). Use additional sheet if needed :"
                multiLine={ true } />
            </div>
          </div>
          <h5 className="text-center">First decision making level to complete (District level):</h5>
          <div className="container">
            <div className="col-md-4 col-sm-12">
              <TextInput label="Date report recieved at District level" />
            </div>
            <div className="col-md-4 col-sm-12">
              <TextInput label="Investigation needed?" />
            </div>
            <div className="col-md-4 col-sm-12">
              <TextInput label="If yes, date investigation planned" />
            </div>
          </div>
          <h5 className="text-center">National level to complete:</h5>
          <div className="container">
            <div className="col-md-4 col-sm-12">
              <TextInput label="Date report received at national level (DD/MM/YYYY):" />
            </div>
            <div className="col-md-8 col-sm-12">
              <TextInput label="Comments" multiLine={ true }/>
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
