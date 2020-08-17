import React from 'react'
import { render as rtlRender, cleanup } from '@testing-library/react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import reducer, { initialState as reducerInitialState } from 'reducers/Reducer'

afterEach(() => {
  cleanup()
})

function render(
  ui,
  {
    inputState,
    initialState = { ...reducerInitialState, inputState },
    store = createStore(reducer, initialState, applyMiddleware(thunk)),
    ...renderOptions
  } = {}
) {
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'

export { render }
