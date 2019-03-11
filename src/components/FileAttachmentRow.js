import React, { Component } from 'react'
import moment from 'moment'
import TextInput from '../inputs/TextInput'
import FileInputComponent from '../inputs/FileInputComponent'
import { FREQUENCY, ROUTE, DOSE } from '../utils/FieldOptions'

export default class FileAttachmentRow extends Component {

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
  }

  render() {
    const { index } = this.props
    const { model } = this.state;
    return (
      <tr >
        <td>{ index + 1 }</td>
        <td><FileInputComponent hideLabel={ true } name="file" validate={ this.state.validate } required={ true } model={ model } onChange={this.onChange}/></td>
        <td><TextInput hideLabel={ true } multiLine={ true } name="description" model={ model } onChange={this.onChange}/></td>
        <td>
          <button className="btn btn-sm btn-danger" onClick={ this.onRemove }>
            <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
          </button>
        </td>
      </tr>
    )
  }

}
