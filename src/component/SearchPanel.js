import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postRoute } from 'redux/actions/Actions'
import { InlineIcon } from '@iconify/react'
import alertIcon from '@iconify/icons-fa-solid/exclamation-circle'
import PropTypes from 'prop-types'
import {
  InputDiv,
  Label,
  ButtonDiv,
  ButtonInput,
  Form,
  TextFieldInput,
  MessageDiv
} from 'component/SearchPanel.style'

const SearchPanel = ({ mapInstance, mapApi }) => {
  const message = useSelector((state) => state.message)
  const dispatch = useDispatch()
  const formRef = useRef()
  const startRef = useRef()
  const endRef = useRef()

  const handleSubmit = () => dispatch(postRoute())
  const resetForm = () => formRef.current.reset()
  const clearSearchBox = (element) => {
    // eslint-disable-next-line no-param-reassign
    element.value = ''
  }

  useEffect(() => {
    if (mapApi != null) {
      const startAutoComplete = new mapApi.places.Autocomplete(startRef.current)
      startAutoComplete.bindTo('bounds', mapInstance)
      const endAutoComplete = new mapApi.places.Autocomplete(endRef.current)
      endAutoComplete.bindTo('bounds', mapInstance)
    }
  })
  return (
    <Form ref={formRef}>
      <InputDiv>
        <Label htmlFor="start">Start Location</Label>
        <TextFieldInput
          ref={startRef}
          id="start"
          name="start"
          onFocus={clearSearchBox}
          placeholder="Enter a location"
        />

        <Label htmlFor="end">End Location</Label>
        <TextFieldInput
          ref={endRef}
          id="end"
          name="end"
          onFocus={clearSearchBox}
          placeholder="Enter a location"
        />
      </InputDiv>
      <MessageDiv>{message}</MessageDiv>
      <ButtonDiv>
        <ButtonInput type="button" value="Submit" onClick={handleSubmit} />
        <ButtonInput type="button" value="Reset" onClick={resetForm} />
      </ButtonDiv>
    </Form>
  )
}

SearchPanel.propTypes = {
  mapInstance: PropTypes.objectOf(PropTypes.any).isRequired,
  mapApi: PropTypes.objectOf(PropTypes.any).isRequired
}

export default SearchPanel
