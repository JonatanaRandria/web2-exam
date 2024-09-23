import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PatrimoineLayout from './pages/layouts/patrimoineLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PatrimoineLayout></PatrimoineLayout>
    </>
  )
}

export default App
