import * as actions from 'redux/actions/ActionTypes'

export function requestLoading({ start, end }) {
  console.log({ start, end })
  return {
    type: actions.REQUEST_LOADING,
    payload: { start, end }
  }
}
export function getRouteSuccess(paths, distance, time) {
  return {
    type: actions.GET_ROUTE_SUCCESS,
    payload: { response: { paths, distance, time } }
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

export function getRoute(token) {
  return (dispatch) => {
    fetch(`https://mock-api.dev.lalamove.com/route/${token}`)
      .then((response) => response.json())
      .then((res) => {
        switch (res.status) {
          case 'in progress':
            dispatch(getRoute(token))
            return
          case 'success':
            dispatch(
              getRouteSuccess(res.path, res.total_distance, res.total_time)
            )
            return
          case 'failure':
            console.log(res.error)
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
    dispatch(requestLoading({ start, end }))

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
