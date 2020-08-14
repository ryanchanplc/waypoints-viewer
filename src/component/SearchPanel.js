import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postRoute, resetMap } from 'redux/actions/Actions'
import Message from 'component/Message'
import { InlineIcon } from '@iconify/react'
import exchange from '@iconify/icons-fa-solid/exchange-alt'
import { useForm, FormProvider } from 'react-hook-form'
import AutoCompleteInput from 'component/AutoCompleteInput'
import {
  Title,
  InputDiv,
  ButtonDiv,
  ButtonInput,
  Form,
  Switch,
  SwitchDiv,
  Label
} from 'component/SearchPanel.style'

const SearchPanel = () => {
  const dispatch = useDispatch()
  const formRef = useRef()
  const startRef = useRef()
  const endRef = useRef()

  const { handleSubmit, register, errors } = useForm({
    shouldFocusError: false
  })
  const googleMap = useSelector((state) => state.googleMap)
  const errorMessage = useSelector((state) => state.errorMessage)
  const totalTime = useSelector((state) => state.totalTime)
  const totalDistance = useSelector((state) => state.totalDistance)
  const onSubmit = (data) => {
    dispatch(postRoute(data))
  }
  const resetForm = () => {
    formRef.current.reset()
    dispatch(resetMap())
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
  const printMessage = () => {
    if (errorMessage) return <Message isError>{errorMessage}</Message>
    if (totalTime != null && totalDistance != null)
      return (
        <Message>
          Time : {totalTime} <br />
          Distance: {totalDistance}
        </Message>
      )
    return <></>
  }
  return (
    <FormProvider register={register} errors={errors}>
      <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <Title> Waypoints Viewer</Title>
        <InputDiv>
          <AutoCompleteInput
            id="start"
            placeholder="Start Location"
            ref={startRef}
          />
          <SwitchDiv>
            <Switch type="button" value={exchange} onClick={switchLocations}>
              <InlineIcon icon={exchange} rotate="90deg" />
            </Switch>
          </SwitchDiv>
          <AutoCompleteInput id="end" placeholder="End Location" ref={endRef} />
        </InputDiv>

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
        {printMessage()}
      </Form>
    </FormProvider>
  )
}

export default SearchPanel
