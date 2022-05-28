import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Dashboard from './Dashboard'

const HomePage = () => {
    let navigate = useNavigate()

    const { currentUser } = useAuth()
    console.log(currentUser)
    if (currentUser)
        return (<Dashboard />)

    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
            > 

            <div className="w-100" style={{ maxWidth: "400px" }} >
            <div className="w-100 text-center mt-2" 
                style={{backgroundColor: "lightgreen"}}>
                Attendance Management System
            </div>
            <Button className="w-100" 
                type="submit" 
                style={{marginTop: "25px"}}
                onClick={() => {navigate('/signup')}}>
                Sign Up
            </Button>
            <Button className="w-100" 
                type="submit" 
                style={{marginTop: "15px"}}
                onClick={() => {navigate('/login')}}>
                Log In
            </Button>
            <Button className="w-100" 
                type="submit" 
                style={{marginTop: "15px"}}
                onClick={() => {navigate('/help')}}>
                Help
            </Button>
            <div className="w-100 text-center mt-2">
            Already have an account? 
            <span onClick={() => navigate('/login')}
                style={{color: "coral", cursor: "pointer"}}> Log In</span>
            </div>
            </div>

        </Container>
    )
}

export default HomePage