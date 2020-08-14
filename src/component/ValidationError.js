import React from 'react'
import PropTypes from 'prop-types'
import { InlineIcon } from '@iconify/react'
import alertIcon from '@iconify/icons-fa-solid/exclamation-circle'
import styled from 'styled-components'

export const InputError = styled.div`
  font-size: 0.8rem;
  margin: 2px 0px;
  color: black;
`

const ValidationError = ({ message }) => {
  return (
    <InputError>
      <InlineIcon icon={alertIcon} /> {message}
    </InputError>
  )
}

ValidationError.propTypes = { message: PropTypes.string.isRequired }

export default ValidationError
