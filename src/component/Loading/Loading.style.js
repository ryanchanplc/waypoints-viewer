import styled, { keyframes } from 'styled-components'

export const Spinning = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}`

export const Loader = styled.div`
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.5);
  border-right: 1.1em solid rgba(255, 255, 255, 0.5);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.5);
  border-left: 1.1em solid var(--color-brand);
  transform: translateZ(0);
  animation: ${Spinning} 1.1s infinite linear;

  &,
  & span {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
`
export const LoadingDiv = styled.div`
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 1;
  justify-content: center;
  display: flex;
  align-items: center;
`
export const LoadingText = styled.p`
  position: absolute;
  color: var(--color-secondary);
`
