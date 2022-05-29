import React from 'react'
import { Button, Container, Card } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Webcam from 'react-webcam'
import * as faceapi from 'face-api.js'
import './CanvasPos.css'
import { adminFalse } from './App'

const videoConstraints = {
    width: 720,
    height: 560,
    facingMode: "user"
}

function loadXHR(url) {

    return new Promise(function(resolve, reject) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.responseType = "blob";
            xhr.onerror = function() {reject("Network error.")};
            xhr.onload = function() {
                if (xhr.status === 200) {resolve(xhr.response)}
                else {reject("Loading error:" + xhr.statusText)}
            };
            xhr.send();
        }
        catch(err) {reject(err.message)}
    });
}

const Attendance = () => {
    let navigate = useNavigate()

    const { currentUser } = useAuth()
    
    
    const [image,setImage]=useState('');
    const webcamRef = React.useRef(null);

    adminFalse()

    
    const capture = React.useCallback(
        () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc)
        })


    // console.log(currentUser)
    if (!currentUser){
        return (
        <div>You cannot access this page. Return to 
            <span onClick={() => navigate('/')}
            style={{color: "coral", cursor: "pointer"}}> Home Page</span>
        </div>)}

    let canvas = null
    const getCanvas = () => {
        // console.log(image)
        Promise.all([
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
          ]).then(() => {loadXHR(image)
                .then((blob) => {
                    faceapi.bufferToImage(blob)
                    .then((bimage) => {
                        canvas = faceapi.createCanvasFromMedia(bimage)
                        document.getElementById('webcam-img').append(canvas)
                        const displaySize = { width: bimage.width, height: bimage.height }
                        faceapi.matchDimensions(canvas, displaySize)
                        faceapi.detectAllFaces(bimage).withFaceLandmarks().withFaceDescriptors()
                        .then((detections) => {
                            const resizedDetections = faceapi.resizeResults(detections, displaySize)
                            resizedDetections.forEach(detection => {
                                const box = detection.detection.box
                                const drawBox = new faceapi.draw.DrawBox(box, { label: 'Face' })
                                drawBox.draw(canvas)
                            })
                        })
                    })
                    .catch((err) => {console.log(err)})
                })
            })
        
        
        
        return <></>
    }

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
                        <div className="webcam-img" id='webcam-img'>
                            {image === '' ? <></> : getCanvas()}

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
                                        // console.log("canvas  " + canvas)
                                        if (canvas) {
                                            const items = document.querySelectorAll("canvas");
                                            for (let item of items) {
                                                item.remove();
                                            }
                                            // console.log("clearing canvas")
                                            // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
                                            // canvas.remove()
                                        }
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