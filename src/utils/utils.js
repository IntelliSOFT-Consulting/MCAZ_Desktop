import { REPORT_TYPE_ADR, REPORT_TYPE_SAE, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_INV, REPORT_TYPE_AEFI_FOLLOW_UP, REPORT_TYPE_ADR_FOLLOW_UP } from './Constants'
import { ADR_URL, SAE_URL, AEFI_URL, SAEFI_URL } from './Constants'
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
  return data
  /*
  if(data.type == REPORT_TYPE_ADR) {
    var payload = {}
    payload.sadr = data
    return payload
  } else if(data.type == REPORT_TYPE_SAE) {
    var payload = {}
    payload.adr = data
    return payload
  } else if(data.type == REPORT_TYPE_AEFI) {
    var payload = {}
    payload.aefi = data
    return payload
  } else if(data.type == REPORT_TYPE_AEFI_INV) {
    var payload = {}
    payload.saefi = data
    return payload
  }*/
}

export const getURL = (data) => {
  if(data.type == REPORT_TYPE_ADR) {
    return ADR_URL
  } else if(data.type == REPORT_TYPE_SAE) {
    return SAE_URL
  } else if(data.type == REPORT_TYPE_AEFI) {
    return AEFI_URL
  } else if(data.type == REPORT_TYPE_AEFI_INV) {
    return SAEFI_URL
  } else if(data.type == REPORT_TYPE_ADR_FOLLOW_UP) {
    return ADR_URL + "/followup/" + btoa(data.parent_reference)
  } else if(data.type == REPORT_TYPE_AEFI_FOLLOW_UP) {
    return AEFI_URL + "/followup/" + btoa(data.parent_reference)
  }
}
