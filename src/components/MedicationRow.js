import React, { Component } from 'react'
import moment from 'moment'
import TextInput from '../inputs/TextInput'
import DatePickerInput from '../inputs/DatePickerInput'
import CheckboxInput from '../inputs/CheckboxInput'
import SelectInput from '../inputs/SelectInput'
import { FREQUENCY, ROUTE, DOSE } from '../utils/FieldOptions'

export default class MedicationRow extends Component {

  constructor(props) {
    super(props);
    const { model, validate } = props;
    this.onChange = this.onChange.bind(this);
    this.onRemove = this.onRemove.bind(this)
    this.state = { model, validate };
  }

  onChange(value) {
    const { model } = this.state
    const { index, onChange } = this.props;
    const newModel = Object.assign({}, model, value);
    this.setState({ model: newModel })
    if (onChange) {
      onChange(newModel, index)
    }
  }

  onRemove(e) {
    e.preventDefault();
    const { onRemove, index } = this.props;
    onRemove(index, e)
  }

  componentWillReceiveProps(nextProps) {
    const { validate } = this.state
    const newValidate = nextProps.validate
    if(newValidate != validate) {
      this.setState({ validate: newValidate })
    }
    const { model } = nextProps
    this.setState({ model })
  }

  render() {
    const { model } = this.state;
    return (
      <tr>
        <td><TextInput hideLabel={ true } name="drug_name" validate={ this.props.validate } required={ true } model={ model } onChange={ this.onChange }/></td>
        <td><TextInput hideLabel={ true } name="brand_name" model={ model } onChange={ this.onChange }/></td>
        <td><TextInput hideLabel={ true } name="batch_number" model={ model } onChange={ this.onChange }/></td>
        <td><TextInput hideLabel={ true } name="dose" model={ model } validate={ this.state.validate } required={ true } onChange={ this.onChange }/></td>
        <td><SelectInput hideLabel={ true } name="dose_id" model={ model } validate={ this.state.validate } required={ true } options={ DOSE } onChange={ this.onChange }/></td>
        <td><SelectInput hideLabel={ true } name="route_id" model={ model } validate={ this.state.validate } required={ true } options={ ROUTE } onChange={ this.onChange }/></td>
        <td><SelectInput hideLabel={ true } name="frequency_id" model={ model } validate={ this.state.validate } required={ true } options={ FREQUENCY } onChange={ this.onChange }/></td>
        <td><TextInput hideLabel={ true } name="indication" model={ model } onChange={ this.onChange }/></td>
        <td><DatePickerInput hideLabel={ true } name="start_date" model={ model } validate={ this.state.validate } required={ true } maxDate={ moment() } onChange={ this.onChange }/></td>
        <td><DatePickerInput hideLabel={ true } name="stop_date" model={ model } maxDate={ moment() } minDate={ model['start_date'] } onChange={ this.onChange }/></td>
        <td><CheckboxInput hideLabel={ true } name="suspected_drug" model={ model } options={ ['1'] } onChange={ this.onChange }/></td>
        <td>
          <button className="btn btn-sm btn-danger" onClick={ this.onRemove }>
            <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
          </button>
        </td>
      </tr>
    )
  }

}
