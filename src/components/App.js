import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { AuthProvider } from '../contexts/AuthContext'
import Dashboard from './Dashboard'
import Signup from './Signup'
import Login from './Login'


const App = () => {
  return (
    <Router>
        {/* <AuthProvider> */}
            <Routes>
              <Route exact path = '/' element = {<Dashboard />} />
              <Route path = '/signup' element = {<Signup />} />
              <Route path = '/login' element = {<Login />} />
              {/* <Route path="/forgot-password" component={ForgotPassword} /> */}
            </Routes>
        {/* </AuthProvider> */}
    </Router>
  )
}

export default App
