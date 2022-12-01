import './App.css'
import {useSelector, useDispatch} from 'react-redux'

function App() {

  const counter = useSelector(state => state.counter)
  const dispatch = useDispatch()
  function increment() {
    dispatch({type: 'INCREMENT'})
  }
  function decrement() {
    dispatch({type: 'DECREMENT'})
  }
  function addValue() {
    dispatch({type: 'ADD', payload : 10})
  }
  return (
    <div className='App'>
      <h1>Counter App with redux</h1>
      <div>{counter}</div>
      <button onClick={decrement}> - </button>
      <button onClick={increment}> + </button>
      <button onClick={addValue} >add value 10</button>
    </div>
  )
}

export default App
