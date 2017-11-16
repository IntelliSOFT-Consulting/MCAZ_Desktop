import React, { Component } from 'react';

export default class Footer extends Component {

  constructor(props) {
    super(props)

  }
  render() {
    const { isConnected } = this.props
    var status = (
      <span>Status : <img src="assets/images/off.png"></img> Offline </span>
    )
    if(isConnected) {
      status = (
        <span>Status : <img src="assets/images/online.png"></img>  Online </span>
      )
    }
    return(
      <div className="container footer">
        <hr/>
        <p className="text-center"> &copy; MCAZ { status }</p>
      </div>
    )
  }
}
