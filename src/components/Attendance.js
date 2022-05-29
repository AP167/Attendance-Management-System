import React from 'react'
import { Button, Container, Card } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Webcam from 'react-webcam'

const videoConstraints = {
    width: 720,
    height: 560,
    facingMode: "user"
}

const Attendance = () => {
    let navigate = useNavigate()

    const { currentUser } = useAuth()
    
    
    const [image,setImage]=useState('');
    const webcamRef = React.useRef(null);

    
    const capture = React.useCallback(
        () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc)
        })


    // console.log(currentUser)
    if (!currentUser)
        return (
        <div>You cannot access this page. Return to 
            <span onClick={() => navigate('/')}
            style={{color: "coral", cursor: "pointer"}}> Home Page</span>
        </div>)


    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "600px" }} >
                <Card>
                    <Card.Body
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                            alignItems: "center"
                        }}>
                    <h2 className="text-center mb-4">Attendance</h2>
                    
                    <div className="webcam-container">
                        <div className="webcam-img">

                            {image === '' ? <Webcam
                                audio={false}
                                width={400}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={videoConstraints}
                            /> : <img src={image} />}
                        </div>
                        <div>
                            {image !== '' ?
                                <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-evenly",
                                    alignItems: "center"
                                }}>
                                    <p style={{
                                        textAlign: "center",
                                        width: "400px", 
                                        margin: "0", 
                                        marginTop: "15px"}}>
                                        Person detected : Me 
                                    </p>
                                    <Button  
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setImage('')
                                    }}
                                    style={{width: "400px", marginTop: "15px"}}>
                                        Retake Image
                                    </Button> 
                                    <Button  
                                    onClick={(e) => {
                                        e.preventDefault()
                                    }}
                                    style={{width: "400px", marginTop: "15px"}}>
                                        Record Attendance
                                    </Button>
                                </div>
                                    :
                                <Button onClick={(e) => {
                                    e.preventDefault();
                                    capture();
                                }}
                                style={{width: "400px", marginTop: "15px"}}>
                                    Capture</Button>
                            }
                        </div>
                    </div>
                    </Card.Body>
                </Card>
                </div>

            
        </Container>
    )
}

export default Attendance