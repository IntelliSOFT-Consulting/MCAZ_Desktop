import React, { Component } from 'react'
import TextInput from '../inputs/TextInput'

import { MAIN_PAGE, REPORT_TYPE_SAE } from '../utils/Constants'

import { connect } from 'react-redux'
import { saveDraft, uploadData, saveCompleted, removeDraft, validate, showPage } from '../actions'

class SAEForm extends Component {

  constructor(props) {
    super(props)

    var { model } = this.props
    if(model == null) {
      model = { rid : Date.now(), type : REPORT_TYPE_SAE }
    }

    this.saveAndContinue = this.saveAndContinue.bind(this)
    this.saveAndSubmit = this.saveAndSubmit.bind(this)
    this.cancel = this.cancel.bind(this)

    this.state = { model }
  }
  render() {
    return (
      <div>
        <h3 className="text-center">SERIOUS ADVERSE EVENT REPORTING FORM</h3>
        <h5 className="text-center">Identities of Reporter, Patient and Institute will remain confidential</h5>

        <form className="form-horizontal">
          <h5 className="text-center">Patient Details</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="MRCZ Protocol #:" required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Institution" required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="MRCZ Protocol #" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Principal Investigator" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Phone:" required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Report prepared by" required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Email" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Designation in the study:" required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Date Form completed" required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Study title" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Study sponsor" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Date of Adverse Event:" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Participant ID:" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Hosp. Num.:" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Type of Report:" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Date of Site Awareness:" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Date of Birth:" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Gender" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Study week:-" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Visit number:-" />
            </div>
          </div>
          <h5 className="text-center">Current Medication (including OTC and herbals)</h5>
          <div className="container">
            Medication
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="1. What type of adverse event is this?" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="2a. If SAE, is it:" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="2b. Toxicity Grade:" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="3a. Any previous Adverse Event’s report on this participant?:" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="If yes, how many?" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="3b. Total Number of SAEs to date for the whole study:" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="4. Location of the current Adverse Event:" required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="5. Research involves a:" required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="6. Name of Drug, Device or Procedure:" required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="7. Is the drug/device investigational:" required={ true }/>
            </div>
          </div>
          <div className="container">
            <h5>8a. List all study / intervention drugs being taken at the time of onset of the SAE, or within 30 days prior to onset, and describe
their relationship to the SAE:</h5>

          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="9. Was the patient taking any other drug at the time of onset of the AE?" required={ true }/>
            </div>
          </div>
          <div className="container">
            <h5>10. If yes, then list all concomitant medication being taken at least one month before the onset of the SAE and describe the relationship to the SAE:</h5>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="11. Has the Adverse Event been reported to:" required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="7. Is the drug/device investigational:" required={ true }/>
            </div>
          </div>
          <h5>12. Describe the SAE with diagnosis, immediate cause or precipitating events, symptoms, any investigations, management,
results and outcome (with dates where possible). Include relevant medical history. Additional narrative, photocopies of
results of abnormal investigations and a hospital discharge letter may be attached:</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Summary of relevant past medical history of participant" required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="(a) Diagnosis :" required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="(b) Immediate Cause:" required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="(c) Symptoms:" required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="(d) Investigations-Laboratory and any other significant investigations conducted:" required={ true }/>
            </div>
          </div>
          <div className="container">
            Labs
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="(e) Results:" required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="(f) Management (Include management of study treatment, continued, temporarily held, reduced dose, permanent discontinuation, off Product):" required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="(g) Outcome:" required={ true }/>
            </div>
          </div>
          <h6>NB If the outcome is death, please complete &amp; attach the death form.</h6>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="D1. Was this Adverse Event originally addressed in the protocol and consent form?" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="D2. Was this Adverse Event originally addressed in Investigators Brochure?" required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="D3. Are changes required to the protocol as a result of this SAE?" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="D4. Are changes required to the consent form as a result of this SAE?" required={ true }/>
            </div>
          </div>
          <h6>If changes are required, please attach a copy of the revised protocol/consent form with changes highlighted with a bright coloured highlighter.</h6>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="If changes are not required, please explain as to why changes to the protocol /consent form are not necessary based on the event."
                required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="From the data obtained or from currently available information, do you see any need to reassess the risks and benefits to the subjects in
this research." />
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
    var valid = false;
    if(!valid) {
      this.setState({ validate : true })
      return
    }

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
    const { showPage } = this.props
    showPage(MAIN_PAGE)
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
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SAEForm)
