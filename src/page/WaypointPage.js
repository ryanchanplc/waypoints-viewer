import React from 'react'
import { useSelector } from 'react-redux'

import styled from 'styled-components'

import Map from 'component/Map'

import Loading from 'component/Loading'

const Content = styled.div`
  display: flex;
  height: 100vh;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`

const WaypointPage = () => {
  const isLoading = useSelector((state) => state.isLoading)

  return (
    <>
      {isLoading && <Loading />}
      <Content>
        <Map />
      </Content>
    </>
  )
}

export default WaypointPage
