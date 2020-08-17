import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postRoute, reset } from 'actions/Actions'
import { InlineIcon } from '@iconify/react'
import exchange from '@iconify/icons-fa-solid/exchange-alt'
import { useForm, FormProvider } from 'react-hook-form'
import AutoCompleteInput from 'component/AutoCompleteInput'
import ValidationError from 'component/ValidationMessage/ValidationMessage'
import {
  InputDiv,
  ButtonDiv,
  ButtonInput,
  Switch,
  SwitchDiv,
  Label
} from './SearchForm.style'

const SearchPanel = () => {
  const dispatch = useDispatch()
  const formRef = useRef()
  const startRef = useRef()
  const endRef = useRef()

  const googleMap = useSelector((state) => state.googleMap)

  const { handleSubmit, register, errors } = useForm({
    shouldFocusError: false
  })

  const onSubmit = (data) => {
    dispatch(postRoute(data))
  }
  const resetForm = () => {
    formRef.current.reset()
    dispatch(reset())
  }

  const onShowDriving = (event) => {
    if (googleMap != null)
      googleMap.directionDisplay.setOptions({
        map: googleMap.map,
        suppressPolylines: !event.target.checked
      })
  }

  const switchLocations = () => {
    const temp = startRef.current.value
    startRef.current.value = endRef.current.value
    endRef.current.value = temp
  }

  return (
    <FormProvider register={register} errors={errors}>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <InputDiv>
          <AutoCompleteInput
            id="start"
            placeholder="Enter a Location"
            label="Start Location"
            ref={startRef}
          />
          <SwitchDiv>
            <Switch
              type="button"
              aria-label="reverse"
              value={exchange}
              onClick={switchLocations}
            >
              <InlineIcon icon={exchange} rotate="90deg" />
            </Switch>
          </SwitchDiv>
          <AutoCompleteInput
            id="end"
            placeholder="Enter a Location"
            label="End Location"
            ref={endRef}
          />
        </InputDiv>
        {errors.start && (
          <ValidationError>Start Location is required.</ValidationError>
        )}
        {errors.end && (
          <ValidationError>End Location is required.</ValidationError>
        )}
        <ButtonDiv>
          <ButtonInput type="submit">Submit</ButtonInput>
          <ButtonInput type="button" onClick={resetForm}>
            Reset
          </ButtonInput>
        </ButtonDiv>
        <Label>
          <input
            ref={register}
            type="checkbox"
            name="showDriving"
            onChange={onShowDriving}
          />
          Show Driving Route
        </Label>
      </form>
    </FormProvider>
  )
}

export default SearchPanel
