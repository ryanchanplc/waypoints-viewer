import React from 'react'
import { useSelector } from 'react-redux'
import SearchForm from 'component/SearchForm'
import Message from 'component/Message'
import styled from 'styled-components'

const SearchPanelDiv = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  min-width: 350px;
  padding: 20px;
  justify-content: flex-start;
  border-right: 1px solid var(--color-secondary);
  background: var(--color-primary);
  color: var(--color-panel-text);
  @media (max-width: 728px) {
    min-width: fit-content;
    min-height: 300px;
    border-right: none;
    border-bottom: 1px solid var(--color-secondary);
  }
`

export const Title = styled.h2`
  color: var(--color-secondary);
`

const SearchPanel = () => {
  const errorMessage = useSelector((state) => state.errorMessage)
  const totalTime = useSelector((state) => state.totalTime)
  const totalDistance = useSelector((state) => state.totalDistance)

  const printMessage = () => {
    if (errorMessage) return <Message isError>{errorMessage}</Message>
    if (totalTime != null && totalDistance != null)
      return (
        <Message>
          <p>Time : {totalTime} </p>
          <p>Distance: {totalDistance}</p>
        </Message>
      )
    return <></>
  }

  return (
    <SearchPanelDiv>
      <Title> Waypoints Viewer</Title>
      <SearchForm />
      {printMessage()}
    </SearchPanelDiv>
  )
}

export default SearchPanel
