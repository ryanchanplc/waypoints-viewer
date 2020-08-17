import reducer, { initialState } from 'reducers/Reducer'
import * as actionTypes from 'actions/ActionTypes'

test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState)
})

test('should handle REQUEST_LOADING', () => {
  expect(
    reducer(undefined, {
      type: actionTypes.REQUEST_LOADING
    })
  ).toEqual({
    ...initialState,
    isLoading: true
  })
})

test('should handle REQUEST FAIL', () => {
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

test('should handle REQUEST SUCCESS', () => {
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

test('should handle REQUEST ROUTE', () => {
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

test('should handle REQUEST ERROR', () => {
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

test('should handle REQUEST_ROUTE_SUCCESS', () => {
  expect(
    reducer(undefined, {
      type: actionTypes.REQUEST_ROUTE_SUCCESS,
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

test('should handle INITMAP', () => {
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

test('should handle RESET', () => {
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
