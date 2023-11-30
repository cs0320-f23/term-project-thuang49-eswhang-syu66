import { useState } from 'react'
import '../css/App.css'
import { Navbar} from 'react-bootstrap'
import { Waves } from '../components/waves'


export function ParamsPage() {
  const [count, setCount] = useState(0)

  return (
    <>  
        {/* Navbar component */}
        <div style = {{paddingTop: "1rem", paddingLeft: "2rem", paddingRight: "2rem", paddingBottom:"2rem"}}>
            <Navbar>
                <div className = "nav-bar">
                    <div className = {"brand"}>Amplify</div>
                    <div> <button>Features</button> <button>Categories</button></div>
                </div>
            </Navbar>
        </div>

        <Waves></Waves>

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


      
    </>
  )
}

