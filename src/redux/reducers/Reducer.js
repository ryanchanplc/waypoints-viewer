import * as actions from 'redux/actions/ActionTypes'

export const initialState = {
  response: {},
  isLoading: false,
  errorMessage: null,
  recent: new Set([])
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REQUEST_LOADING:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
        response: {},
        recent: new Set(Array.from(state.recent))
          .add(action.payload.start)
          .add(action.payload.end)
      }
    case actions.GET_ROUTE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        response: action.payload.response
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
          ? action.payload
          : `Server Error. Please try again later`
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
