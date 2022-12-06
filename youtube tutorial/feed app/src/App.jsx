import { useState } from 'react'
import PostsList from './features/posts/PostsLists'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
     <PostsList />
    </div>
  )
}

export default App
