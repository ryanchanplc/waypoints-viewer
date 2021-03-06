import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { InlineIcon } from '@iconify/react'
import alertIcon from '@iconify/icons-fa-solid/exclamation-circle'

export const MessageDiv = styled.div`
  margin: 10px 0px;
  padding: 10px;
  border: 1px solid;
  border-radius: 5px;
  background: ${(props) =>
    props.isError ? 'var(--color-secondary)' : 'var(--color-primary)'};
  color: ${(props) =>
    props.isError ? 'var(--color-primary)' : 'var(--color-secondary)'};
`
const Message = ({ isError, children }) => {
  return (
    <MessageDiv isError={isError}>
      {isError && <InlineIcon icon={alertIcon} />}
      {children}
    </MessageDiv>
  )
}
Message.defaultProps = {
  isError: false,
  children: null
}
Message.propTypes = {
  children: PropTypes.node,
  isError: PropTypes.bool
}

export default Message
