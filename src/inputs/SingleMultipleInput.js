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
    this.namePrefix = Math.floor(Math.random() * Math.floor(1000000000))
  }

  handleCheck(e) {
    const { options, name, model, multiple, onChange } = this.props
    var { values } = this.state
    if(values == null) {
      values = []
    }
    if(!multiple) {
      values = [e.target.value]
    } else {
      if(e.target.checked) {
        values.push(e.target.value)
        model[e.target.value] = "1"
      } else {
        model[e.target.value] = "0"
        values = values.filter((v) => v != e.target.value )
      }
    }

    this.setState({ values });
    const newValue = {}
    if(model) {
      newValue[name] = values.join(',');
    }
    if(onChange) {
      onChange(newValue);
    }
  }


  render() {
    const { label, name, options, multiple, required, inline, hideLabel, model } = this.props
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
              <input type={ type } value={ value } name={ this.namePrefix + "-" + name } checked={ model[value] == "1" || this.state.values.indexOf(value) != -1 } onChange={ this.handleCheck }/> { label }
            </label>
          )
        }
        return (
          <div className={ type } key={ index }>
            <label className={ inlineClass }>
              <input type={ type } value={ value } name={ this.namePrefix + "-" + name } checked={ this.state.values.indexOf(value) != -1 } onChange={ this.handleCheck }/> { label }
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
    const hasError = (this.state.validate && required && this.state.values.length == 0)? " has-error " : ""
    const className = "form-group" + hasError
    if(hideLabel) {
      return (
        <div className={ hasError }>
          { optionList }
        </div>
      )
    }
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
    const { validate, values } = this.state
    const { model, name } = this.props
    const newValidate = nextProps.validate
    if(newValidate != validate) {
      this.setState({ validate: newValidate })
    }
    if(model && model[name] != null) {
      var vals = model[name].split(",")
      const difference = values.filter( val => vals.indexOf(val) === -1 )
      if(difference.length > 0){
        this.setState({ values : vals })
      }
    }
  }
}
