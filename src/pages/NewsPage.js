import React, { Component } from 'react';

export default class NewsPage extends Component {

  constructor(props) {
    super(props)

    const { completed, connection } = this.props
    this.state = { completed, connection }
  }

  render() {
    const { news } = this.props
    const newsContent = news != null ? news.content : " No news yet. "
    return (
      <div className="container">{ newsContent }</div>
    )
  }
}
