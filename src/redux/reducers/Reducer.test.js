import reducer, { initialState } from 'redux/reducers/Reducer'
import * as actionTypes from 'redux/actions/ActionTypes'

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState)
})
it('should handle REQUEST_LOADING', () => {
  expect(
    reducer(undefined, {
      type: actionTypes.REQUEST_LOADING
    })
  ).toEqual({
    ...initialState,
    isLoading: true
  })
})
it('should handle REQUEST FAIL', () => {
  expect(
    reducer(undefined, {
      type: actionTypes.REQUEST_FAIL,
      payload: 'Fail'
    })
  ).toEqual({
    ...initialState,
    errorMessage: 'Fail'
  })
})

it('should handle REQUEST SUCCESS', () => {
  expect(
    reducer(
      {
        ...initialState,
        isLoading: true
      },
      {
        type: actionTypes.REQUEST_SUCCESS,
        payload: 'Fail'
      }
    )
  ).toEqual({
    ...initialState,
    isLoading: false
  })
})
it('should handle REQUEST ROUTE', () => {
  expect(
    reducer(undefined, {
      type: actionTypes.REQUEST_ROUTE,
      payload: { start: 'A', end: 'B', showDriving: true }
    })
  ).toEqual({
    ...initialState,
    isLoading: true,
    showDrivingRoute: true,
    recent: ['A', 'B']
  })

  expect(
    reducer(
      {
        ...initialState,
        isLoading: true,
        showDrivingRoute: true,
        recent: ['A', 'B']
      },
      {
        type: actionTypes.REQUEST_ROUTE,
        payload: { start: 'C', end: 'D', showDriving: false }
      }
    )
  ).toEqual({
    ...initialState,
    isLoading: true,
    showDrivingRoute: false,
    recent: ['A', 'B', 'C', 'D']
  })
})

it('should handle REQUEST ERROR', () => {
  expect(
    reducer(undefined, {
      type: actionTypes.REQUEST_ERROR,
      payload: 'Error'
    })
  ).toEqual({
    ...initialState,
    errorMessage: 'Error'
  })
})

it('should handle GET_ROUTE_SUCCESS', () => {
  expect(
    reducer(undefined, {
      type: actionTypes.GET_ROUTE_SUCCESS,
      payload: {
        path: [['1,1'], ['1,2']],
        totalTime: 1000,
        totalDistance: 2000
      }
    })
  ).toEqual({
    ...initialState,
    path: [['1,1'], ['1,2']],
    totalTime: 1000,
    totalDistance: 2000
  })
})
it('should handle INITMAP', () => {
  expect(
    reducer(undefined, {
      type: actionTypes.INIT_MAP,
      payload: {
        map: {},
        maps: {}
      }
    })
  ).toEqual({
    ...initialState,
    googleMap: { map: {}, maps: {} }
  })
})
it('should handle RESET', () => {
  expect(
    reducer(
      {
        path: [['1,1'], ['1,2']],
        totalDistance: 2000,
        totalTime: 1000,
        googleMap: null,
        isLoading: false,
        errorMessage: null,
        showDrivingRoute: true,
        recent: ['A', 'B']
      },
      {
        type: actionTypes.RESET
      }
    )
  ).toEqual({
    ...initialState,
    recent: ['A', 'B']
  })
})
