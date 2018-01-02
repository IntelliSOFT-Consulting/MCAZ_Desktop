import React, { Component } from 'react';
import Home from './pages/Home'

import { Provider } from 'react-redux'
import pvStore from './store'

import { PersistGate } from 'redux-persist/lib/integration/react'

const { store, persistor} = pvStore({})

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <PersistGate persistor={ persistor } store={ store } >
          <Home />
        </PersistGate>
      </Provider>
    )
  }
}

export default App
