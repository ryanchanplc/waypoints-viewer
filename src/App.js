import React from 'react'
import { Provider } from 'react-redux'
import Loading from 'component/Loading/Loading'
import { store, persistor } from 'configureStore'
import { PersistGate } from 'redux-persist/integration/react'
import { createGlobalStyle } from 'styled-components'
import WaypointView from 'component/WaypointView'

const GlobalStyles = createGlobalStyle`
html {
  --color-brand:#f16722;
  --color-secondary:white;
  --color-primary: var(--color-brand) ;
}
html, body, #root {
  height: 100%;
}
`

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <GlobalStyles />
        <WaypointView />
      </PersistGate>
    </Provider>
  )
}

export default App
