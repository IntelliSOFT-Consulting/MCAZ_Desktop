import React, { Component } from 'react';

export default class Footer extends Component {

  constructor(props) {
    super(props)
    const { connection } = this.props
    this.state = { connection }
  }

  render() {
    
    var status = (
      <span>Status : <img src="assets/images/off.png"></img> Offline </span>
    )
    if(this.state.connection.isConnected) {
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

  componentWillReceiveProps(nextProps) {
    const currentConnection = this.props.connection
    const connection = nextProps.connection
    if(currentConnection.isConnected != connection.isConnected) {
      this.setState({ connection })
    }
  }
}
