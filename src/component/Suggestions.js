/* eslint-disable no-param-reassign */
import React from 'react'
import PropTypes from 'prop-types'
import {
  requestLoading,
  requestSucess,
  requestError
} from 'redux/actions/Actions'
import { useSelector, useDispatch } from 'react-redux'
import { InlineIcon } from '@iconify/react'
import SearchLocation from '@iconify/icons-fa-solid/search-location'
import Location from '@iconify/icons-fa-solid/map-marker-alt'
import {
  Item,
  Divider,
  Suggestion,
  SuggestionDiv
} from 'component/Suggestions.style'

const Suggestions = ({ inputRef }) => {
  const recentPlaces = useSelector((state) => state.recent)
  const googleMap = useSelector((state) => state.googleMap)
  const dispatch = useDispatch()
  const getCurrentLocation = () => {
    if (googleMap == null) return
    dispatch(requestLoading())
    navigator.geolocation.getCurrentPosition((position) => {
      const searchOrigin = new googleMap.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      )
      const geoCoder = new googleMap.maps.Geocoder()
      geoCoder.geocode({ latLng: searchOrigin }, (results, status) => {
        if (status === googleMap.maps.GeocoderStatus.OK && results[0]) {
          inputRef.current.value = results[0].formatted_address
          dispatch(requestSucess())
        } else dispatch(requestError('Cannot get current location'))
      })
    })
  }

  const selectLocation = (place) => {
    inputRef.current.value = place
    const event = new Event('input', { bubbles: true })
    inputRef.current.dispatchEvent(event)
  }

  return (
    <SuggestionDiv>
      <Suggestion>
        <Item onMouseDown={getCurrentLocation}>
          <InlineIcon icon={SearchLocation} /> Use Current Location
        </Item>
        <Divider>
          <span>Recent Search</span>
        </Divider>
        {recentPlaces &&
          Array.from(recentPlaces).map((place) => (
            <Item key={place} onMouseDown={() => selectLocation(place)}>
              <InlineIcon icon={Location} /> {place}
            </Item>
          ))}
      </Suggestion>
    </SuggestionDiv>
  )
}

Suggestions.propTypes = {
  inputRef: PropTypes.objectOf(PropTypes.object).isRequired
}

export default Suggestions
