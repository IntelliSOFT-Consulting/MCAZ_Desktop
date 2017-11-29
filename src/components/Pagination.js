import React, { Component } from 'react'

export default class Pagination extends Component {

  constructor(props) {
    super(props)
    this.getPageItems = this.getPageItems.bind(this)
    this.onChange = this.onChange.bind(this)
    this.getPage = this.getPage.bind(this)

    const { activePage } = this.props
    this.state = { activePage }
  }

  onChange(pageNumber) {
    const { onChange } = this.props
    this.setState({ activePage : pageNumber })
    if(onChange) {
      onChange(pageNumber)
    }
  }

  getPageItems() {
    const { total, itemsPerPage } = this.props
    const { activePage } = this.state
    const noPages = Math.ceil(total / itemsPerPage)
    var items = [], i = 0
    items.push((
      <li className="pointer" key={ Math.floor(Math.random() * 10000000) } onClick={ () => onChange(this.getPage(this.state.activePage - 1)) }>
        <span>
          <span aria-hidden="true">&laquo;</span>
        </span>
      </li>
    ))
    while(i < noPages) {
      const active = (activePage == i + 1)? "active" : "pointer"
      const page = i + 1
      items.push((
        <li className={ active } key={ Math.floor(Math.random() * 10000000) } onClick={ () => this.onChange(page) }>
          <span> { i + 1 } <span className="sr-only">(current)</span></span>
        </li>
      ))
      i++
    }
    items.push((
      <li className="pointer" key={ Math.floor(Math.random() * 10000000) } onClick={ () => this.onChange(this.getPage(this.state.activePage + 1)) }>
        <a className="pointer" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    ))
    return items
  }

  getPage(page) {
    const { total, itemsPerPage } = this.props
    const noPages = Math.ceil(total / itemsPerPage)
    if(page < 1) {
      return noPages
    }
    if(page > noPages) {
      return 1
    }
    return page
  }

  render() {
    const items = this.getPageItems()
    // no need for pagination if we have only one page.
    if(items.length <= 3) {
      return null
    }
    return (
      <nav aria-label="Pager">
        <ul className="pagination pagination-sm">
          { items }
        </ul>
      </nav>
    )
  }
}
