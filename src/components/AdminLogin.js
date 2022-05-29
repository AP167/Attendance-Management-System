import React from 'react'
import { useState, useRef } from 'react'
import { Container, Card, Alert, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { adminTrue } from './App'

const AdminLogin = () => {
    let navigate = useNavigate()
    const { currentUser } = useAuth()

    const passwordRef = useRef()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogIn = (e) => {
      e.preventDefault()
      if (passwordRef.current.value == currentUser.photoURL){
          adminTrue()
        navigate('/admin')}
      else{
        setError('Incorrect Password')}
    //   signInWithEmailAndPassword(authAdmin, currentUser.email, passwordRef)
    //     .then(() => {navigate('/admin-home')})
    //     .catch(() => {setError("Failed to log in")})
  
      setLoading(false)
    }

    if (!currentUser){
        return (
        <div>You cannot access this page. Return to 
            <span onClick={() => navigate('/')}
            style={{color: "coral", cursor: "pointer"}}> Home Page</span>
        </div>)}


    return (
        <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
        > 

        <div className="w-100" style={{ maxWidth: "400px" }} >
            <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Admin Log In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleLogIn}>
                <Form.Group id="password">
                    <Form.Label>Admin Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Button disabled={loading} 
                    className="w-100" 
                    type="submit"
                    style={{marginTop: "15px"}}>
                    Log In
                </Button>
                </Form>
            </Card.Body>
            </Card>
        </div>

        </Container>
        )
}

export default AdminLogin