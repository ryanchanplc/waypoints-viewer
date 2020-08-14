/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect, forwardRef } from 'react'
import { useSelector } from 'react-redux'
import {
  InputWrapper,
  InputError,
  TextFieldInput
} from 'component/AutoCompleteInput.style'
import { InlineIcon } from '@iconify/react'
import alertIcon from '@iconify/icons-fa-solid/exclamation-circle'
import Suggestions from 'component/Suggestions'
import { useFormContext } from 'react-hook-form'

const AutoCompleteInput = (props, ref) => {
  const googleMap = useSelector((state) => state.googleMap)
  const { register, errors } = useFormContext()
  const [showSuggest, setShowSuggest] = useState(false)

  useEffect(() => {
    if (googleMap != null) {
      const autoComplete = new googleMap.maps.places.Autocomplete(ref.current)
      autoComplete.bindTo('bounds', googleMap.map)
    }
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

  return (
    <InputWrapper>
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
      {showSuggest && <Suggestions inputRef={ref} />}

      {errors[props.id] && (
        <InputError>
          <InlineIcon icon={alertIcon} />
          This field is required
        </InputError>
      )}
    </InputWrapper>
  )
}

export default forwardRef(AutoCompleteInput)
