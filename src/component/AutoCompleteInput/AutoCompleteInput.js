/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect, forwardRef } from 'react'
import { useSelector } from 'react-redux'

import Suggestions from 'component/Suggestions'
import { useFormContext } from 'react-hook-form'
import { InputWrapper, TextFieldInput, Label } from './AutoCompleteInput.style'

const AutoCompleteInput = (props, ref) => {
  const googleMap = useSelector((state) => state.googleMap)
  const { register } = useFormContext()
  const [showSuggest, setShowSuggest] = useState(false)

  useEffect(() => {
    if (googleMap != null) {
      const autoComplete = new googleMap.maps.places.Autocomplete(ref.current)
      autoComplete.bindTo('bounds', googleMap.map)
      return () => {
        if (googleMap != null) {
          googleMap.maps.event.clearInstanceListeners(ref.current)
          document.querySelectorAll('.pac-container').forEach((pac) => {
            pac.remove()
          })
        }
      }
    }

    return () => {}
  })
  const onFocus = (event) => {
    if (event.target.value.trim() === '') setShowSuggest(true)
  }
  const onBlur = () => {
    if (showSuggest) setShowSuggest(false)
  }
  const onChange = (event) => {
    if (event.target.value.trim() === '') setShowSuggest(true)
    else if (showSuggest) setShowSuggest(false)
  }
  const onLocationSelected = (place) => {
    ref.current.value = place
    const event = new Event('input', { bubbles: true })
    ref.current.dispatchEvent(event)
  }
  return (
    <InputWrapper>
      <Label htmlFor={props.id}>{props.label}</Label>
      <TextFieldInput
        ref={(e) => {
          register(e, {
            required: true
          })
          ref.current = e
        }}
        id={props.id}
        name={props.id}
        type="search"
        autocomplete="off"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={props.placeholder}
      />
      {showSuggest && <Suggestions onLocationSelected={onLocationSelected} />}
    </InputWrapper>
  )
}

export default forwardRef(AutoCompleteInput)
