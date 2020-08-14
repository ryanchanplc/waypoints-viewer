import * as actions from 'redux/actions/ActionTypes'

export function requestRoute({ start, end, showDriving }) {
  return {
    type: actions.REQUEST_ROUTE,
    payload: { start, end, showDriving }
  }
}
export function requestLoading() {
  return {
    type: actions.REQUEST_LOADING
  }
}
export function getRouteSuccess(res) {
  return {
    type: actions.GET_ROUTE_SUCCESS,
    payload: {
      path: res.path,
      totalTime: res.total_time,
      totalDistance: res.total_distance
    }
  }
}

export function requestSucess(error) {
  return {
    type: actions.REQUEST_SUCCESS,
    payload: error
  }
}
export function requestFailure(error) {
  return {
    type: actions.REQUEST_FAIL,
    payload: error
  }
}
export function requestError(error) {
  return {
    type: actions.REQUEST_ERROR,
    payload: error
  }
}
export function resetMap() {
  return {
    type: actions.RESET_MAP,
    payload: {
      path: [],
      totalDistance: null,
      totalTime: null,
      isLoading: false,
      errorMessage: null,
      showDrivingRoute: false
    }
  }
}
export function initMap(googleMap) {
  return {
    type: actions.INIT_MAP,
    payload: googleMap
  }
}

export function getRoute(token) {
  return (dispatch) => {
    // fetch(`https://mock-api.dev.lalamove.com/route/${token}`)
    fetch(`https://mock-api.dev.lalamove.com/mock/route/success`)
      .then((response) => response.json())
      .then((res) => {
        switch (res.status) {
          case 'in progress':
            dispatch(getRoute(token))
            return
          case 'success':
            dispatch(getRouteSuccess(res))
            return
          case 'failure':
            dispatch(requestFailure(res.error))
            return
          default:
            dispatch(requestFailure())
        }
      })
      .catch(() => {
        dispatch(requestError()) // Hardcoded error here
      })
  }
}
export function postRoute({ start, end }) {
  return (dispatch) => {
    dispatch(requestRoute({ start, end }))

    fetch('https://mock-api.dev.lalamove.com/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        origin: start,
        destination: end
      })
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch(getRoute(res.token))
      })
      .catch(() => {
        dispatch(requestError()) // Hardcoded error here
      })
  }
}
