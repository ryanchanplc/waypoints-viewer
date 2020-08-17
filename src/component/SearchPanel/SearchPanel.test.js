import React from 'react'
import { render, screen } from 'utils/TestUtils'
import SearchPanel from './SearchPanel'

test('should print distance and time', () => {
  const time = 1000
  const distance = 2000
  render(<SearchPanel />, {
    initialState: { totalTime: time, totalDistance: distance }
  })

  const expectedTime = `Time : ${time}`
  const expectedDistance = `Distance: ${distance}`

  expect(screen.getByText(expectedTime)).toBeInTheDocument()
  expect(screen.getByText(expectedDistance)).toBeInTheDocument()
})

test('should print message', () => {
  render(<SearchPanel />, { initialState: { errorMessage: 'Error message' } })

  expect(screen.getByText('Error message')).toBeInTheDocument()
})
