import React, { Component } from 'react'

export default class SingleMultipleInput extends Component {
  render() {
    const { label, name, options, multiple, required, inline } = this.props
    var type = multiple? "checkbox" : "radio";

    const inlineClass = inline? type + '-inline' : ''
    var optionList = null
    if(options != null) {
      optionList = options.map((option, index) => {
        var label, value;
        if(typeof option == "string") {
          label = option;
          value = option;
        } else {
          label = option.name;
          value = option.value;
        }
        if(inline) {
          return (
            <label className={ inlineClass } key={ index }>
              <input type={ type } value={ value } name={ name }/> { label }
            </label>
          )
        }
        return (
          <div className={ type } key={ index }>
            <label className={ inlineClass }>
              <input type={ type } value={ value } name={ name }/> { label }
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

    return (
      <div className="form-group">
        <label className="col-md-4 control-label form-input-label">{ label } { reqSpan }</label>
        <div className="col-md-6">
          { optionList }
        </div>
      </div>
    )
  }
}
