import { useState } from 'react'
import { PostCreate, PostList } from './components/posts';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container-fluid ">
      <h1>Create Post</h1>
      <PostCreate />
      <hr />
      <h1>Posts</h1>
      <PostList />
    </div>
  )
}

export default App
