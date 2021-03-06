// constants
const ADD_ENTRY = "simple/add-entry"
const EDIT_ENTRY = "simple/edit-entry"
const REMOVE_ENTRY = "simple/remove-entry"
const START_EDIT = "simple/start-edit"
const END_EDIT = "simple/end-edit"

// reducer，记得给 state 设置一个默认值，同时要保证 state 的不可变性
export default (state = [], { type, payload = {} }) => {
  const { entry, i } = payload

  switch (type) {
    case ADD_ENTRY: {
      return [
        ...state,
        { entry, editing: false }
      ]
    }
    case START_EDIT: {
      return state.map((oldEntry, index) => {
        if (index === i) return { entry: oldEntry.entry, editing: true }
        else return oldEntry
      })
    }
    case EDIT_ENTRY: {
      return state.map((oldEntry, index) => {
        if (index === i) return { entry, editing: true }
        else return oldEntry
      })
    }
    case END_EDIT: {
      return state.map((oldEntry, index) => {
        if (index === i) return { entry: oldEntry.entry, editing: false }
        else return oldEntry
      })
    }
    case REMOVE_ENTRY: {
      return state.filter((e, index) => index != i)
    }
  }

  return state
}

// Actions
export function addEntry (entry) {
  return {
    type: ADD_ENTRY,
    payload: { entry }
  }
}

export function editEntry (i, entry) {
  return {
    type: EDIT_ENTRY,
    payload: { entry, i }
  }
}

export function removeEntry (i) {
  return {
    type: REMOVE_ENTRY,
    payload: { i }
  }
}

export function startEdit (i) {
  return {
    type: START_EDIT,
    payload: { i }
  }
}

export function endEdit (i) {
  return {
    type: END_EDIT,
    payload: { i }
  }
}

// import { createAction, handleActions } from 'redux-actions'

// export const addEntry = createAction(ADD_ENTRY, entry => ({ entry }))
// export const editEntry = createAction(EDIT_ENTRY, (i, entry) => ({ i, entry }))
// export const removeEntry = createAction(REMOVE_ENTRY, i => ({ i }))
// export const startEdit = createAction(START_EDIT, i => ({ i }))
// export const endEdit = createAction(END_EDIT, i => ({ i }))
//
// export default handleActions({
//   [ADD_ENTRY]: (state, { payload = {} }) => {
//     const { entry } = payload
//     if (entry) {
//       return [
//         ...state,
//         { entry, editing: false }
//       ]
//     }
//     else return state
//   },
//   [START_EDIT]: (state, { payload = {} }) => {
//     const { i } = payload
//     return state.map((oldEntry, index) => {
//       if (index === i) return { entry: oldEntry.entry, editing: true }
//       else return oldEntry
//     })
//   },
//   [EDIT_ENTRY]: (state, { payload = {} }) => {
//     const { entry, i } = payload
//     return state.map((oldEntry, index) => {
//       if (index === i) return { entry, editing: true }
//       else return oldEntry
//     })
//   },
//   [END_EDIT]: (state, { payload = {} }) => {
//     const { i } = payload
//     return state.map((oldEntry, index) => {
//       if (index === i) return { entry: oldEntry.entry, editing: false }
//       else return oldEntry
//     })
//   },
//   [REMOVE_ENTRY]: (state, { payload = {} }) => {
//     const { i } = payload
//     return state.filter((e, index) => index != i)
//   }
// }, [])
