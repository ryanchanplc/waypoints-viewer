import React from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'

const bounce = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%,-2000px) rotate(-45deg);
  }

  60% {
    opacity: 1;
    transform: translate(-50%,30px) rotate(-45deg);
  }

  80% {
    transform: translate(-50%,-10px) rotate(-45deg);
  }

  100% {
    transform: translate(-50%, -100%) rotate(-45deg);
  }
`
const PinDiv = styled.div`
  position: absolute;
  top: -100%;
  left: -50%;
  width: 20px;
  height: 20px;
  background-color: var(--color-secondary);
  border: 1px solid var(--color-primary);
  border-radius: 50% 50% 50% 0;
  user-select: none;
  transform: translate(-50%, -100%) rotate(-45deg);
  animation-name: ${bounce};
  animation-fill-mode: both;
  animation-duration: 1s;
  display: flex;
  justify-content: center;
`

const PinText = styled.div`
  z-index: 2;
  transform: rotate(45deg);
  align-self: center;
  color: var(--color-primary);
`

const LocationPin = ({ index }) => {
  return (
    <PinDiv>
      <PinText>{index}</PinText>
    </PinDiv>
  )
}

LocationPin.propTypes = {
  index: PropTypes.number.isRequired
}

export default LocationPin
