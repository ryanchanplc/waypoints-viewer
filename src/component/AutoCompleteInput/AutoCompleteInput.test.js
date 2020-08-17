import React from 'react'
import { render, screen } from 'utils/TestUtils'
import userEvent from '@testing-library/user-event'
import { FormProvider } from 'react-hook-form'
import AutoCompleteInput from './AutoCompleteInput'

const mockStart = () => {
  const register = jest.fn()
  const errors = jest.fn()
  const ref = React.createRef()
  return render(
    <FormProvider register={register} errors={errors}>
      <AutoCompleteInput
        id="start"
        label="Start Location"
        placeholder="Enter a location"
        ref={ref}
      />
    </FormProvider>
  )
}

test('should render input label text correctly', () => {
  const { getByText } = mockStart()
  expect(getByText('Start Location')).toBeInTheDocument()
})

test('should render input', () => {
  const { getByLabelText } = mockStart()
  expect(getByLabelText('Start Location')).toBeInTheDocument()
})
test('should focus input while clicking label', () => {
  const { getByText, getByLabelText } = mockStart()

  userEvent.click(getByText('Start Location'))
  expect(getByLabelText('Start Location')).toHaveFocus()
})

test('should display suggestions', () => {
  const { getByText, getByLabelText } = mockStart()

  userEvent.click(getByText('Start Location'))
  expect(getByLabelText('Start Location')).toHaveFocus()
  expect(screen.getByText('Use Current Location')).toBeInTheDocument()
})
