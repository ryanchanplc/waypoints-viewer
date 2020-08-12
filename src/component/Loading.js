import React from 'react'
import styled, { keyframes } from 'styled-components'

const Spinning = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}`

const Loader = styled.div`
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(0, 0, 0, 0.2);
  border-right: 1.1em solid rgba(0, 0, 0, 0.2);
  border-bottom: 1.1em solid rgba(0, 0, 0, 0.2);
  border-left: 1.1em solid var(--color-secondary);
  transform: translateZ(0);
  animation: ${Spinning} 1.1s infinite linear;

  &,
  & span {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
`
const LoadingDiv = styled.div`
  height: 100vh;
  width: 100%;
  background: rgba(255, 255, 255, 0.5);
  position: absolute;
  z-index: 1;
  justify-content: center;
  display: flex;
  align-items: center;
`
const Loading = () => {
  return (
    <LoadingDiv>
      <Loader />
    </LoadingDiv>
  )
}
export default Loading
