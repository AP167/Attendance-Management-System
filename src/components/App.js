import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext'
import Signup from './Signup'
import Login from './Login'
import HomePage from './HomePage'
import Help from './Help'


const App = () => {
  return (
    <Router>
        <AuthProvider>
            <Routes>
              <Route exact path = '/' element = {<HomePage />} />
              <Route path = '/signup' element = {<Signup />} />
              <Route path = '/login' element = {<Login />} />
              <Route path = '/help' element = {<Help />} />
              {/* <Route path="/forgot-password" component={ForgotPassword} /> */}
            </Routes>
        </AuthProvider>
    </Router>
  )
}

export default App
