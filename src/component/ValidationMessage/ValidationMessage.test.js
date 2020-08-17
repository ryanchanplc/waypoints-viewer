import React from 'react'
import { render } from '@testing-library/react'

import ValidationMessage from './ValidationMessage'

test('should render message', () => {
  const { getByText } = render(
    <ValidationMessage>Test Message</ValidationMessage>
  )
  expect(getByText('Test Message')).toBeInTheDocument()
})
