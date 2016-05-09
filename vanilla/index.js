import { createStore, bindActionCreators } from 'redux'

const counterDOM = document.getElementById('counter')
const seedInput = document.getElementById('seed')
const incBtn = document.getElementById('inc')
const decBtn = document.getElementById('dec')

const COUNTER_INCREMENT = 'counter/increment'
const COUNTER_DECREMENT = 'counter/decrement'

// ActionCreators
function increment (count) {
  return {
    type: COUNTER_INCREMENT,
    payload: count
  }
}

function decrement (count) {
  return {
    type: COUNTER_DECREMENT,
    payload: count
  }
}

// Reducer
const reducer = (state = { count: 0 }, { type, payload }) => {
  switch (type) {
    case COUNTER_INCREMENT: return { count: state.count + payload }
    case COUNTER_DECREMENT: return { count: state.count - payload }
    default: return state
  }
}

// Store
const store = createStore(reducer)
const actionCreators = bindActionCreators({
  increment, decrement
}, store.dispatch)

incBtn.addEventListener('click', _ => {
  const { increment } = actionCreators
  increment(+seedInput.value)
})
decBtn.addEventListener('click', _ => {
  const { decrement } = actionCreators
  decrement(+seedInput.value)
})

store.subscribe(updateView)
updateView()

function updateView () {
  const state = store.getState()
  counterDOM.textContent = state.count
}
