// No need to combine reducers here, done at the store.
import { combineReducers } from 'redux'
import drafts from './drafts'
import completed from './completed'
import uploaded from './uploaded'
import reportFilter from './reportFilter'
import connection from './connection'
import page from './page'
import currentReport from './currentReport'

const pvApp = combineReducers({ drafts, completed, uploaded, reportFilter, connection, page, currentReport })

export default pvApp
