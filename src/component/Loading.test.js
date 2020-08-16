import React from 'react'
import { render } from 'test/test-utils'

import Loading from './Loading'

test('should render Loading', () => {
  const { getByText } = render(<Loading />)
  expect(getByText('Loading...')).toBeInTheDocument()
})
