import { useState } from 'react'
import '../css/App.css'
import { InitiateAuth } from '../endpoints/InitialAuth'


export function ParamsPage() {
  const [count, setCount] = useState(0)

  return (
    <>

      <div>
        SELECT PARAMS
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>


      <InitiateAuth/>
    </>
  )
}

