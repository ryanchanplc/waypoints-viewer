import React from 'react'
import { render, fireEvent, screen, act } from 'test/test-utils'

import userEvent from '@testing-library/user-event'
import SearchPanel from './SearchPanel'

describe('Search fomr base function', () => {
  const setUp = (inputState = {}) => {
    return render(
      <SearchPanel googleMap={{ mapInstance: null, mapApi: null }} />,
      inputState
    )
  }

  test('shoud render buttons', () => {
    const { getByText } = setUp()

    expect(getByText('Submit')).toBeInTheDocument()
    expect(getByText('Reset')).toBeInTheDocument()
  })

  test('shoud clear text inputs by reset button', () => {
    const { getByText, getByLabelText } = setUp()
    const startInput = getByLabelText('start')
    const endInput = getByLabelText('end')
    const resetButton = getByText('Reset')

    expect(startInput.value).toBe('')
    expect(endInput.value).toBe('')

    fireEvent.change(startInput, { target: { value: 'Hong Kong' } })
    fireEvent.change(endInput, { target: { value: 'Shen Zhen' } })

    expect(startInput.value).toBe('Hong Kong')
    expect(endInput.value).toBe('Shen Zhen')

    userEvent.click(resetButton)

    expect(startInput.value).toBe('')
    expect(endInput.value).toBe('')
  })

  test('should print message', () => {
    setUp({ initialState: { errorMessage: 'Error message' } })

    expect(screen.getByText('Error message')).toBeInTheDocument()
  })
  test('should print distance and time', () => {
    const time = 1000
    const distance = 2000
    setUp({ initialState: { totalTime: time, totalDistance: distance } })

    const expectedTime = `Time : ${time}`
    const expectedDistance = `Distance: ${distance}`

    expect(screen.getByText(expectedTime)).toBeInTheDocument()
    expect(screen.getByText(expectedDistance)).toBeInTheDocument()
  })
  test('submit empty both input', async () => {
    const { getByText } = setUp()
    const submitBut = getByText('Submit')

    await act(async () => userEvent.click(submitBut))

    expect(screen.getByText('Start Location is required.')).toBeInTheDocument()
    expect(screen.getByText('End Location is required.')).toBeInTheDocument()
  })
  test('submit empty end input', async () => {
    const { getByText, getByLabelText } = setUp()
    const startInput = getByLabelText('start')
    fireEvent.change(startInput, { target: { value: 'Hong Kong' } })
    expect(startInput.value).toBe('Hong Kong')

    const submitBut = getByText('Submit')

    await act(async () => userEvent.click(submitBut))

    expect(screen.getByText('End Location is required.')).toBeInTheDocument()
  })
  test('submit empty start input', async () => {
    const { getByText, getByLabelText } = setUp()
    const endInput = getByLabelText('end')

    fireEvent.change(endInput, { target: { value: 'Hong Kong' } })

    expect(endInput.value).toBe('Hong Kong')
    const submitBut = getByText('Submit')
    await act(async () => userEvent.click(submitBut))
    expect(screen.getByText('Start Location is required.')).toBeInTheDocument()
  })

  test('should exchange', async () => {
    const { getByLabelText } = setUp()
    const startInput = getByLabelText('start')
    const endInput = getByLabelText('end')

    fireEvent.change(startInput, { target: { value: 'Hong Kong' } })
    fireEvent.change(endInput, { target: { value: 'Shen Zhen' } })

    const reverseBut = getByLabelText('reverse')
    await act(async () => userEvent.click(reverseBut))

    expect(startInput.value).toBe('Shen Zhen')
    expect(endInput.value).toBe('Hong Kong')
  })
})
