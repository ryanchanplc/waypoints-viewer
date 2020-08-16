import React from 'react'
import { render, fireEvent, act } from 'test/test-utils'
import WaypointViewer from 'page/WaypointViewer'
import userEvent from '@testing-library/user-event'

test('should show loading', async () => {
  const { getByLabelText, getByText } = render(<WaypointViewer />, {})
  const startInput = getByLabelText('start')
  const endInput = getByLabelText('end')

  fireEvent.change(startInput, { target: { value: 'Hong Kong' } })
  fireEvent.change(endInput, { target: { value: 'Shen Zhen' } })

  const submitBut = getByText('Submit')

  await act(async () => {
    userEvent.click(submitBut)
  })

  expect(getByText('Loading...')).toBeInTheDocument()
})
