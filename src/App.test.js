import React from 'react'
import axios from 'axios'
import { render, fireEvent, act, screen, wait } from 'utils/TestUtils'
import userEvent from '@testing-library/user-event'
import { REQUEST_ERROR_MESSAGE } from 'utils/Constant'
import App from './App'

jest.mock('axios')
jest.mock('component/Map', () => () => <div />)
afterEach(() => {
  axios.get.mockReset()
  axios.post.mockReset()
})

const token = '9d3503e0-7236-4e47-a62f-8b01b5646c16'

const clickButton = async () => {
  const { getByLabelText, getByText } = render(<App />, {})
  const startInput = getByLabelText('Start Location')
  const endInput = getByLabelText('End Location')

  fireEvent.change(startInput, { target: { value: 'Hong Kong' } })
  fireEvent.change(endInput, { target: { value: 'Shen Zhen' } })

  const submitBut = getByText('Submit')

  await act(async () => {
    userEvent.click(submitBut)
  })
}
test('should print result after success called API', async () => {
  const path = [
    ['22.372081', '114.107877'],
    ['22.326442', '114.167811'],
    ['22.284419', '114.159510']
  ]
  const time = 1000
  const distance = 2000
  axios.post.mockResolvedValue({ data: { token } })
  axios.get.mockResolvedValue({
    data: {
      status: 'success',
      path,
      total_distance: distance,
      total_time: time
    }
  })
  await clickButton()
  const expectedTime = `Time : ${time}`
  const expectedDistance = `Distance: ${distance}`

  await wait(() => {
    expect(screen.getByText(expectedTime)).toBeInTheDocument()
    expect(screen.getByText(expectedDistance)).toBeInTheDocument()
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledTimes(1)
  })
})

test('should print error after failure called API', async () => {
  const errorMessage = 'Location not accessible by car'
  axios.post.mockResolvedValue({ data: { token } })
  axios.get.mockResolvedValue({
    data: {
      status: 'failure',
      error: errorMessage
    }
  })
  await clickButton()
  await wait(() => {
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })
})

test('should show error text after error API post call', async () => {
  axios.post.mockImplementationOnce(() => {
    return Promise.reject(new Error('Internal Server Error'))
  })
  await clickButton()
  await wait(() => {
    expect(screen.getByText(REQUEST_ERROR_MESSAGE)).toBeInTheDocument()
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledTimes(0)
  })
})

test('should show error text after error API get call', async () => {
  axios.post.mockResolvedValue({ data: { token } })
  axios.get.mockImplementation(() => {
    return Promise.reject(new Error('Internal Server Error'))
  })
  await clickButton()
  await wait(() => {
    expect(screen.getByText(REQUEST_ERROR_MESSAGE)).toBeInTheDocument()
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledTimes(1)
  })
})

test('should repeat when in_progress in API get call', async () => {
  const path = [
    ['22.372081', '114.107877'],
    ['22.326442', '114.167811'],
    ['22.284419', '114.159510']
  ]
  const time = 1000
  const distance = 2000
  axios.post.mockResolvedValue({ data: { token } })
  axios.get
    .mockResolvedValueOnce({ data: { status: 'in progress' } })
    .mockResolvedValue({
      data: {
        status: 'success',
        path,
        total_distance: distance,
        total_time: time
      }
    })
  await clickButton()
  const expectedTime = `Time : ${time}`
  const expectedDistance = `Distance: ${distance}`

  await wait(() => {
    expect(screen.getByText(expectedTime)).toBeInTheDocument()
    expect(screen.getByText(expectedDistance)).toBeInTheDocument()
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledTimes(2)
  })
})
