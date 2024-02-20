import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="content-container">
      <h1>Sähkö</h1>
      <div className="price-container">Sähköhinta tähän? (emt miks ei ole keskellä)</div>
        <div className="content">
          <p> Tässä on muuta tekstiä ja tietoja</p>
          <p>apina</p>
        </div>
      </div>
    </>
  )
}

export default App
