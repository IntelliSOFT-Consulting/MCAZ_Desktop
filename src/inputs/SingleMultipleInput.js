import React, { Component } from 'react'

export default class SingleMultipleInput extends Component {

  constructor(props) {
    super(props)
    const { model, name, options, validate } = this.props

    var values = []
    if(model && model[name]) {
      values = model[name].split(',')
    }
    var state = { values : values, validate }

    this.state = state
    this.handleCheck = this.handleCheck.bind(this)
  }

  handleCheck(e) {
    const { options, name, model } = this.props
    var { values } = this.state
    if(values == null) {
      values = []
    }
    if(e.target.checked) {
      values.push(e.target.value)
    } else {
      values = values.filter((v) => v != e.target.value )
    }

    this.setState({ values })
    if(model) {
      model[name] = this.state.values.join(',')
    }
  }


  render() {
    const { label, name, options, multiple, required, inline } = this.props
    var type = multiple? "checkbox" : "radio";

    const inlineClass = inline? type + '-inline' : ''
    var optionList = null
    if(options != null) {
      optionList = options.map((option, index) => {
        var label, value, key;

        if(typeof option == "string") {
          label = option;
          value = option;
          key = index
        } else {
          label = option.value;
          value = option.key;
          key = value
        }
        if(inline) {
          return (
            <label className={ inlineClass } key={ index }>
              <input type={ type } value={ value } name={ name } checked={ this.state.values.indexOf(value) != -1 } onChange={ this.handleCheck }/> { label }
            </label>
          )
        }
        return (
          <div className={ type } key={ index }>
            <label className={ inlineClass }>
              <input type={ type } value={ value } name={ name } checked={ this.state.values.indexOf(value) != -1 } onChange={ this.handleCheck }/> { label }
            </label>
          </div>
        )
      })
    }
    var reqSpan = null
    if(required) {
      reqSpan = (
        <span className="required">*</span>
      )
    }
    const hasError = (this.state.validate && required)? " has-error " : ""
    const className = "form-group" + hasError

    return (
      <div className={ className }>
        <label className="col-md-4 control-label form-input-label">{ label } { reqSpan }</label>
        <div className="col-md-6">
          { optionList }
        </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    const { validate } = this.state
    const newValidate = nextProps.validate
    if(newValidate != validate) {
      this.setState({ validate: newValidate })
    }
  }
}
