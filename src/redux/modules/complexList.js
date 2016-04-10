import { createAction, handleActions } from 'redux-actions'
import request from 'axios'

// constants
const GET_USER = "complex/get-user"
const SWITCH_LOADING = "complex/switch-loading"
const FETCH_USER_PENDING = "complex/fetch-user-pending"
const FETCH_USER_SUCCESS = "complex/fetch-user-success"
const FETCH_USER_FAIL = "complex/fetch-user-fail"
const SET_PAGE = "complex/set-current-page"
// const SWITCH_LOADED = "complex/switch-loaded"

// actions
const setCurrentPage = createAction(SET_PAGE)
const switchToLoading = createAction(SWITCH_LOADING)
const getUser = createAction(GET_USER, (count, page) => {
  return request.get(
    `/api/users?_start=${count * page}&_limit=${count}`
  )
})

export const fetchUser = function (count, page) {
  return {
    types: [ FETCH_USER_PENDING, FETCH_USER_SUCCESS, FETCH_USER_FAIL ],
    payload: [ switchToLoading, setCurrentPage.bind(null, page), getUser.bind(null, count, page) ],
    sequence: true
  }
}

const initData = {
  listLoading: false,
  listLoadFailed: false,
  users: [],
  currentPage: 0,
  sum: 0
}
// reducer
export default handleActions({
  [GET_USER]: {
    next (state, { payload }) {
      const sum = payload.headers['x-total-count']
      return { ...state, listLoading: false, sum, users: payload.data }
    },
    throw (state, { payload }) {
      const { listLoading, listLoadFailed, ...others } = state
      return { listLoading: false, listLoadFailed: true, ...others }
    }
  },
  // [SWITCH_LOADED] (state) {
  //   const { listLoading, ...others } = state
  //   return listLoading ? { listLoading: false, ...others } : state
  // },
  [SWITCH_LOADING] (state) {
    const { listLoading, ...others } = state
    return listLoading ? state : { listLoading: true, ...others }
  },
  [SET_PAGE] (state, { payload }) {
    return { ...state, currentPage: payload }
  }
}, initData)
