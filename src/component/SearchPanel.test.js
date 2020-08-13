import React from 'react'
import { render, fireEvent, screen } from 'test/test-utils'
import userEvent from '@testing-library/user-event'
import SearchPanel from './SearchPanel'

const setUp = (inputState = {}) => {
  return render(
    <SearchPanel googleMap={{ mapInstance: null, mapApi: null }} />,
    inputState
  )
}

test('should render input label text correctly', () => {
  const { getByText } = setUp()
  expect(getByText('Start Location')).toBeInTheDocument()
  expect(getByText('End Location')).toBeInTheDocument()
})

test('should focus input while clicking label', () => {
  const { getByText, getByLabelText } = setUp()
  userEvent.click(getByText('Start Location'))
  expect(getByLabelText('Start Location')).toHaveFocus()
  userEvent.click(getByText('End Location'))
  expect(getByLabelText('End Location')).toHaveFocus()
})

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

test('shoud clear text inputs on focus input', () => {
  const { getByLabelText } = setUp()
  const startInput = getByLabelText('Start Location')
  const endInput = getByLabelText('End Location')
  fireEvent.change(startInput, { target: { value: 'Hong Kong' } })
  fireEvent.change(endInput, { target: { value: 'Shen Zhen' } })
  expect(startInput.value).toBe('Hong Kong')
  expect(endInput.value).toBe('Shen Zhen')

  startInput.focus()
  expect(startInput).toHaveFocus()
  expect(startInput.value).toBe('')

  endInput.focus()
  expect(endInput).toHaveFocus()
  expect(endInput.value).toBe('')
})

test('should print message', () => {
  setUp({ initialState: { message: 'Error message' } })

  expect(screen.getByText('Error message')).toBeInTheDocument()
})
