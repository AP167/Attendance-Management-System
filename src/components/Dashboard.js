import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Card, Button, Alert, Container } from "react-bootstrap"
import './Dashboard.css'

const Dashboard = () => {

  let navigate = useNavigate()
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      navigate('/')
    } catch {
      setError("Failed to log out")
    }
  }


  return (
    <Container 
      className="d-flex justify-content-center"
      style={{ minHeight: "100vh", 
              minWidth: "100vw"}}
      >
      <Card className="w-100" 
        style={{ minWidth: "400px", margin: "5vh", padding: "5vh"}}>
        <Card.Body>
          <h2 className="text-center mb-4">{currentUser.displayName}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><Button variant='link' onClick={handleLogout} style={{paddingLeft: "0"}}>
            Log Out
          </Button></p>
          {/* <strong>Organization Name:</strong> {currentUser.displayName ? currentUser.displayName : "None"} */}
          <div className="w-100 text-center mt-2"
            style={{display: "flex", 
              justifyContent: "space-evenly", 
              alignItems: "center",
              paddingTop: "25px"}}>

          <Card className='dash-card' onClick={() => {navigate('/attendance')}}>
          <Card.Body className='dash-btn' style={{height: "65%"}}>
              <img src="./images/present.svg" alt="" height="65%" />
              <p style={{marginTop: "2vw"}}>Record Presence</p>
            </Card.Body>
          </Card>

          <Card className='dash-card' onClick={() => {navigate('/register')}}>
            <Card.Body className='dash-btn' style={{width: "100%"}}>
              <img src="./images/register.svg" alt="" width="70%" />
              <p style={{marginTop: "2vw"}}>Register New Employee</p>
            </Card.Body>
          </Card>

          <Card className='dash-card' onClick={() => {navigate('/admin')}}>
            <Card.Body className='dash-btn' style={{width: "100%"}}>
              <img src="./images/admin.svg" alt="" width="90%" />
              <p style={{marginTop: "2vw"}}>Admin</p>
            </Card.Body>
          </Card>

          </div>
        </Card.Body>
      </Card>
      
    </Container>
  )
}

export default Dashboard