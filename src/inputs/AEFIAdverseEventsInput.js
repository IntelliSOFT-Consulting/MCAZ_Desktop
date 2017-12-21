import React, { Component } from 'react'
import TextInput from './TextInput'

import {  SEIZURES, SEVERE_LOCAL_REACTIONS } from '../utils/FieldOptions'
export default class AEFIAdverseEventsInput extends Component {

  constructor(props) {
    super(props)
    const { model, name, options, validate } = this.props

    var values = []
    if(model && model[name]) {
      values = model[name].split(',')
    }
    var state = { values : values, validate, reactions: [], seizures: [] }

    this.state = state
    this.handleCheck = this.handleCheck.bind(this)
  }

  handleCheck(e) {
    const { options, name, model, multiple, onChange } = this.props
    var { values } = this.state
    if(values == null) {
      values = []
    }

    if(e.target.checked) {
      model[e.target.value] = "1"
    } else {
      model[e.target.value] = "0"
    }

    var values = this.state[e.target.name]
    var state = this.state

    if(e.target.type == "radio") {
      if(values[0] != null) {
        model[values[0]] = "0"
      }
      values = [e.target.value]
      state[e.target.name] = values
    } else {
      values = this.state.values
      if(e.target.checked) {
        values.push(e.target.value)
        model[e.target.value] = "1"
      } else {
        model[e.target.value] = "0"
        values = values.filter((v) => v != e.target.value )
      }
      state.values = values
    }



    this.setState(state)
    if(model) {
      model[name] = values.join(',')
    }
    if(onChange) {
      onChange(model[name])
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
              <input type="checkbox" value={ value } name={ name } checked={ model[value] == "1" || this.state.values.indexOf(value) != -1 } onChange={ this.handleCheck }/> { label }
            </label>
          )
        }
        return (
          <div className={ type } key={ index }>
            <label className={ inlineClass }>
              <input type="checkbox" value={ value } name={ name } checked={ this.state.values.indexOf(value) != -1 } onChange={ this.handleCheck }/> { label }
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

    const reactions = SEVERE_LOCAL_REACTIONS.map((option, index) => {
      return (
        <label className="radio-inline" key={ index + "-reactions"  }>
          <input type="radio" value={ option.key } name="reactions" checked={ this.state.reactions.indexOf(option.key) != -1 } onChange={ this.handleCheck }/> { option.value }
        </label>
      )
    })

    const seizures = SEIZURES.map((option, index) => {
      return (
        <label className="radio-inline" key={ index + "-seizures"}>
          <input type="radio" value={ option.key } name="seizures" checked={ this.state.seizures.indexOf(option.key) != -1 } onChange={ this.handleCheck }/> { option.value }
        </label>
      )
    })

    return (
      <div className="form-group">
        <div className="col-md-6">
          <label className="col-md-4 control-label form-input-label">{ label } { reqSpan }</label>
          <div className="col-md-6">
            { optionList }
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="col-md-4 control-label form-input-label">Severe local reactions</label>
            { reactions }
          </div>
          <div className="form-group">
            <label className="col-md-4 control-label form-input-label">Seizures</label>
            { seizures }
          </div>
          <div className="col-md-12">
            <TextInput label="If other, specify"  name="adverse_events_specify" model={ model } />
          </div>
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
