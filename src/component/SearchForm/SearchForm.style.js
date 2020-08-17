import styled from 'styled-components'

export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
`

export const ButtonInput = styled.button`
  height: 30px;
  border: 1px solid var(--color-secondary);
  color: var(--color-secondary);
  border-radius: 5px;
  flex: 1;
  background-color: var(--color-primary);
  width: min-content;
  font-size: 16px;
  &:active {
    background-color: lightgrey;
  }
  &:hover {
    background-color: var(--color-secondary);
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
`
export const Switch = styled.button`
  margin: 1px 0px;
  height: 30px;
  width: 30px;
  border: none;
  color: var(--color-secondary);
  border-radius: 5px;
  flex: 0;
  font-size: 16px;
  background-color: var(--color-primary);
`
export const SwitchDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`
export const ButtonDiv = styled.div`
  display: flex;
  column-gap: 10px;
  margin: 10px 0px;
`

export const Label = styled.label`
  margin: 10px 0px;
  color: var(--color-secondary);
`
