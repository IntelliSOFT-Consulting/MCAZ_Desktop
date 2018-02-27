import React, { Component } from 'react'

export default class AgeAtOnSetInput extends Component {
  constructor(props) {
    super(props)

    this.getModelValue = this.getModelValue.bind(this)
    this.handleChange = this.handleChange.bind(this)
    const { model, name, validate } = this.props

    var value = this.getModelValue(model, name)

    this.state = {
      value, validate
    }

  }

  getModelValue(model, name) {
    var value = { age_at_onset_days : "", age_at_onset_months: "", age_at_onset_years : "" }


      //if(model[name][day]) {
        value['age_at_onset_days'] = model["age_at_onset_days"] == null? "" : model["age_at_onset_days"] //model[name]['day']
      //if(model[name][month]) {
        value['age_at_onset_months'] = model["age_at_onset_months"] == null? "" : model["age_at_onset_months"] //model[name]['month']
      //if(model[name][year]) {
        value['age_at_onset_years'] = model["age_at_onset_years"] == null? "" : model["age_at_onset_years"] //model[name]['year']


    return value
  }

  handleChange(e) {
    var { value } = this.state
    const { model, name } = this.props
    if(e.target.value < 0) {
      return
    }
    value[e.target.name] = e.target.value
    model[e.target.name] = e.target.value
    this.setState({
      value: value
    });

    const { onChange } = this.props
    if(onChange) {
      onChange(model[e.target.name])
    }

  }

  render() {
    const { label, name, required } = this.props
    var input = null

    var reqSpan = null
    if(required) {
      reqSpan = (
        <span className="required">*</span>
      )
    }

    const hasError = (this.state.validate && required && Object.values(this.state.value).filter( v => v !== '').length == 0)? " has-error " : ""
    const className = "form-group" + hasError

    return (
      <div className={ className }>
        <label className="col-md-3 control-label form-input-label">{ label  } { reqSpan }</label>
        <div className="col-md-9 row">
          <div className="col-md-4">
            <div className="form-group">
              <label className="col-md-3 control-label form-input-label">Years</label>
              <div className="col-md-9">
                <input name="age_at_onset_years" type="number" placeholder="Years" className={`form-control day input-sm ${hasError}` } value={ this.state.value.age_at_onset_years } onChange={ this.handleChange } />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="col-md-3 control-label form-input-label">Months</label>
              <div className="col-md-9">
                <input name="age_at_onset_months" type="number" placeholder="Months" className="form-control month input-sm" value={ this.state.value.age_at_onset_months } onChange={ this.handleChange } />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="col-md-3 control-label form-input-label">Days</label>
              <div className="col-md-9">
                <input name="age_at_onset_days" type="number" placeholder="Days" className="form-control year input-sm" value={ this.state.value.age_at_onset_days } onChange={ this.handleChange } />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    const { validate, value } = this.state
    const { model, name } = this.props
    const newValidate = nextProps.validate
    if(newValidate != validate) {
      this.setState({ validate: newValidate })
    }

    const val = this.getModelValue(model, name)
    if(val.age_at_onset_days != value.age_at_onset_days || val.age_at_onset_months != value.age_at_onset_months || val.age_at_onset_years != value.age_at_onset_years) {
      this.setState({ value : val })
    }

  }
}
