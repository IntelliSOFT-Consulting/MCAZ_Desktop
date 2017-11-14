import { createStore, compose, applyMiddleware } from 'redux'
import {
  persistStore,
  persistCombineReducers, autoRehydrate
} from 'redux-persist'
import storage from 'redux-persist/es/storage'
import appState from '../reducers'
import thunk from 'redux-thunk'
import createElectronStorage from "redux-persist-electron-storage"

const config = {
  key: 'root',
  storage: createElectronStorage(),
  debug: true
};

const reducers = persistCombineReducers(config, {
  appState
});

const pvStore = (state) => {
  const store = createStore(reducers, state, applyMiddleware(thunk))
  const persistor = persistStore(store);

  return { persistor, store };
}

export default pvStore
