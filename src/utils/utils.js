import { REPORT_TYPE_ADR, REPORT_TYPE_SAE, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_INV, REPORT_TYPE_AEFI_FOLLOW_UP, REPORT_TYPE_ADR_FOLLOW_UP } from './Constants'
import { ADR_URL, SAE_URL, AEFI_URL, SAEFI_URL } from './Constants'

import moment from 'moment'
import X2JS from 'x2js'
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

export const pad = (value) => {
  if(isNaN(value) || value === '') {
    return value
  }
  if(value && value < 10) {
    return '0' + value
  }
  return value
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


export const getXML = data => {

}

export const generateXML = (data) => {
  var reports = {}
  reports.sadr = data.filter(report => report.type == REPORT_TYPE_ADR)
  reports.adr = data.filter(report => report.type == REPORT_TYPE_SAE)
  reports.aefi = data.filter(report => report.type == REPORT_TYPE_AEFI)
  reports.saefi = data.filter(report => report.type == REPORT_TYPE_AEFI_INV)

  var x2js = new X2JS()
  var xmls = []
  var output = { response : {}}

  var sadrs = data.filter(report => report.type == REPORT_TYPE_ADR);
  if(sadrs.length > 0) {
    output.response.sadrs = sadrs
  }
  var adrs = data.filter(report => report.type == REPORT_TYPE_SAE)
  if(adrs.length > 0) {
    output.response.adrs = adrs
  }

  var aefis = data.filter(report => report.type == REPORT_TYPE_AEFI)
  if(aefis.length > 0) {
    output.response.aefis = aefis
  }

  var saefis = data.filter(report => report.type == REPORT_TYPE_AEFI_INV)
  if(saefis.length > 0) {
    output.response.saefis = saefis
  }

  const date = new Date()
  const name = date.getFullYear() + pad(date.getMonth() + 1) + pad(date.getDate()) + pad(date.getHours()) + pad(date.getMinutes()) + pad(date.getSeconds()) + ".xml"// new Date().toString().split(/ /).join('_') + '.xml'

  var sadrs = data.filter(report => report.type == REPORT_TYPE_ADR);
  var files = []
  if(sadrs.length > 0) {
    var output = { response : {}}
    output.response.sadrs = sadrs
    const string = x2js.json2xml_str(output) //xmls.join("")
    const fileData = { name : 'sadrs_' + name, data : string }
    files.push(fileData)
  }
  var adrs = data.filter(report => report.type == REPORT_TYPE_SAE)
  if(adrs.length > 0) {
    var output = { response : {}}
    output.response.adrs = adrs
    const string = x2js.json2xml_str(output) //xmls.join("")
    const fileData = { name : 'adrs_' + name, data : string }
    files.push(fileData)
  }

  var aefis = data.filter(report => report.type == REPORT_TYPE_AEFI)
  if(aefis.length > 0) {
    var output = { response : {}}
    output.response.aefis = aefis
    const string = x2js.json2xml_str(output) //xmls.join("")
    const fileData = { name : 'aefis_' + name, data : string }
    files.push(fileData)
  }

  var saefis = data.filter(report => report.type == REPORT_TYPE_AEFI_INV)
  if(saefis.length > 0) {
    var output = { response : {}}
    output.response.saefis = saefis
    const string = x2js.json2xml_str(output) //xmls.join("")
    const fileData = { name : 'saefis_' + name, data : string }
    files.push(fileData)
  }
  return files
}

export const getDateTimeFromString = (dateTime) => {
  const split = dateTime.split(" ")
  const v = split[0].split("-")

  var date = moment().year(v[2]).month(v[1] - 1).date(v[0]) //new Date(model[name]['month'] + '/' + model[name]['day'] + '/' + model[name]['year'])

  if(split.length == 2) {
    const t = split[1].split(":")
    date.hour(t[0]).minute(v[1])
  }
  return new Date(date.format())
}

export const getModelValue = (model, name)  => {
  var value = { day : "", month: "", year : "" }
  if(model && model[name]) {
    if(typeof model[name] == "string") {
      const v = model[name].split("-")
    //if(model[name][day]) {
      value['day'] = v[0] == null? "" : v[0] //model[name]['day']

    //if(model[name][month]) {
      value['month'] = v[1] == null? "" : v[1] //model[name]['month']

    //if(model[name][year]) {
      value['year'] = v[2] == null? "" : v[2] //model[name]['year']
    }
  }
  return value
}

export const getValueFromString = (value) => {
  var newValue = null
  if(typeof value == "string") {
    return getDateTimeFromString(value)
  }
  return value
}

export const getAgeonONset = (model) => {
  var value = { age_at_onset_days : "", age_at_onset_months: "", age_at_onset_years : "" }
    //if(model[name][day]) {
  value['age_at_onset_days'] = model["age_at_onset_days"] == null? "" : model["age_at_onset_days"] //model[name]['day']
    //if(model[name][month]) {
  value['age_at_onset_months'] = model["age_at_onset_months"] == null? "" : model["age_at_onset_months"] //model[name]['month']
    //if(model[name][year]) {
  value['age_at_onset_years'] = model["age_at_onset_years"] == null? "" : model["age_at_onset_years"] //model[name]['year']
  return value
}
