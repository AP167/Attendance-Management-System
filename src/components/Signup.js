import React from 'react'
import { useRef, useState } from 'react'
import { Container, Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    let navigate = useNavigate()
    const { currentUser } = useAuth()
    console.log(currentUser)
    // if (!currentUser)
    //     navigate('/')
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSignUp(e) {
      e.preventDefault()
  
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match")
      }
  
      try {
        setError("")
        setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value)
        navigate('/')
      } catch {
        setError("Failed to create an account")
      }
  
      setLoading(false)
    }

    return (
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
        > 

        <div className="w-100" style={{ maxWidth: "400px" }} >
          <div style={{backgroundColor: "lightgreen"}}>Sign Up</div>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSignUp}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control type="password" ref={passwordConfirmRef} required />
                </Form.Group>
                <Button disabled={loading} 
                  className="w-100" 
                  type="submit"
                  style={{marginTop: "15px"}}>
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? 
          <span onClick={() => navigate('/login')}
            style={{color: "coral", cursor: "pointer"}}> Log In</span>
        </div>
        </div>

      </Container>
      
    )
}

export default Signup