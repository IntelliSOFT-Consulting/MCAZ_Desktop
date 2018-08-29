import { SAVE_DRAFT_REPORT, REMOVE_DRAFT_REPORT, SAVE_COMPLETED_REPORT, REMOVE_COMPLETED_REPORT, SET_SETTING, CLEAR_DATA, SET_NEWS, REMOVE_COMPLETED_REPORTS,
 SAVE_UPLOADED_REPORT, REMOVE_UPLOADED_REPORT, SET_REPORT_FILTER, CHANGE_CONNECTION_STATUS, SHOW_PAGE, SAVE_FETCHED_REPORTS, ARCHIVE_DATA,
 SET_REPORT, SET_NOTIFICATION, RESET_UPLOAD_STATUS, UPDATE_UPLOAD_STATUS, SET_FOLLOW_UP, LOGGED_IN, LOGOUT, PRINT, CONTACT_US }  from './actionTypes'

import { getRequestPayload, getURL } from '../utils/utils'
import messages from '../utils/messages.json'

import { MAIN_URL, LOGIN_URL, SIGNUP_URL, MAIN_PAGE, RESET_PASSWORD_URL } from '../utils/Constants'

import { ADR_URL, SAE_URL, AEFI_URL, SAEFI_URL, CONTACT_US_URL, NEWS_URL } from '../utils/Constants'
import { REPORT_TYPE_ADR, REPORT_TYPE_SAE, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_INV } from '../utils/Constants'

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

export const removeCompletedReports = () => (
  { type : REMOVE_COMPLETED_REPORTS }
)

export const saveUploaded = (data) => (
  { type : SAVE_UPLOADED_REPORT, data }
)

export const saveFetchedReports = (data) => (
  { type : SAVE_FETCHED_REPORTS, data }
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

/**
  Sends the request to upload a report to the server.
*/
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
        json.saefi.rid = rid
        json.saefi.type = REPORT_TYPE_AEFI_INV
        dispatch(saveUploaded(json.saefi))
        dispatch(removeCompleted(json.saefi))
      } else if(json.followup) {
        dispatch(saveUploaded(json.followup))
        dispatch(removeCompleted(json.followup))
      } else {
        if(json.message != null) {
          dispatch(setNotification({ message : json.message, level: "info", id: new Date().getTime() }))
        } else {
          dispatch(setNotification({ message : messages.erroruploading, level: "info", id: new Date().getTime() }))
        }
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

export const loggedIn = (user) => (
  { type : LOGGED_IN, user }
)

export const logout = () => (
  { type : LOGOUT }
)

/**
  Sends the request to login a new user and get authentication token to be used in subsequent requests.
*/
export const login = (data) => {
  return (dispatch, getState) => {
    return fetch(LOGIN_URL, {
      method : "POST",
      headers: { "Accept" : "application/json", 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()).then((json) => {
      if(json.success) {
        const user = Object.assign({}, json.user, { token : json.data.token})
        const state = getState()
        if(state.appState.user.username != null && state.appState.user.username != user.username) {
          dispatch(clearData())
        }
        dispatch(loggedIn(user))
        dispatch(fetchAllReports(ADR_URL, json.data.token))
        dispatch(fetchAllReports(SAE_URL, json.data.token))
        dispatch(fetchAllReports(AEFI_URL, json.data.token))
        dispatch(fetchAllReports(SAEFI_URL, json.data.token))
      } else {
        dispatch(setNotification({ message : messages.login_error, level: "error", id: new Date().getTime() }))
      }
    }).catch((error) => {
      dispatch(setNotification({ message : messages.request_error, level: "error", id: new Date().getTime() }))
    })
  }
}

export const resetPassword = (email) => {
  return (dispatch, getState) => {
    return fetch(RESET_PASSWORD_URL, {
      method : "POST",
      headers: { "Accept" : "application/json", 'Content-Type': 'application/json' },
      body: JSON.stringify({ email : email })
    }).then((res) => {
      dispatch(setNotification({ message : messages.passwordReset, level: "info", id: new Date().getTime() }))
    }).catch((error) => {
      dispatch(setNotification({ message : messages.request_error, level: "error", id: new Date().getTime() }))
    })
  }
}

export const clearData = () => (
  { type : CLEAR_DATA }
)

/**
  Sends the request to sign up a new user.
*/
export const signUp = (data) => {
  return dispatch => {
    return fetch(SIGNUP_URL, {
      method : "POST",
      headers: { "Accept" : "application/json", 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()).then((json) => {
      if(json.token) {
        //const user = Object.assign({}, data, { token : json.token})
        const user = Object.assign({}, json.user, { token : json.token})
        dispatch(loggedIn(user))
      } else {
        dispatch(setNotification({ message : messages.signup_error, level: "error", id: new Date().getTime() }))
      }
    }).catch((error) => {
      dispatch(setNotification({ message : messages.request_error, level: "error", id: new Date().getTime() }))
    })
  }
}

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

export const archiveData = (data) => (
  { type : ARCHIVE_DATA, data }
)

/**
  This function goes through all the completed reports, dispatching an action to upload them.
*/
export const uploadCompletedReports = (completed, token) => {
  return dispatch => {
    dispatch(resetUploadStatus(completed.length))
    completed.forEach((data) => {
      dispatch(uploadData(data, getURL(data), token, true))
    })
  }
}

/**
  Fetches one report given the id.
*/
export const fetchReport = (id, url, token) => {
  return dispatch => {
    return fetch(url + "/" + id, {
      method : "GET",
      headers: {
        "Accept" : "application/json",
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    }).then(response => response.json()).then((json) => {
      if(json.sadr) {
        json.sadr.type = REPORT_TYPE_ADR
        dispatch(setReport(json.sadr))
        dispatch(showPage('READ_ONLY_PAGE'))
      } else if(json.adr) {
        json.adr.type = REPORT_TYPE_SAE
        dispatch(setReport(json.adr))
        dispatch(showPage('READ_ONLY_PAGE'))
      } else if(json.aefi) {
        json.aefi.type = REPORT_TYPE_AEFI
        dispatch(setReport(json.aefi))
        dispatch(showPage('READ_ONLY_PAGE'))
      } else if(json.saefi) {
        json.saefi.type = REPORT_TYPE_AEFI_INV
        dispatch(setReport(json.saefi))
        dispatch(showPage('READ_ONLY_PAGE'))
      } else {
        dispatch(setNotification({ message : messages.report_not_found, level: "error", id: new Date().getTime() }))
        return
      }
    }).catch((error) => {
      dispatch(setNotification({ message : messages.request_error, level: "error", id: new Date().getTime() }))
    })
  }
}

/**
  fetches all the reports from the server and saves them.
  Done after login.
*/
export const fetchAllReports = (url, token) => {
  return dispatch => {
    return fetch(url, {
      method : "GET",
      headers: {
        "Accept" : "application/json",
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    }).then(response => response.json()).then((json) => {
      const getReports = (reports, type) => {
        return reports.map((r) => {
          r.type = type
          return r
        })
      }
      if(json.sadrs) {
        dispatch(saveFetchedReports(getReports(json.sadrs, REPORT_TYPE_ADR)))
      } else if(json.adrs) {
        dispatch(saveFetchedReports(getReports(json.adrs, REPORT_TYPE_SAE)))
      } else if(json.aefis) {
        dispatch(saveFetchedReports(getReports(json.aefis, REPORT_TYPE_AEFI)))
      } else if(json.saefis) {
        dispatch(saveFetchedReports(getReports(json.saefis, REPORT_TYPE_AEFI_INV)))
      } else {
        return
      }
    }).catch((error) => {
      dispatch(setNotification({ message : messages.request_error, level: "error", id: new Date().getTime() }))
    })
  }
}

/**
  Sends an asynchronous message to the main process to get the device informatino.
*/
export const fetchDeviceInfo = () => {
  return dispatch => {
    ipcRenderer.send('get-info')

    ipcRenderer.on('get-info-reply', (event, arg, updateProgress) => {
      dispatch(setSetting(JSON.parse(arg)))
      ipcRenderer.removeAllListeners("get-info-reply")
    })
  }
}

export const setSetting = (setting) => (
  { type : SET_SETTING, setting }
)

export const downloadPDF = (data) => (
  { type : PRINT, data }
)

/**
  Sends an asynchronous message to the main process to print to pdf the current visible page.
*/
export const printPDF = () => {
  return dispatch => {
    ipcRenderer.send('print')

    ipcRenderer.on('printed', (event, arg) => {
      dispatch(downloadPDF(arg))
      ipcRenderer.removeAllListeners("printed")
    })

  }
}

/**
  Action to send contact us information.
*/
export const contactUs = (data) => {
  return dispatch => {
    return fetch(CONTACT_US_URL, {
      method : "POST",
      headers: { "Accept" : "application/json", 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()).then((json) => {

    }).catch((error) => {
      dispatch(setNotification({ message : messages.error_sending_message, level: "error", id: new Date().getTime() }))
    })
  }
}

/**
  Action to fetch the news
*/
export const fetchNews = () => {
  return dispatch => {
    return fetch(NEWS_URL, {
      method : "GET",
      headers: { "Accept" : "application/json", 'Content-Type': 'application/json' }
    }).then(res => res.json()).then((json) => {
      dispatch(setNews(json))
    }).catch((error) => {
      dispatch(setNotification({ title: "error", message : messages.error_fetching_news, level: "error", id: new Date().getTime() }))
    })
  }
}

export const setNews = (news) => (
  { type : SET_NEWS, news }
)

/**
  Action to fetch static data.
*/
export const fetchStaticData = (data) => {
  return dispatch => {
    return fetch(CONTACT_US_URL, {
      method : "POST",
      headers: { "Accept" : "application/json", 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()).then((json) => {

    }).catch((error) => {
      dispatch(setNotification({ message : messages.error_sending_message, level: "error", id: new Date().getTime() }))
    })
  }
}

export const saveFile = (data) => {
  return dispatch => {
    ipcRenderer.send('save-file', JSON.stringify(data))

    ipcRenderer.on('saved-file', (event, arg) => {
      const resp = JSON.parse(arg)
      if(resp.status == "OK") {
        const saved = resp.saved.join("\n")
        dispatch(setNotification({ title: "File saved ", message : saved, level: "info", id: new Date().getTime(), dismissible: true }))
      }
      ipcRenderer.removeAllListeners("saved-file")
    })

  }
}
