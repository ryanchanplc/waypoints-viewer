import React from 'react'
import './App.css'
import WaypointPage from 'page/WaypointPage'
import { Provider } from 'react-redux'
import store from 'redux/Store'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
html {
  --color-secondary: #f16722;
  --color-primary: white;
}
`

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <WaypointPage />
    </Provider>
  )
}

export default App
