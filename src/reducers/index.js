// No need to combine reducers here, done at the store.
import { combineReducers } from 'redux'
import drafts from './drafts'
import completed from './completed'
import uploaded from './uploaded'
import reportFilter from './reportFilter'
import connection from './connection'
import page from './page'

const pvApp = combineReducers({ drafts, completed, uploaded, reportFilter, connection, page })

export default pvApp