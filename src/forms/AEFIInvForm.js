import React, { Component } from 'react'
import TextInput from '../components/TextInput'

export default class AEFIInvForm extends Component {

  render() {
    return (
      <div>
        <h3 className="text-center">AEFI INVESTIGATION FORM</h3>
        <h5 className="text-center">(Only for Serious Adverse Events Following Immunization - Death / Disability / Hospitalization / Cluster)</h5>

        <form className="form-horizontal">
          <h5 className="text-center">Basic Details</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Place of vaccination" required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Type of site" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Vaccination in"/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Name of Investigating Health Worker:" required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Designation / Position:" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Telephone # landline (with code):" required={ true } />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Mobile" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Email" required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Date AEFI reported:" required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Date investigation started:" required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Date investigation completed:" required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Patient Name" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Gender" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Date of hospitalization (DD/MM/YYYY):" required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Status on the date of investigation" required={ true }/>
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="If died, date and time of death (DD/MM/YYYY):" required={ true }/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Autopsy done?" required={ true }/>
            </div>
          </div>

          <div className="container">
            <h5>Relevant patient information prior to immunization</h5>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Past history of similar event" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Remarks" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Adverse event after previous vaccination(s)" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Remarks" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="History of allergy to vaccine, drug or food" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Remarks" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Pre-existing illness (30 days) / congenital disorder" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Remarks" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="History of hospitalization in last 30 days, with cause" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Remarks" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Was patient on medication at time of vaccination? (If yes, name the drug, indication, doses &amp; treatment dates)" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Remarks" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Did patient consult faith healers before/after vaccination? *specify" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Remarks" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Family history of any disease (relevant to AEFI) or allergy" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Remarks" />
            </div>
          </div>
          <h5>For adult women</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Currently pregnant?"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Currently breastfeeding?"/>
            </div>
          </div>
          <h5>For infants</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="The birth was" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Birth weight:" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Delivery procedure was" />
            </div>
          </div>

          <div className="container">
            <h5>Details of first examination** of serious AEFI case</h5>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Source of information" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="If from verbal autopsy, please mention source" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Name of the person who first examined/treated the patient:" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Other sources who provided information (specify):" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="Signs and symptoms in chronological order from the time of vaccination:" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Name and contact information of person completing these clinical details:"
                multiLine={ true } />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Designation:" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Date/time" />
            </div>
          </div>
          <div className="container">
            <h5>If patient has received medical care  attach copies of all available documents (including case sheet, discharge
summary, laboratory reports and autopsy reports, if available) and write only the information that is not available in the
attached documents below</h5>
            <h5>If patient has not received medical care – obtain history, examine the patient and write down your findings below (add
additional sheets if necessary)</h5>
            <div className="col-md-12 col-sm-12">
              <TextInput label="" />
            </div>
          </div>

          <div className="container">
            <h5>Details of vaccines provided at the site linked to AEFI on the corresponding day</h5>
          </div>
          <div className="container">
            <h5>Number vaccinated for each antigen at session site. Attach record if available.</h5>
          </div>
          <h5 className="text-center">National level to complete:</h5>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="a. When was the patient vaccinated?" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="In case of multidose vials, was the vaccine given" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="b. Was there an error in prescribing or non-adherence to recommendations for use of this vaccine?" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="c. Based on your investigation, do you feel that the vaccine (ingredients) administered could have
been unsterile?" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="d. Based on your investigation, do you feel that the vaccine&#39;s physical condition (e.g. colour, turbidity,
foreign substances etc.) was abnormal at the time of administration?" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="e. Based on your investigation, do you feel that there was an error in vaccine
reconstitution/preparation by the vaccinator (e.g. wrong product, wrong diluent, improper mixing,
improper syringe filling etc.)?" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="f. Based on your investigation, do you feel that there was an error in vaccine handling (e.g. cold
chain failure during transport, storage and/or immunization session etc.)?" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="g. Based on your investigation, do you feel that the vaccine was administered incorrectly (e.g. wrong
dose, site or route of administration, wrong needle size, not following good injection practice etc.)?" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="h. Number vaccinated from the concerned vaccine vial/ampoule" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="i. Number vaccinated with the concerned vaccine in the same session" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="j. Number vaccinated with the concerned vaccine having the same batch number in other locations." />
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="k. Is this case a part of a cluster?" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label=" If yes, how many other cases have been detected in the cluster?" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="a. Did all the cases in the cluster receive vaccine from the same vial?" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="b. If no, number of vials used in the cluster (enter details separately)" />
            </div>
          </div>

          <div className="container">
            <h5>Details of vaccines provided at the site linked to AEFI on the corresponding day</h5>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Are AD syringes used for immunization?" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="If no, specify the type of syringes used:" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="Specific key findings/additional observations and comments:" />
            </div>
          </div>
          <div className="container">
            <h5>Reconstitution: (complete only if applicable,  NA if not applicable)</h5>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Same reconstitution syringe used for multiple vials of same vaccine?" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Same reconstitution syringe used for reconstituting different vaccines?" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Separate reconstitution syringe for each vaccine vial?" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Separate reconstitution syringe for each vaccination?" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Are the vaccines and diluents used the same as those recommended by the manufacturer?" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Specific key findings/additional observations and comments:" />
            </div>
          </div>

          <div className="container">
            <h5>Cold chain and transport</h5>
          </div>
          <div className="container">
            <h5>Last vaccine storage point:</h5>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Is the temperature of the vaccine storage refrigerator monitored?" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="If “yes”, was there any deviation outside of 28 ° C after the vaccine was placed inside?" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="If “yes”, provide details of monitoring separately." />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Was the correct procedure for storing vaccines, diluents and syringes followed?" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Was any other item (other than EPI vaccines and diluents) in the refrigerator or freezer?" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Were any partially used reconstituted vaccines in the refrigerator?" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Were any unusable vaccines (expired, no label, VVM at stages 3 or 4, frozen) in the refrigerator?" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Were any unusable diluents (expired, manufacturer not matched, cracked, dirty ampoule) in the store?" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Specific key findings/additional observations and comments:" />
            </div>
          </div>
          <div className="container">
            <h5>Vaccine transportation from the refrigerator to the vaccination centre:</h5>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Was cold chain properly maintained during transportation?" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Was the vaccine carrier sent to the site on the same day as vaccination?" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Were conditioned coolant-packs used?" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Specific key findings/additional observations and comments:" />
            </div>
          </div>

          <div className="container">
            <h5>Community investigation (Please visit locality and interview parents/others)</h5>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="Were any similar events reported within a time period similar to when the adverse event occurred and in the same locality?" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="If yes, describe:" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-6 col-sm-12">
              <TextInput label="If yes, how many events/episodes?" />
            </div>
          </div>
          <div className="container">
            <h5>Of those affected, how many are</h5>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Vaccinated:" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Not vaccinated::" />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextInput label="Unknown:" />
            </div>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="Other comments:" />
            </div>
          </div>

          <div className="container">
            <h5>Other relevant findings/observations/comments</h5>
          </div>
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <TextInput label="" />
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
