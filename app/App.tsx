import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <h1 className="text-3xl font-bold text-amber-400 underline">
      Hello world!
      <br />
      <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
    </h1>
  )
}

export default App
