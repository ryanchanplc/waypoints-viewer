import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const MessageDiv = styled.div`
  margin: 10px 0px;
  font-size: 0.8rem;
  padding: 10px;
  border: 1px solid;
  border-radius: 5px;
  background: ${(props) =>
    props.isError ? 'var(--color-secondary)' : 'var(--color-primary)'};
  color: ${(props) =>
    props.isError ? 'var(--color-primary)' : 'var(--color-secondary)'};
`
const Message = ({ isError, children }) => {
  return <MessageDiv isError={isError}>{children}</MessageDiv>
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
