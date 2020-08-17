import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'

import { initMap, requestSucess, requestError } from 'actions'

const center = { lat: 22.302711, lng: 114.177216 }
const defaultZoom = 11
const directionMode = 'DRIVING'

const MapDiv = styled.div`
  display: flex;
  flex: 6;
  flex-direction: column;
`

const Map = () => {
  const googleMap = useSelector((state) => state.googleMap)
  const path = useSelector((state) => state.path)
  const dispatch = useDispatch()

  const onGoogleApiLoaded = ({ map, maps }) => {
    const directionDisplay = new maps.DirectionsRenderer({
      map,
      suppressPolylines: true
    })
    dispatch(initMap({ map, maps, directionDisplay }))
  }

  const GetDrivingDirection = (waypointsArray) => {
    if (waypointsArray.length < 2) return

    const directionsService = new googleMap.maps.DirectionsService()

    directionsService.route(
      {
        origin: waypointsArray[0].join(','),
        destination: waypointsArray[waypointsArray.length - 1].join(','),
        waypoints: waypointsArray.slice(1, -1).map((point) => {
          return { location: point.join(',') }
        }),
        travelMode: directionMode
      },
      (response, status) => {
        if (status === 'OK') {
          googleMap.directionDisplay.setMap(googleMap.map)
          googleMap.directionDisplay.setDirections(response)
          dispatch(requestSucess())
        } else {
          dispatch(requestError(`Directions request failed due to ${status}`))
        }
      }
    )
  }

  useEffect(() => {
    if (googleMap == null) return
    googleMap.directionDisplay.setMap(null)
    if (path != null) GetDrivingDirection(path)
  })

  return (
    <MapDiv>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAP_KEY,
          libraries: ['places', 'geometry']
        }}
        defaultCenter={center}
        defaultZoom={defaultZoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={onGoogleApiLoaded}
      />
    </MapDiv>
  )
}

export default Map
