import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer, {
  initialState as reducerInitialState
} from 'redux/reducers/Reducer'

function render(
  ui,
  {
    inputState,
    initialState = { ...reducerInitialState, inputState },
    store = createStore(reducer, initialState),
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
