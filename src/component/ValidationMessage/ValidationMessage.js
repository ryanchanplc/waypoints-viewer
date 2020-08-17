import React from 'react'
import PropTypes from 'prop-types'
import { InlineIcon } from '@iconify/react'
import alertIcon from '@iconify/icons-fa-solid/exclamation-circle'
import styled from 'styled-components'

export const InputErrorMessage = styled.div`
  font-size: 0.8rem;
  margin: 2px 0px;
  color: black;
`

const ValidationMessage = ({ children }) => {
  return (
    <InputErrorMessage>
      <InlineIcon icon={alertIcon} /> {children}
    </InputErrorMessage>
  )
}

ValidationMessage.propTypes = { children: PropTypes.node.isRequired }

export default ValidationMessage
