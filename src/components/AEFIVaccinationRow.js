import React, { Component } from 'react'
import moment from 'moment'
import TextInput from '../inputs/TextInput'
import DatePickerInput from '../inputs/DatePickerInput'
import CheckboxInput from '../inputs/CheckboxInput'
import { FREQUENCY, ROUTE, DOSE, RELATIONSHIP_SAE } from '../utils/FieldOptions'
import { REPORT_TYPE_AEFI_INV, REPORT_TYPE_AEFI_INV_FOLLOW_UP } from '../utils/Constants'

export default class AEFIVaccinationRow extends Component {

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
    const { type } = this.props;
    return (
      <tr>
        <td><TextInput hideLabel={ true } name="vaccine_name" validate={ this.props.validate } required={ type !== REPORT_TYPE_AEFI_INV && type !== REPORT_TYPE_AEFI_INV_FOLLOW_UP } model={ model } onChange={ this.onChange }/></td>
        <td><DatePickerInput hideLabel={ true } name="vaccination_date" model={ model } validate={ this.state.validate } maxDate={ moment() } onChange={ this.onChange }/></td>
        <td><TextInput hideLabel={ true } name="vaccination_time" model={ model } validate={ this.state.validate } showTime={ true } type="time" maxDate={ moment() } onChange={ this.onChange }/></td>
        <td><TextInput hideLabel={ true } name="dosage" model={ model } validate={ this.state.validate } onChange={ this.onChange }/></td>
        <td><TextInput hideLabel={ true } name="batch_number" model={ model } onChange={ this.onChange }/></td>
        <td><DatePickerInput hideLabel={ true } name="expiry_date" model={ model } validate={ this.state.validate } required={ true } onChange={ this.onChange }/></td>
        <td><TextInput hideLabel={ true } name="diluent_batch_number" model={ model } onChange={ this.onChange }/></td>
        <td><DatePickerInput hideLabel={ true } name="diluent_expiry_date" model={ model } onChange={ this.onChange }/></td>
        <td><DatePickerInput hideLabel={ true } name="diluent_date" model={ model }  maxDate={ moment() } showTime={ true } onChange={ this.onChange }/></td>
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
