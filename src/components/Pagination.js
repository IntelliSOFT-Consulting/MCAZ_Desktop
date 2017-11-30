import React, { Component } from 'react'

export default class Pagination extends Component {

  constructor(props) {
    super(props)
    this.getPageItems = this.getPageItems.bind(this)
    this.onChange = this.onChange.bind(this)
    this.getPage = this.getPage.bind(this)
    this.getNumberOfPages = this.getNumberOfPages.bind(this)

    const { activePage } = this.props
    this.state = { activePage }
  }

  /**
    Invoked when page number changes.
  */
  onChange(pageNumber) {
    const { onChange } = this.props
    this.setState({ activePage : pageNumber })
    if(onChange) {
      onChange(pageNumber)
    }
  }

  /**
    Returns the number of pages for the current view.
  */
  getNumberOfPages() {
    const { total, itemsPerPage } = this.props
    const noPages = Math.ceil(total / itemsPerPage)
    return noPages
  }

  /**
    Returns the pagination li items.
  */
  getPageItems() {
    const { activePage } = this.state
    const noPages = this.getNumberOfPages()
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

  /**
    Get the page to be rendered.
    When you click on next or previous
  */
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

  /**
    Renders the view.
  */
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
