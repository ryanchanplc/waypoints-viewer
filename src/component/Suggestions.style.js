import styled from 'styled-components'

export const Item = styled.li`
  padding: 0.5rem;
  &:hover {
    background-color: var(--color-secondary);
    color: var(--color-primary);
    cursor: pointer;
  }

  &:not(:first-child):not(:last-child) {
    border-bottom: 1px solid lightgrey;
  }
`

export const Divider = styled.li`
  list-item-style: none;
  cursor: default;
  font-weight: 700;
  margin: 0.2rem;
  color: var(--color-brand);
  border-bottom: 2px solid var(--color-brand);
`
export const SuggestionDiv = styled.div`
  position: relative;
`
export const Suggestion = styled.ul`
  z-index: 1;
  padding: 5px 0px;
  position: absolute;
  width: 100%;
  background: white;
  border: 1px solid lightgrey;
  border-top-width: 0;
  list-style: none;
  margin-top: 0;
  max-height: 143px;
  overflow-y: auto;
  padding-left: 0;
  border-radius: 5px;
  border-color: var(--color-secondary);
  color: grey;
  & li {
    padding: 0.5rem;
  }
`
