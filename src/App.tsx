import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useIsConnected } from './hooks/useIsConnected'

function App() {
  const [count, setCount] = useState(0)

  const [isConnected] = useIsConnected();
  console.log('isConnected', isConnected);

  return (
    <div className="App">
      <div className="card">
        {isConnected ? 
          <>
          <p>Connected</p>
          <br/>
          <button onClick={() => {
            (window as any).fuel?.disconnect();
          }}>
          {/* count is {count} */}
          disconnect
        </button>
          
          </> :
          <button onClick={() => {
            (window as any).fuel?.connect();
          }}>
          {/* count is {count} */}
          connect
        </button>}
        
      </div>
    </div>
  )
}

export default App
