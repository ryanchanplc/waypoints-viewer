import React from 'react'
import { render } from '@testing-library/react'
import Message from './Message'
import 'jest-styled-components'

describe('message render', () => {
  const message = 'Testing'
  test('should render message correctly', () => {
    const { getAllByText } = render(<Message>{message}</Message>)
    expect(getAllByText('Testing')[0].textContent).toBe(message)
    expect(getAllByText('Testing')[0]).toHaveStyleRule(
      'color',
      'var(--color-secondary)'
    )
    expect(getAllByText('Testing')[0]).toHaveStyleRule(
      'background',
      'var(--color-primary)'
    )
  })

  test('should render error message correctly', () => {
    const { getAllByText } = render(<Message isError>{message}</Message>)
    expect(getAllByText('Testing')[0]).toHaveStyleRule(
      'color',
      'var(--color-primary)'
    )
    expect(getAllByText('Testing')[0]).toHaveStyleRule(
      'background',
      'var(--color-secondary)'
    )
  })
})
