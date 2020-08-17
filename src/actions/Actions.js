import * as actions from 'actions/ActionTypes'
import axios from 'axios'
import { REQUEST_ERROR_MESSAGE, ROUTE_API_URL } from 'utils/Constant'

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

export function requestRouteSuccess(res) {
  return {
    type: actions.REQUEST_ROUTE_SUCCESS,
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
      .get(`${ROUTE_API_URL}/${token}`)
      .then((res) => {
        switch (res.data.status) {
          case 'in progress':
            dispatch(getRoute(token))
            return
          case 'success':
            dispatch(requestRouteSuccess(res.data))
            return
          case 'failure':
            dispatch(requestFailure(res.data.error))
            return
          default:
            dispatch(requestFailure())
        }
      })
      .catch(() => {
        dispatch(requestError(REQUEST_ERROR_MESSAGE))
      })
  }
}

export function postRoute({ start, end, showDriving }) {
  return (dispatch) => {
    dispatch(requestRoute({ start, end, showDriving }))
    return axios
      .post(ROUTE_API_URL, {
        origin: start,
        destination: end
      })
      .then((res) => {
        dispatch(getRoute(res.data.token))
      })
      .catch(() => {
        dispatch(requestError(REQUEST_ERROR_MESSAGE))
      })
  }
}
