import styled from 'styled-components'

export const InputWrapper = styled.div`
  margin: 5px 0px 5px 0p;
  display: flex;
  flex-direction: column;
`
export const TextFieldInput = styled.input`
  width: 100%;
  display: block;
  border-radius: 5px;
  border: 1px solid var(--color-secondary);
  padding: 5px;

  -webkit-appearance: none;
`
export const Label = styled.label`
  text-transform: capitalize;
  color: white;
  font-size: 0.8rem;
  margin-bottom: 5px;
}
`
