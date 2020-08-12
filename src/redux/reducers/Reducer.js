import * as actions from 'redux/actions/ActionTypes'

const initialState = {
  paths: null,
  distance: null,
  time: null,
  isLoading: false,
  message: 'HIHI'
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOADING:
      return {
        ...state,
        isLoading: true,
        message: null
      }
    case actions.GET_ROUTE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        paths: action.payload.paths,
        distance: action.payload.distance,
        time: action.payload.time
      }
    case actions.SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    case actions.FAIL:
      return {
        ...state,
        isLoading: false,
        message: action.payload
      }
    case actions.ERROR:
      return {
        ...state,
        isLoading: false,
        message: action.payload ? action.payload : 'Server Error'
      }

    default:
      return state
  }
}
export default reducer
