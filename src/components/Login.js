import React from 'react'
import { useRef, useState } from 'react'
import { Container, Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    let navigate = useNavigate()
    const { currentUser, login } = useAuth()
    console.log(currentUser)
    // if (!currentUser)
    //     navigate('/')
    const emailRef = useRef()
    const passwordRef = useRef()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleLogIn(e) {
      e.preventDefault()
  
      try {
        setError("")
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        navigate('/')
      } catch {
        setError("Failed to log in")
      }
  
      setLoading(false)
    }

    return (
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
        > 

        <div className="w-100" style={{ maxWidth: "400px" }} >
          <div style={{backgroundColor: "lightblue"}}>Log In</div>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleLogIn}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
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
        <div className="w-100 text-center mt-2">
          Don't have an account? 
          <span onClick={() => navigate('/signup')}
            style={{color: "coral", cursor: "pointer"}}> Sign Up</span>
        </div>
        </div>

      </Container>
      
    )
}

export default Login