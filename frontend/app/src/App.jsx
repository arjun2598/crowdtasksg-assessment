import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/dashboard' exact element={<Home />} />
          <Route path='login' exact element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App