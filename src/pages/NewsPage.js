import React, { Component } from 'react';

export default class NewsPage extends Component {

  constructor(props) {
    super(props)

    const { completed, connection } = this.props
    this.state = { completed, connection }
  }

  render() {

    return (
      <div>News</div>
    )
  }
}
