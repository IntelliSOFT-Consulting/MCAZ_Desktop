import { SAVE_DRAFT_REPORT, REMOVE_DRAFT_REPORT, SAVE_COMPLETED_REPORT, REMOVE_COMPLETED_REPORT,
 SAVE_UPLOADED_REPORT, REMOVE_UPLOADED_REPORT, SET_REPORT_FILTER, CHANGE_CONNECTION_STATUS, SHOW_PAGE,
 SET_REPORT, SET_NOTIFICATION, RESET_UPLOAD_STATUS, UPDATE_UPLOAD_STATUS, SET_FOLLOW_UP, LOGGED_IN, LOGOUT }  from './actionTypes'

import { getRequestPayload, getURL } from '../utils/utils'
import messages from '../utils/messages.json'

import { MAIN_URL, LOGIN_URL, SIGNUP_URL, MAIN_PAGE } from '../utils/Constants'

const { ipcRenderer } = require('electron')
import fetch from 'isomorphic-fetch'
/**
  Saves a draft report
*/
export const saveDraft = (data) => (
  { type : SAVE_DRAFT_REPORT, data }
)

export const removeDraft = (data) => (
  { type : REMOVE_DRAFT_REPORT, data }
)

export const saveCompleted = (data) => (
  { type : SAVE_COMPLETED_REPORT, data }
)

export const removeCompleted = (data) => (
  { type : REMOVE_COMPLETED_REPORT, data }
)

export const saveUploaded = (data) => (
  { type : SAVE_UPLOADED_REPORT, data }
)

export const removeUploaded = (data) => (
  { type : REMOVE_UPLOADED_REPORT, data }
)

export const setReportFilter = (filter) => (
  { type : SET_REPORT_FILTER, filter }
)

export const changeConnection = (isConnected) => (
  { type : CHANGE_CONNECTION_STATUS,  isConnected }
)

export const setReport = (model) => (
  { type : SET_REPORT, model }
)

export const uploadData = (data, url, token, updateProgress) => {
  return dispatch => {
    dispatch(saveCompleted(data))
    dispatch(removeDraft(data))
    const rid = data.rid
    const type = data.type
    return fetch(url, {
      method : "POST",
      headers: {
        "Accept" : "application/json",
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + token
      },
      body: JSON.stringify(getRequestPayload(data))
    }).then(response => response.json()).then((json) => {
      if(json.sadr) {
        json.sadr.rid = rid
        json.sadr.type = REPORT_TYPE_ADR
        dispatch(saveUploaded(json.sadr))
        dispatch(removeCompleted(json.sadr))
      } else if(json.adr) {
        json.adr.rid = rid
        json.adr.type = REPORT_TYPE_SAE
        dispatch(saveUploaded(json.adr))
        dispatch(removeCompleted(json.adr))
      } else if(json.aefi) {
        json.aefi.rid = rid
        json.aefi.type = REPORT_TYPE_AEFI
        dispatch(saveUploaded(json.aefi))
        dispatch(removeCompleted(json.aefi))
      } else if(json.saefi) {
        //json.saefi.id = json.id
        json.saefi.rid = rid
        json.saefi.type = REPORT_TYPE_AEFI_INV
        dispatch(saveUploaded(json.saefi))
        dispatch(removeCompleted(json.saefi))
      } else {
        console.log(JSON.stringify(json))
        return
      }
      if(updateProgress) {
        dispatch(updateUploadStatus())
      } else {
        dispatch(setNotification({ message : messages.datauploaded, level: "info", id: new Date().getTime() }))
      }

    }).catch((error) => {
      if(updateProgress) {
        dispatch(updateUploadStatus())
      } else {
        dispatch(setNotification({ message : messages.erroruploading, level: "info", id: new Date().getTime() }))
      }
      dispatch(setNotification({ message : messages.request_error, level: "error", id: new Date().getTime() }))
    })
  }
}

export const loggedIn = (token) => (
  { type : LOGGED_IN, token }
)

export const logout = (token) => (
  { type : LOGOUT }
)

export const login = (data) => {
  return dispatch => {
    return fetch(LOGIN_URL, {
      method : "POST",
      headers: { "Accept" : "application/json", 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()).then((json) => {
      console.log(json)
      if(json.success) {
        dispatch(loggedIn(json.data.token))
        //dispatch(showPage(MAIN_PAGE))
      } else {
        dispatch(setNotification({ message : messages.login_error, level: "error", id: new Date().getTime() }))
      }
    }).catch((error) => {
      dispatch(setNotification({ message : messages.request_error, level: "error", id: new Date().getTime() }))
    })
  }
}

export const signUp = (data) => {
  return dispatch => {
    return fetch(SIGNUP_URL, {
      method : "POST",
      headers: { "Accept" : "application/json", 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()).then((json) => {
      if(json.token) {
        dispatch(loggedIn(json.token))
        //dispatch(showPage(MAIN_PAGE))
      } else {
        dispatch(setNotification({ message : messages.signup_error, level: "error", id: new Date().getTime() }))
      }
    }).catch((error) => {
      dispatch(setNotification({ message : messages.request_error, level: "error", id: new Date().getTime() }))
    })
  }
}

/**
  The upload action.
  Here we send a message to the main process and wait for the response.
*
export const uploadData = (data, url, updateProgress) => {

  return dispatch => {
    var req = {}
    req.body = getRequestPayload(data)
    req.url = url
    dispatch(saveCompleted(data))
    dispatch(removeDraft(data))
    ipcRenderer.send('upload-data', JSON.stringify(req))

    ipcRenderer.on('upload-reply', (event, arg, updateProgress) => {
      //dispatch(showPage('MAIN_PAGE'))
      //dispatch(saveUploaded(data))
      //dispatch(removeDraft(data))
      //dispatch(removeCompleted(data))
      console.log(arg) // prints "pong"
      try {
        const response = JSON.parse(arg)
        if(response.sadr) {
          //response.sadr.id = response.sadr.id
          dispatch(saveUploaded(response.sadr))
          dispatch(removeCompleted(response.sadr))
        } else if(response.adr) {
          //response.adr.id = response.adr.id
          dispatch(saveUploaded(response.adr))
          dispatch(removeCompleted(response.adr))

        } else if(response.aefi) {
          //response.aefi.aefi.id = response.aefi.id
          dispatch(saveUploaded(response.aefi))
          dispatch(removeCompleted(response.aefi))

        } else if(response.saefi) {
          //response.saefi.id = response.saefi.id
          dispatch(saveUploaded(response.saefi))
          dispatch(removeCompleted(response.saefi))

        } else {
          console.log(JSON.stringify(json))
          return
        }
        dispatch(updateUploadStatus())
        if(updateProgress) {
          dispatch(updateUploadStatus())
        } else {
          dispatch(setNotification({ message : messages.datauploaded, level: "info", id: new Date().getTime() }))
        }
      } catch(e) {
        dispatch(setNotification({ message : messages.uploaderror, level: "error", id: new Date().getTime() }))
      }
      ipcRenderer.removeAllListeners("upload-reply")
    })
  }
}*/

export const showPage = (page) => (
  { type : SHOW_PAGE, page }
)

export const setFollowUp = (followUp) => (
  { type : SET_FOLLOW_UP, followUp }
)

export const setNotification = (notification) => (
  { type : SET_NOTIFICATION, notification }
)

export const resetUploadStatus = (uploaded) => (
  { type : RESET_UPLOAD_STATUS, uploaded }
)

export const updateUploadStatus = () => (
  { type : UPDATE_UPLOAD_STATUS }
)

export const uploadCompletedReports = (completed, token) => {
  return dispatch => {
    dispatch(resetUploadStatus(completed.length))
    completed.forEach((data) => {
      dispatch(uploadData(data, getURL(data), token, true))
    })
  }
}
