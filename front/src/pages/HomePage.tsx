import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../../public/vite.svg'
import '../css/App.css'
import { InitiateAuth } from '../endpoints/InitialAuth'
import { navBar } from '../components/components'
import { Navbar } from 'react-bootstrap'
import { Waves } from '../components/waves'
import { Slogan } from '../components/slogan'


export function  HomePage() {
  const [count, setCount] = useState(0)
  return (
    <>
    {/* Navbar component: */}
      <div style = {{paddingTop: "1rem", paddingLeft: "2rem", paddingRight: "2rem", paddingBottom:"2rem"}}>
          <Navbar>
              <div className = "nav-bar">
                  <div className = {"brand"}>Amplify</div>
                  <div> <InitiateAuth/> </div>
              </div>
          </Navbar>
      </div>


      <div style = {{display: 'flex', flexDirection:'column', alignItems:'center'}}>
        <Waves/>
        <Slogan/>
        <div>
          <h1>A playlist for </h1>
        </div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
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


