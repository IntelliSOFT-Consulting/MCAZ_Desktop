import { SAVE_DRAFT_REPORT, REMOVE_DRAFT_REPORT, SAVE_COMPLETED_REPORT, REMOVE_COMPLETED_REPORT,
 SAVE_UPLOADED_REPORT, REMOVE_UPLOADED_REPORT, SET_REPORT_FILTER, CHANGE_CONNECTION_STATUS, SHOW_PAGE,
 SET_REPORT }  from './actionTypes'

import { MAIN_URL } from '../utils/Constants'

const { ipcRenderer } = require('electron')
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
/**
  The upload action.
  Here we send a message to the main process and wait for the response.
*/
export const uploadData = (data, url) => {

  return dispatch => {
    var req = {}
    req.body = data
    req.url = url
    dispatch(saveCompleted(data))
    dispatch(removeDraft(data))
    ipcRenderer.send('upload-data', JSON.stringify(req))

    ipcRenderer.on('upload-reply', (event, arg) => {
      //dispatch(showPage('MAIN_PAGE'))
      //dispatch(saveUploaded(data))
      //dispatch(removeDraft(data))
      //dispatch(removeCompleted(data))
      console.log(arg) // prints "pong"
    })
  }
}

export const uploadCompletedReports = (data) => {
  ipcRenderer.send('upload-data', 'ping')
}

export const showPage = (page) => (
  { type : SHOW_PAGE, page }
)
