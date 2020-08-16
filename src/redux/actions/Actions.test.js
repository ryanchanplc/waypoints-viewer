import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import axios from 'axios'
import * as actionTypes from 'redux/actions/ActionTypes'
import * as actions from 'redux/actions/Actions'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('start Loading', () => {
  const expectedAction = {
    type: actionTypes.REQUEST_LOADING
  }
  expect(actions.requestLoading()).toEqual(expectedAction)
})

it('start request Route', () => {
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

it('success request Route', () => {
  const expectedAction = {
    type: actionTypes.GET_ROUTE_SUCCESS,
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
    actions.getRouteSuccess({
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

it('success request', () => {
  const expectedAction = {
    type: actionTypes.REQUEST_SUCCESS
  }
  expect(actions.requestSucess()).toEqual(expectedAction)
})
it('init map', () => {
  const expectedAction = {
    type: actionTypes.INIT_MAP,
    payload: { map: {}, maps: {} }
  }
  expect(actions.initMap({ map: {}, maps: {} })).toEqual(expectedAction)
})
it('should reset', () => {
  const expectedAction = {
    type: actionTypes.RESET
  }
  expect(actions.reset()).toEqual(expectedAction)
})

it('fail request', () => {
  const expectedAction = {
    type: actionTypes.REQUEST_FAIL,
    payload: 'Location not accessiable by car'
  }
  expect(actions.requestFailure('Location not accessiable by car')).toEqual(
    expectedAction
  )
})

it('error request', () => {
  const expectedAction = {
    type: actionTypes.REQUEST_ERROR,
    payload: 'Internal Server Error'
  }
  expect(actions.requestError('Internal Server Error')).toEqual(expectedAction)
})
it('rest', () => {
  const expectedAction = {
    type: actionTypes.RESET
  }
  expect(actions.reset()).toEqual(expectedAction)
})

it('test post route', () => {
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
      type: actionTypes.GET_ROUTE_SUCCESS,
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
test('test post route error', () => {
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
      payload: 'Server Error. Please try again later'
    }
  ]

  store.subscribe(() => {
    expect(store.getActions()).toEqual(expectedActions)
  })
})
it('test get route', () => {
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
      type: actionTypes.GET_ROUTE_SUCCESS,
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
      payload: 'Server Error. Please try again later'
    }
  ]

  store.subscribe(() => {
    expect(store.getActions()).toEqual(expectedActions)
  })
})
it('test get route fail', () => {
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

it('test get route in progress', () => {
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
      type: actionTypes.GET_ROUTE_SUCCESS,
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
