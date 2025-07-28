import React from 'react'
import Home from './pages/Home'
import BsState from './Context/BsState'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <BsState> {/* context se BsState laga dete hai */}
      <Router>
      <Routes>
      <Route path='/' element={<Home/>} />
      </Routes>
      </Router>
      </BsState>
    </div>
  )
}

export default App
