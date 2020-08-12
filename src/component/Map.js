import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'
import LocationPin from 'component/LocationPin'
import { requestError } from 'redux/actions/Actions'
import SearchPanel from 'component/SearchPanel'

const center = { lat: 22.302711, lng: 114.177216 }
const defaultZoom = 11
const pinColor = '#f16722'
const directionMode = 'DRIVING'

const MapDiv = styled.div`
  display: flex;
  flex: 1 1;
  flex-direction: column;
`

const Map = () => {
  const [mapState, setMapState] = useState(null)
  const paths = useSelector((state) => state.paths)
  const dispatch = useDispatch()
  const GetWaypoints = (waypointsArray) =>
    waypointsArray.slice(1, -1).map((path) => {
      return { location: path.join(',') }
    })

  const GetDrivingDirection = (waypointsArray, callback) => {
    if (waypointsArray.length < 2) return
    const directionsService = new mapState.maps.DirectionsService()
    directionsService.route(
      {
        origin: waypointsArray[0].join(','),
        destination: waypointsArray[waypointsArray.length - 1].join(','),
        waypoints: GetWaypoints(waypointsArray),
        travelMode: directionMode
      },
      callback
    )
  }

  const DrawDrivingDirection = (response) => {
    new mapState.maps.DirectionsRenderer().setDirections(response)

    const routePolyline = new mapState.maps.Polyline({
      path: response.routes[0].overview_path
    })

    routePolyline.setOptions({ strokeColor: pinColor })
    routePolyline.setMap(mapState.map)
  }

  const UpdateMapBounds = (waypointsArray) => {
    const bounds = new mapState.maps.LatLngBounds()
    waypointsArray.map((waypoint) =>
      bounds.extend(new mapState.maps.LatLng(waypoint[0], waypoint[1]))
    )
    mapState.map.fitBounds(bounds)
    mapState.map.setZoom(defaultZoom)
  }

  useEffect(() => {
    if (mapState == null || paths == null) return

    UpdateMapBounds(paths)

    GetDrivingDirection(paths, (response, status) => {
      if (status === 'OK') {
        DrawDrivingDirection(response)
      } else {
        dispatch(requestError(`Directions request failed due to ${status}`))
      }
    })
  })

  return (
    <>
      {mapState && (
        <SearchPanel mapInstance={mapState.map} mapApi={mapState.maps} />
      )}
      <MapDiv>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAP_KEY,
            libraries: ['places', 'geometry']
          }}
          defaultCenter={center}
          defaultZoom={defaultZoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={setMapState}
        >
          {paths &&
            paths.map((path, index) => {
              const key = path[0].toString() + path[1].toString()
              return (
                <LocationPin
                  lat={path[0]}
                  lng={path[1]}
                  key={key}
                  index={index + 1}
                />
              )
            })}
        </GoogleMapReact>
      </MapDiv>
    </>
  )
}

export default Map
