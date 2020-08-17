import React from 'react'
import { LoadingDiv, Loader, LoadingText } from './Loading.style'

const Loading = () => {
  return (
    <LoadingDiv>
      <LoadingText>Loading...</LoadingText>
      <Loader />
    </LoadingDiv>
  )
}
export default Loading
