import React from 'react'
import { render } from 'utils/TestUtils'

import Loading from './Loading'

test('should render Loading', () => {
  const { getByText } = render(<Loading />)
  expect(getByText('Loading...')).toBeInTheDocument()
})
