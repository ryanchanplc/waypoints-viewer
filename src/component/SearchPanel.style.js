import styled from 'styled-components'

export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
`

export const ButtonInput = styled.button`
  height: 25px;
  border: 1px solid var(--color-secondary);
  color: var(--color-secondary);
  border-radius: 5px;
  flex: 1;
  background-color: var(--color-primary);
  width: min-content;
  &:hover {
    background-color: var(--color-secondary);
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
`
export const Switch = styled(ButtonInput)`
  position: absolute;
  top: -5px;
  right: 5px;
`
export const SwitchDiv = styled.div`
  position: relative;
`
export const ButtonDiv = styled.div`
  display: flex;
  column-gap: 10px;
  margin-top: 10px;
`

export const Form = styled.form`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  flex: 0 0 230px;
  padding: 20px;
  justify-content: flex-start;
  border-right: 1px solid var(--color-secondary);
  background: var(--color-primary);
  color: var(--color-panel-text);
  @media (max-width: 600px) {
    flex: 0 0;
    border-right: none;
    border-bottom: 1px solid var(--color-secondary);
  }
`

export const Title = styled.h2`
  color: var(--color-secondary);
`

export const Label = styled.label`
  margin: 10px 0px;
  font-size: 0.8rem;
  color: var(--color-secondary);
`
