import React from 'react'
import { render, fireEvent, screen, act } from 'utils/TestUtils'

import userEvent from '@testing-library/user-event'
import SearchForm from './SearchForm'

describe('form basic function', () => {
  const setUp = (inputState = {}) => {
    return render(
      <SearchForm googleMap={{ mapInstance: null, mapApi: null }} />,
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
    const startInput = getByLabelText('Start Location')
    const endInput = getByLabelText('End Location')
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

  test('should validate on submit empty both input', async () => {
    const { getByText } = setUp()
    const submitBut = getByText('Submit')

    await act(async () => userEvent.click(submitBut))

    expect(screen.getByText('Start Location is required.')).toBeInTheDocument()
    expect(screen.getByText('End Location is required.')).toBeInTheDocument()
  })

  test('should validate on submit empty end input', async () => {
    const { getByText, getByLabelText } = setUp()
    const startInput = getByLabelText('Start Location')
    fireEvent.change(startInput, { target: { value: 'Hong Kong' } })
    expect(startInput.value).toBe('Hong Kong')

    const submitBut = getByText('Submit')

    await act(async () => userEvent.click(submitBut))

    expect(screen.getByText('End Location is required.')).toBeInTheDocument()
  })

  test('should validate on submit empty start input', async () => {
    const { getByText, getByLabelText } = setUp()
    const endInput = getByLabelText('End Location')

    fireEvent.change(endInput, { target: { value: 'Hong Kong' } })

    expect(endInput.value).toBe('Hong Kong')
    const submitBut = getByText('Submit')
    await act(async () => userEvent.click(submitBut))
    expect(screen.getByText('Start Location is required.')).toBeInTheDocument()
  })

  test('should exchange inputs', async () => {
    const { getByLabelText } = setUp()
    const startInput = getByLabelText('Start Location')
    const endInput = getByLabelText('End Location')

    fireEvent.change(startInput, { target: { value: 'Hong Kong' } })
    fireEvent.change(endInput, { target: { value: 'Shen Zhen' } })

    const reverseBut = getByLabelText('reverse')
    await act(async () => userEvent.click(reverseBut))

    expect(startInput.value).toBe('Shen Zhen')
    expect(endInput.value).toBe('Hong Kong')
  })
})
