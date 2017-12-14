// No need to combine reducers here, done at the store.
import { combineReducers } from 'redux'
import drafts from './drafts'
import completed from './completed'
import uploaded from './uploaded'
import reportFilter from './reportFilter'
import connection from './connection'
import page from './page'
import currentReport from './currentReport'
import notification from './notification'
import uploadStatus from './uploadStatus'
import followUp from './followUp'
import token from './token'
import settings from './settings'

const pvApp = combineReducers({ drafts, completed, uploaded, reportFilter, connection, page, currentReport, notification, uploadStatus, followUp, token, settings })

export default pvApp
