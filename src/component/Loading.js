import React from 'react'
import { LoadingDiv, Loader, LoadingText } from 'component/Loading.style'

const Loading = () => {
  return (
    <LoadingDiv>
      <LoadingText>Loading...</LoadingText>
      <Loader />
    </LoadingDiv>
  )
}
export default Loading
