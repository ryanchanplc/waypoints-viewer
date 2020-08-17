import React from 'react'
import Loading from 'component/Loading/Loading'
import SearchPanel from 'component/SearchPanel'
import Map from 'component/Map'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 728px) {
    display: block;
  }
`
const WaypointViewer = () => {
  const isLoading = useSelector((state) => state.isLoading)
  return (
    <>
      {isLoading && <Loading />}
      <FlexContainer>
        <SearchPanel />
        <Map />
      </FlexContainer>
    </>
  )
}

export default WaypointViewer
