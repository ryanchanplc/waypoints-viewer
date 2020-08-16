import * as actions from 'redux/actions/ActionTypes'

export const initialState = {
  path: [],
  totalDistance: null,
  totalTime: null,
  googleMap: null,
  isLoading: false,
  errorMessage: null,
  showDrivingRoute: false,
  recent: []
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.INIT_MAP:
      return {
        ...state,
        googleMap: action.payload
      }
    case actions.REQUEST_LOADING:
      return {
        ...state,
        isLoading: true
      }

    case actions.REQUEST_ROUTE:
      return {
        ...initialState,
        isLoading: true,
        showDrivingRoute: action.payload.showDriving,
        recent: Array.from(
          new Set([...state.recent, action.payload.start, action.payload.end])
        )
      }
    case actions.GET_ROUTE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        path: action.payload.path,
        totalTime: action.payload.totalTime,
        totalDistance: action.payload.totalDistance
      }
    case actions.REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case actions.REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload
      }
    case actions.REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload
      }
    case actions.RESET:
      return {
        ...initialState,
        recent: state.recent
      }

    default:
      return state
  }
}
export default reducer
