import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext'
import Signup from './Signup'
import Login from './Login'
import HomePage from './HomePage'
import Help from './Help'
import Attendance from './Attendance'
import Register from './Register'
import Admin from './Admin'
import AdminLogin from './AdminLogin'

let admin = false;
const adminTrue = () => {admin = true}
const adminFalse = () => {admin = false}
const isAdmin = () => admin

const App = () => {
  return (
    <Router>
        <AuthProvider>
            <Routes>
              <Route exact path = '/' element = {<HomePage />} />
              <Route path = '/signup' element = {<Signup />} />
              <Route path = '/login' element = {<Login />} />
              <Route path = '/help' element = {<Help />} />
              <Route path = '/attendance' element = {<Attendance />} />
              <Route path = '/register' element = {<Register />} />
              <Route path = '/admin' element = {<Admin />} />
              <Route path = '/admin-login' element = {<AdminLogin />} />
              {/* <Route path="/forgot-password" component={ForgotPassword} /> */}
            </Routes>
        </AuthProvider>
    </Router>
  )
}

export { isAdmin, adminTrue, adminFalse}
export default App
