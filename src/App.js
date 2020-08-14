import React from 'react'
import './App.css'
import WaypointPage from 'page/WaypointPage'
import { Provider } from 'react-redux'
import { store, persistor } from 'redux/Store'
import { PersistGate } from 'redux-persist/integration/react'
import { createGlobalStyle } from 'styled-components'
import Loading from 'component/Loading'

const GlobalStyles = createGlobalStyle`
html {
  --color-brand:#f16722;
  --color-secondary:white;
  --color-primary: var(--color-brand) ;
}
`

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <GlobalStyles />
        <WaypointPage />
      </PersistGate>
    </Provider>
  )
}

export default App
