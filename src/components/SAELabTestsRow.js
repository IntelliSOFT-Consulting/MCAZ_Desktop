import React, { Component } from 'react'
import moment from 'moment'
import TextInput from '../inputs/TextInput'
import DatePickerInput from '../inputs/DatePickerInput'
import CheckboxInput from '../inputs/CheckboxInput'
import { FREQUENCY, ROUTE, DOSE, RELATIONSHIP_SAE } from '../utils/FieldOptions'

export default class SAELabTestsRow extends Component {

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
        <td><TextInput hideLabel={ true } name="lab_test" validate={ this.props.validate } required={ true } model={ model } onChange={ this.onChange }/></td>
        <td><TextInput hideLabel={ true } name="abnormal_result" model={ model } validate={ this.state.validate } required={ true } onChange={ this.onChange }/></td>
        <td><TextInput hideLabel={ true } name="site_normal_range" model={ model } validate={ this.state.validate } required={ true } options={ DOSE } onChange={ this.onChange }/></td>
        <td><DatePickerInput hideLabel={ true } name="collection_date" model={ model } validate={ this.state.validate } required={ true } onChange={ this.onChange }/></td>
        <td><TextInput inline={ true } hideLabel={ true } name="lab_value" model={ model } validate={ this.state.validate } required={ true } onChange={ this.onChange }/></td>
        <td><DatePickerInput hideLabel={ true } name="lab_value_date" model={ model } required={ true } validate={ this.state.validate } options={ RELATIONSHIP_SAE } onChange={ this.onChange }/></td>
        <td>
          <button className="btn btn-sm btn-danger" onClick={ this.onRemove }>
            <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
          </button>
        </td>
      </tr>
    )
  }

}
