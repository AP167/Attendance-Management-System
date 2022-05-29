import React from 'react'
import { Button, Container, Card, Alert, Form } from 'react-bootstrap'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ref, uploadBytes, getDownloadURL, listAll, list } from "firebase/storage"
import { storage, db } from "../firebase"
import { doc, setDoc , getDoc } from "firebase/firestore"
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

const Register = () => {
    let navigate = useNavigate()

    const { currentUser } = useAuth()
    
    
    const [image,setImage]=useState('');
    const webcamRef = React.useRef(null);

    const nameRef = useRef()
    const uidRef = useRef()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    adminFalse()


    function uploadImage(blob) {

        return new Promise(function(resolve, reject) {
        const imageRef = ref(storage, `images/${nameRef.current.value + uidRef.current.value}`)
        uploadBytes(imageRef, blob)
        .then(() => { resolve() })
        .catch(() => { reject() })
      })
    }

    function uploadData() {

      return new Promise(function(resolve, reject) {
      const pERef = doc(db, "pendingRegistrations", `${nameRef.current.value + uidRef.current.value}`)

      setDoc(pERef, {
        name: nameRef.current.value,
        uid: uidRef.current.value,
        imgurl: `images/${nameRef.current.value + uidRef.current.value}`
      })
      .then(() => { resolve() })
      .catch(() => { reject() })
    })
  }

    const registerEmployee = (e) => {
      e.preventDefault()
      Promise.all([
        uploadData(),
        loadXHR(image)
        .then((blob) => {uploadImage(blob)})
      ]).then(() => {
        alert("Your registration application is submitted. Please wait until someone verifies it.")
        navigate('/')
      })
      // try {
      //   setError("")
      //   setLoading(true)
      //   await login(emailRef.current.value, passwordRef.current.value)
      //   navigate('/')
      // } catch {
      //   setError("Failed to log in")
      // }
  
      setLoading(false)
    }


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
                    <h2 className="text-center mb-4">Register</h2>
                    
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
                                    {error && <Alert variant="danger">{error}</Alert>}
                                    <Form className='w-100' onSubmit={registerEmployee}>
                                      <Form.Group id="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" ref={nameRef} required />
                                      </Form.Group>
                                      <Form.Group id="uid">
                                        <Form.Label>Unique ID</Form.Label>
                                        <Form.Control type="text" ref={uidRef} required />
                                      </Form.Group>
                                      <Button disabled={loading} 
                                        className="w-100" 
                                        type="submit"
                                        style={{marginTop: "15px"}}>
                                        Register
                                      </Button>
                                    </Form>
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

export default Register