import styled from 'styled-components'

export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
`

export const Label = styled.label`
  text-transform: capitalize;
  margin-bottom: 10px;
  color: var(--color-secondary);
`
export const ButtonInput = styled.input`
  height: 25px;
  border: 1px solid var(--color-secondary);
  color: var(--color-secondary);
  border-radius: 5px;
  flex: 1;
  background-color: var(--color-primary);

  &:hover {
    background-color: var(--color-secondary);
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
`

export const ButtonDiv = styled.div`
  display: flex;
  column-gap: 10px;
`

export const Form = styled.form`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  flex: 0 0 230px;
  padding: 20px;
  justify-content: space-evenly;
  border-right: 1px solid var(--color-secondary);
  background: var(--color-primary);
  color: var(--color-panel-text);
  @media (max-width: 600px) {
    flex: 0 0;
    border-right: none;
    border-bottom: 1px solid var(--color-secondary);
  }
`
export const MessageDiv = styled.div`
  margin-bottom: 10px;
  color: red;
  font-size: 0.8rem;
`
export const TextFieldInput = styled.input`
  display: block;
  border-radius: 5px;
  border: 1px solid var(--color-secondary);
  padding: 5px;
  margin-bottom: 10px;
`
