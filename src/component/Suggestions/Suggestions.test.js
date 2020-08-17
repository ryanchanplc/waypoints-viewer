import React from 'react'
import { render } from 'utils/TestUtils'

import userEvent from '@testing-library/user-event'
import Suggestions from './Suggestions'

const onLocationSelected = jest.fn()
const setUp = (inputState = {}) =>
  render(<Suggestions onLocationSelected={onLocationSelected} />, inputState)

test('shoud render recent places', () => {
  const { getByText } = setUp({ initialState: { recent: ['ABC', 'DEF'] } })
  expect(getByText('ABC')).toBeInTheDocument()
  expect(getByText('DEF')).toBeInTheDocument()
})

test('shoud render current location', () => {
  const { getByText } = setUp()
  expect(getByText('Use Current Location')).toBeInTheDocument()
})

test('should handle on select location', async () => {
  const { getByText } = setUp({ initialState: { recent: ['ABC'] } })
  const place = getByText('ABC')
  expect(place).toBeInTheDocument()
  userEvent.click(place)
  expect(onLocationSelected).toBeCalled()
})

test('should handle on select current location', async () => {
  const { getByText } = setUp()
  const currentLocation = getByText('Use Current Location')
  expect(currentLocation).toBeInTheDocument()
  userEvent.click(currentLocation)
  expect(onLocationSelected).toBeCalled()
})
