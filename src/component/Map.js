import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'

import { requestError } from 'redux/actions/Actions'
import SearchPanel from 'component/SearchPanel'

const center = { lat: 22.302711, lng: 114.177216 }
const defaultZoom = 11

const directionMode = 'DRIVING'

const MapDiv = styled.div`
  display: flex;
  flex: 1 1;
  flex-direction: column;
`

const Map = () => {
  const [mapState, setMapState] = useState(null)

  const paths = useSelector((state) => state.response.paths)
  const dispatch = useDispatch()

  const onGoogleApiLoaded = ({ map, maps }) => {
    const directionDisplay = new maps.DirectionsRenderer({ map })
    const directionsService = new maps.DirectionsService()

    setMapState({
      map,
      maps,
      directionDisplay,
      directionsService
    })
  }

  const GetDrivingDirection = (waypointsArray) => {
    if (waypointsArray == null) return

    if (waypointsArray.length < 2) return

    mapState.directionsService.route(
      {
        origin: waypointsArray[0].join(','),
        destination: waypointsArray[waypointsArray.length - 1].join(','),
        waypoints: waypointsArray.slice(1, -1).map((path) => {
          return { location: path.join(',') }
        }),
        travelMode: directionMode
      },
      (response, status) => {
        if (status === 'OK') {
          mapState.directionDisplay.setMap(mapState.map)
          mapState.directionDisplay.setDirections(response)
        } else {
          dispatch(requestError(`Directions request failed due to ${status}`))
        }
      }
    )
  }

  useEffect(() => {
    if (mapState == null) return
    mapState.directionDisplay.setMap(null)
    GetDrivingDirection(paths)
  })

  return (
    <>
      {mapState && <SearchPanel googleMap={mapState} />}
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
    </>
  )
}

export default Map
