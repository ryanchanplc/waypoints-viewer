import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postRoute, reset } from 'redux/actions/Actions'
import Message from 'component/Message'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { InlineIcon } from '@iconify/react'
import SearchLocation from '@iconify/icons-fa-solid/search-location'
import {
  InputDiv,
  Label,
  ButtonDiv,
  ButtonInput,
  Form,
  TextFieldInput,
  InputError
} from 'component/SearchPanel.style'

const Item = styled.li`
  padding: 0.5rem;
  &:hover {
    background-color: var(--color-secondary);
    color: var(--color-primary);
    cursor: pointer;
  }

  &:not(:last-of-type) {
    border-bottom: 1px solid lightgrey;
  }
`

const Divider = styled.li`
  list-item-style: none;
  cursor: default;
  font-weight: 700;
  margin: 0.2rem;
  color: var(--color-secondary);
  border-bottom: 2px solid var(--color-secondary);
`

const Suggestion = styled.ul`
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

const SearchPanel = ({ googleMap }) => {
  const [showSuggest, setShowSuggest] = useState(false)
  const { handleSubmit, register, errors } = useForm()
  const errorMessage = useSelector((state) => state.errorMessage)
  const totalTime = useSelector((state) => state.response.time)
  const totalDistance = useSelector((state) => state.response.distance)
  const recentPlaces = useSelector((state) => state.recent)
  const dispatch = useDispatch()
  const formRef = useRef()
  const startRef = useRef()
  const endRef = useRef()

  const onSubmit = (data) => {
    dispatch(postRoute(data))
  }
  const resetForm = () => {
    formRef.current.reset()
    dispatch(reset())
  }
  const clearSearchBox = (event) => {
    // eslint-disable-next-line no-param-reassign
    event.target.value = ''
  }

  useEffect(() => {
    if (googleMap != null) {
      const startAutoComplete = new googleMap.maps.places.Autocomplete(
        startRef.current
      )
      startAutoComplete.bindTo('bounds', googleMap.map)
      const endAutoComplete = new googleMap.maps.places.Autocomplete(
        endRef.current
      )
      endAutoComplete.bindTo('bounds', googleMap.map)
    }
  })
  const onFocus = (event) => {
    if (event.target.value.trim() === '') setShowSuggest(true)
  }
  const onBlur = (event) => {
    if (showSuggest) setShowSuggest(false)
  }
  const onChange = (event) => {
    console.log('Change')
    if (event.target.value.trim() === '') setShowSuggest(true)
    else if (showSuggest) setShowSuggest(false)
  }
  const getCurrentLocation = () => {
    console.log('click')
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('Latitude is :', position.coords.latitude)
      console.log('Longitude is :', position.coords.longitude)

      const searchOrigin = new googleMap.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      ) // Statue of Liberty
      const geoCoder = new googleMap.maps.Geocoder()
      geoCoder.geocode({ latLng: searchOrigin }, (results, status) => {
        if (status == googleMap.maps.GeocoderStatus.OK && results[0]) {
          console.log(results[0].formatted_address)
          startRef.current.value = results[0].formatted_address
        }
      })
    })
  }
  const selectLocation = (place) => {
    console.log(place)
    startRef.current.value = place
  }
  const isResultValid = () => totalTime != null && totalDistance != null
  const suggestionsListComponent = () => {
    return (
      <div style={{ position: 'relative' }}>
        <Suggestion>
          <Item onMouseDown={getCurrentLocation}>
            <InlineIcon icon={SearchLocation} /> Use Current Location
          </Item>
          <Divider>
            <span>Recent Search</span>
          </Divider>
          {recentPlaces &&
            Array.from(recentPlaces).map((place) => (
              <Item onMouseDown={() => selectLocation(place)}>{place}</Item>
            ))}
        </Suggestion>
      </div>
    )
  }
  return (
    <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <InputDiv>
        <Label htmlFor="start">Start Location</Label>
        <TextFieldInput
          autocomplete="off"
          ref={(e) => {
            register(e, {
              required: true
            })
            startRef.current = e
          }}
          id="start"
          name="start"
          type="search"
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          placeholder="Enter a location"
        />
        {showSuggest && suggestionsListComponent()}
        {errors.start && <InputError>This field is required</InputError>}
        <Label htmlFor="end">End Location</Label>
        <TextFieldInput
          autocomplete="off"
          ref={(e) => {
            register(e, {
              required: true
            })
            endRef.current = e
          }}
          id="end"
          name="end"
          type="search"
          placeholder="Enter a location"
        />
        {errors.end && <InputError>This field is required</InputError>}
      </InputDiv>
      {errorMessage && <Message isError>{errorMessage}</Message>}
      {isResultValid() && (
        <Message>
          Time : {totalTime}
          <br /> Distance: {totalDistance}
        </Message>
      )}

      <ButtonDiv>
        <ButtonInput type="submit" value="Submit" />
        <ButtonInput type="button" value="Reset" onClick={resetForm} />
      </ButtonDiv>
    </Form>
  )
}

SearchPanel.propTypes = {
  googleMap: PropTypes.objectOf(PropTypes.any).isRequired
}

export default SearchPanel
