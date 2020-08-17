import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import axios from 'axios'
import * as actionTypes from 'actions/ActionTypes'
import * as actions from 'actions/Actions'
import { REQUEST_ERROR_MESSAGE } from 'utils/Constant'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('should match REQUEST_LOADING action', () => {
  const expectedAction = {
    type: actionTypes.REQUEST_LOADING
  }
  expect(actions.requestLoading()).toEqual(expectedAction)
})

it('should match REQUEST_ROUTE action', () => {
  const expectedAction = {
    type: actionTypes.REQUEST_ROUTE,
    payload: {
      start: 'HONG KONG',
      end: 'Shen Zhen',
      showDriving: true
    }
  }
  expect(
    actions.requestRoute({
      start: 'HONG KONG',
      end: 'Shen Zhen',
      showDriving: true
    })
  ).toEqual(expectedAction)
})

it('should match REQUEST_ROUTE_SUCCESS action', () => {
  const expectedAction = {
    type: actionTypes.REQUEST_ROUTE_SUCCESS,
    payload: {
      path: [
        ['1.1', '1.2'],
        ['1.1', '1.2'],
        ['1.1', '1.2']
      ],
      totalTime: 1000,
      totalDistance: 2000
    }
  }
  expect(
    actions.requestRouteSuccess({
      path: [
        ['1.1', '1.2'],
        ['1.1', '1.2'],
        ['1.1', '1.2']
      ],
      total_time: 1000,
      total_distance: 2000
    })
  ).toEqual(expectedAction)
})

it('should match REQUEST_SUCCESS action', () => {
  const expectedAction = {
    type: actionTypes.REQUEST_SUCCESS
  }
  expect(actions.requestSucess()).toEqual(expectedAction)
})

it('should match INIT_MAP action', () => {
  const expectedAction = {
    type: actionTypes.INIT_MAP,
    payload: { map: {}, maps: {} }
  }
  expect(actions.initMap({ map: {}, maps: {} })).toEqual(expectedAction)
})

it('should match RESET action', () => {
  const expectedAction = {
    type: actionTypes.RESET
  }
  expect(actions.reset()).toEqual(expectedAction)
})

it('should match REQUEST_FAIL action', () => {
  const expectedAction = {
    type: actionTypes.REQUEST_FAIL,
    payload: 'Location not accessiable by car'
  }
  expect(actions.requestFailure('Location not accessiable by car')).toEqual(
    expectedAction
  )
})

it('should match REQUEST_ERROR action', () => {
  const expectedAction = {
    type: actionTypes.REQUEST_ERROR,
    payload: 'Internal Server Error'
  }
  expect(actions.requestError('Internal Server Error')).toEqual(expectedAction)
})

it('should match on dispatch postRoute sucess', () => {
  const store = mockStore({})
  axios.post.mockResolvedValue({
    data: { token: '9d3503e0-7236-4e47-a62f-8b01b5646c16' }
  })
  axios.get.mockResolvedValue({
    data: {
      status: 'success',
      path: [
        ['1.1', '1.2'],
        ['1.1', '1.2'],
        ['1.1', '1.2']
      ],
      total_time: 1000,
      total_distance: 2000
    }
  })
  const expectedActions = [
    {
      type: actionTypes.REQUEST_ROUTE,
      payload: {
        start: 'A',
        end: 'B',
        showDriving: true
      }
    },
    {
      type: actionTypes.REQUEST_ROUTE_SUCCESS,
      payload: {
        path: [
          ['1.1', '1.2'],
          ['1.1', '1.2'],
          ['1.1', '1.2']
        ],
        totalTime: 1000,
        totalDistance: 2000
      }
    }
  ]

  store.dispatch(
    actions.postRoute({
      start: 'A',
      end: 'B',
      showDriving: true
    })
  )

  store.subscribe(() => {
    expect(store.getActions()).toEqual(expectedActions)
  })
})

test('should match on dispatch postRoute error', () => {
  const store = mockStore({})
  axios.post.mockImplementationOnce(() => {
    return Promise.reject(new Error('Internal Server Error'))
  })
  store.dispatch(
    actions.postRoute({
      start: 'A',
      end: 'B',
      showDriving: true
    })
  )
  const expectedActions = [
    {
      type: actionTypes.REQUEST_ROUTE,
      payload: {
        start: 'A',
        end: 'B',
        showDriving: true
      }
    },
    {
      type: actionTypes.REQUEST_ERROR,
      payload: REQUEST_ERROR_MESSAGE
    }
  ]

  store.subscribe(() => {
    expect(store.getActions()).toEqual(expectedActions)
  })
})
it('should match on getRoute success', () => {
  const store = mockStore({})
  axios.post.mockResolvedValue({
    data: { token: '9d3503e0-7236-4e47-a62f-8b01b5646c16' }
  })
  axios.get.mockResolvedValue({
    data: {
      status: 'success',
      path: [
        ['1.1', '1.2'],
        ['1.1', '1.2'],
        ['1.1', '1.2']
      ],
      total_time: 1000,
      total_distance: 2000
    }
  })
  const expectedActions = [
    {
      type: actionTypes.REQUEST_ROUTE_SUCCESS,
      payload: {
        path: [
          ['1.1', '1.2'],
          ['1.1', '1.2'],
          ['1.1', '1.2']
        ],
        totalTime: 1000,
        totalDistance: 2000
      }
    }
  ]

  store.dispatch(actions.getRoute('9d3503e0-7236-4e47-a62f-8b01b5646c16'))

  store.subscribe(() => {
    expect(store.getActions()).toEqual(expectedActions)
  })
})
test('test get route error', () => {
  const store = mockStore({})
  axios.get.mockImplementationOnce(() => {
    return Promise.reject(new Error('Internal Server Error'))
  })
  store.dispatch(actions.getRoute('9d3503e0-7236-4e47-a62f-8b01b5646c16'))
  const expectedActions = [
    {
      type: actionTypes.REQUEST_ERROR,
      payload: REQUEST_ERROR_MESSAGE
    }
  ]

  store.subscribe(() => {
    expect(store.getActions()).toEqual(expectedActions)
  })
})

it('should match on getRoute fail', () => {
  const store = mockStore({})
  axios.get.mockResolvedValue({
    data: {
      status: 'failure',
      error: 'Location not accessible by car'
    }
  })
  store.dispatch(actions.getRoute('9d3503e0-7236-4e47-a62f-8b01b5646c16'))
  const expectedActions = [
    {
      type: actionTypes.REQUEST_FAIL,
      payload: 'Location not accessible by car'
    }
  ]

  store.subscribe(() => {
    expect(store.getActions()).toEqual(expectedActions)
  })
})

it('should match on getRoute in progress', () => {
  const store = mockStore({})
  const path = [
    ['1.1', '1.2'],
    ['1.1', '1.2'],
    ['1.1', '1.2']
  ]
  const time = 1000
  const distance = 2000
  axios.get
    .mockResolvedValueOnce({ data: { status: 'in progress' } })
    .mockResolvedValue({
      data: {
        status: 'success',
        path,
        total_distance: distance,
        total_time: time
      }
    })
  store.dispatch(actions.getRoute('9d3503e0-7236-4e47-a62f-8b01b5646c16'))
  const expectedActions = [
    {
      type: actionTypes.REQUEST_ROUTE_SUCCESS,
      payload: {
        path: [
          ['1.1', '1.2'],
          ['1.1', '1.2'],
          ['1.1', '1.2']
        ],
        totalTime: 1000,
        totalDistance: 2000
      }
    }
  ]

  store.subscribe(() => {
    expect(store.getActions()).toEqual(expectedActions)
  })
})
