import * as actions from 'redux/actions/ActionTypes'

export function requestLoading() {
  return {
    type: actions.LOADING
  }
}
export function getRouteSuccess(paths, distance, time) {
  return {
    type: actions.GET_ROUTE_SUCCESS,
    payload: { paths, distance, time }
  }
}

export function requestSuccess() {
  return {
    type: actions.SUCCESS
  }
}
export function requestFailure(error) {
  return {
    type: actions.FAIL,
    payload: error
  }
}
export function requestError(error) {
  return {
    type: actions.ERROR,
    payload: error
  }
}

function handleErrors(response, dispatch) {
  if (!response.ok) dispatch(requestError(response.statusText))
  return response
}

export function getRoute(token) {
  return (dispatch) => {
    fetch('https://mock-api.dev.lalamove.com/mock/route/success')
      .then((response) => handleErrors(response, dispatch))
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
            dispatch(requestFailure(res.error))
            return
          default:
            dispatch(requestFailure())
        }
      })
      .catch((error) => {
        if (typeof error.text === 'function') {
          error.text().then((errorMessage) => {
            dispatch(requestError(errorMessage))
          })
        } else {
          dispatch(requestError(`Error :${error}`)) // Hardcoded error here
        }
      })
  }
}
export function postRoute(start, end) {
  return (dispatch) => {
    dispatch(requestLoading())

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
      .then((response) => handleErrors(response, dispatch))
      .then((response) => response.json())
      .then((res) => {
        dispatch(getRoute(res.token))
      })
      .catch((error) => {
        if (typeof error.text === 'function') {
          error.text().then((errorMessage) => {
            dispatch(requestError(errorMessage))
          })
        } else {
          dispatch(requestError(`Error :${error}`)) // Hardcoded error here
        }
      })
  }
}
