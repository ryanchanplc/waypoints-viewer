import React from 'react'
import { render, fireEvent, act } from 'utils/TestUtils'
import WaypointViewer from 'component/WaypointView'
import userEvent from '@testing-library/user-event'

jest.mock('component/Map', () => () => <div />)
test('should show loading', async () => {
  const { getByLabelText, getByText } = render(<WaypointViewer />, {})
  const startInput = getByLabelText('Start Location')
  const endInput = getByLabelText('End Location')

  fireEvent.change(startInput, { target: { value: 'Hong Kong' } })
  fireEvent.change(endInput, { target: { value: 'Shen Zhen' } })

  const submitBut = getByText('Submit')

  await act(async () => {
    userEvent.click(submitBut)
  })

  expect(getByText('Loading...')).toBeInTheDocument()
})
