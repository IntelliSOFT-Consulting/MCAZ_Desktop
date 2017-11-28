import { REPORT_TYPE_ADR, REPORT_TYPE_SAE, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_INV } from './Constants'
/**
  Validator for Date of Birth
  If the year only is selected, return true.
  If all the values are selected, return true.
  Else return false
*/
export const dateOfBirthValidator = (value) => {
  if(value['day'] == "" && value['month'] == "" && value['year'] != "") {
    return true
  }
  if(value['day'] != "" && value['month'] != "" && value['year'] != "") {
    return true
  }
  return false
}

/**
  Validator for End of onset date
*/
export const endOfOnsetValidator = () => {

}

/**
  validator for sub questions.
  first it will check if the question is visible, then it will validate it if it is visible.
*/
export const subQuestionsValidator = (name, dependent, model) => {
  if(!dependent) {
    console.warn("dependent attribute must be provided, either an array or object")
    return
  }
  // First check if the subquestion should be visible.
  var visible = false
  const checkVisibility = (field, model) => {
    return model[field.name] == field.value
  }
  if(Array.isArray(dependent)) {
    dependent.forEach((field) => {
      visible = !visible? checkVisibility(field, model) : visible
    })
  } else if(typeof dependent == "object") {
    visible = checkVisibility(dependent, model)
  }
  if(visible) {
    if(model[name] == null || model[name] === "") {
      return false
    }
  }
  return true
}

export const getRequestPayload  = (data) => {
  if(data.type == REPORT_TYPE_ADR) {
    var payload = {}
    payload.sadr = data
    return payload
  } else if(data.type == REPORT_TYPE_SAE) {
    var payload = {}
    payload.adr = data
    return payload
  }
}
