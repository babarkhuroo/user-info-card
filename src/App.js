import React from 'react'
import Info from './components/Info'

import { createStore } from 'redux'
import reducer from './reducer'
import { Provider } from 'react-redux'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function App() {
  return (
    <Provider store={store}>
      <Info />
    </Provider>
  )
}

export default App
