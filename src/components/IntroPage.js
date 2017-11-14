import React, { Component } from 'react';

export default class IntroPage extends Component {
  render() {
    return(
      <div className="container-fluid">
        <div className="col-md-4 col-sm-4">
          <h3>ADR</h3>
          <p>Adverse drug reaction</p>
          <button className="btn btn-sm btn-default">Report</button>
        </div>
        <div className="col-md-4 col-sm-4">
          <h3>AEFI</h3>
          <p>Adverse Event Following Immunization.</p>
          <button className="btn btn-sm btn-default">Report</button>
        </div>
        <div className="col-md-4 col-sm-4">
          <h3>SAE</h3>
          <p>Serious Adverse Event</p>
          <button className="btn btn-sm btn-primary">Report</button>
        </div>
      </div>
    )
  }
}
