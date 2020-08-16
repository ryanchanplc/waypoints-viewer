import * as actions from 'redux/actions/ActionTypes'
import axios from 'axios'

const defaultErrorMessage = `Server Error. Please try again later`
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

export function requestSucess() {
  return {
    type: actions.REQUEST_SUCCESS
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
export function reset() {
  return {
    type: actions.RESET
    // payload: {
    //   path: [],
    //   totalDistance: null,
    //   totalTime: null,
    //   isLoading: false,
    //   errorMessage: null,
    //   showDrivingRoute: false
    // }
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
    return axios
      .get(`https://mock-api.dev.lalamove.com/route/${token}`)
      .then((res) => {
        switch (res.data.status) {
          case 'in progress':
            dispatch(getRoute(token))
            return
          case 'success':
            dispatch(getRouteSuccess(res.data))
            return
          case 'failure':
            dispatch(requestFailure(res.data.error))
            return
          default:
            dispatch(requestFailure())
        }
      })
      .catch(() => {
        dispatch(requestError(defaultErrorMessage))
      })
  }
}
export function postRoute({ start, end, showDriving }) {
  return (dispatch) => {
    dispatch(requestRoute({ start, end, showDriving }))
    return axios
      .post('https://mock-api.dev.lalamove.com/route', {
        origin: start,
        destination: end
      })
      .then((res) => {
        dispatch(getRoute(res.data.token))
      })
      .catch(() => {
        dispatch(requestError(defaultErrorMessage))
      })
  }
}
