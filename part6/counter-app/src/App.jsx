import React from 'react'
import { createStore } from 'redux'
import './App.css'

const counterReducer = (state = 0, action) => {
  switch(action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  case 'ZERO':
    return 0
  default:
    return state
  }
}

const store = createStore(counterReducer)
console.log(store)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'ZERO' })
// store.dispatch({ type: 'DECREMENT' })

function App() {
  return (
    <div>
      <h1>Counter App</h1>
      <div style={{ paddingLeft: '110px' }} >
        {store.getState()}
      </div>
      <button
        onClick={e => store.dispatch({ type: 'DECREMENT' })}>
        minus
      </button>
      <button
        onClick={e => store.dispatch({ type: 'ZERO' })}>
        zero
      </button>
      <button
        onClick={e => store.dispatch({ type: 'INCREMENT' })}>
        plus
      </button>
    </div>
  )
}

export default { App, store }
