import React from 'react'
import { useRef, useState } from 'react'
import { Container, Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { adminFalse } from './App'

const Signup = () => {
    let navigate = useNavigate()
    const { currentUser, signup, displayname } = useAuth()
    console.log(currentUser)
    // if (!currentUser)
    //     navigate('/')
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordAdminRef = useRef()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    adminFalse()

    function handleSignUp(e) {
      e.preventDefault()
  
      // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      //   return setError("Passwords do not match")
      // }
  
      // try {
        setError("")
        setLoading(true)

        signup(emailRef.current.value, passwordRef.current.value)
        .then(() => {
          displayname(nameRef.current.value, passwordAdminRef.current.value)
          .then(() => {
            navigate('/')
          }).catch((error) => {
            console.log(error)
            setError("Failed to create an account")
          })
        })
        // .then(() => {displayname(nameRef.current.value)})
        // .then(() => {
        //   console.log(currentUser.displayName)
        //   navigate('/')
        // })
        // .catch((error) => {setError("Failed to create an account")})
        
      // } catch {
        // setError("Failed to create an account")
      // }
  
      setLoading(false)
    }

    return (
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
        > 

        <div className="w-100" style={{ maxWidth: "400px" }} >
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSignUp}>
              <Form.Group id="name">
                  <Form.Label>Organization Name</Form.Label>
                  <Form.Control type="text" ref={nameRef} required />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label style={{marginTop: "5px"}}>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-admin">
                  <Form.Label style={{marginTop: "5px"}}>
                    Admin Password 
                    <span style={{color: "grey", fontSize: "2vh", display: "flex", alignItems: "center"}}>
                      {" "}(Must be different from account password)
                    </span>
                  </Form.Label>
                  <Form.Control type="password" ref={passwordAdminRef} required />
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