import { collection, getDocs } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import React from 'react'
import { Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { db, storage } from '../firebase'
import { isAdmin } from './App'


// async function getMarker() {
//   const collRef = 
//   const snapshot = await 
//   return snapshot.docs.map(doc => doc.data());
// }

const Admin = () => {
  let navigate = useNavigate()
  const { currentUser } = useAuth()

  const imageListRef = ref(storage, 'images/')

  if (!currentUser || !isAdmin()){
    return (
    <div>You cannot access this page. Return to 
        <span onClick={() => navigate('/')}
        style={{color: "coral", cursor: "pointer"}}> Home Page</span>
    </div>)}
  
  getDocs(collection(db, 'pendingRegistrations'))
  .then((snapshot) => {
    const m = snapshot.docs.map(doc => doc.data())
    const parent = document.getElementById('pR')
    
    m.forEach((person) => {
      const d = document.createElement("div")
      d.innerHTML=`<p>${person.name}</p><p>${person.uid}</p>`
      parent.append(d)
    })
  })
  // const m = getMarker()
  // console.log("value", m)
  


  return (
    <Container style={{display: "flex", justifyContent: "space-evenly", alignItems: "center", margin: "20px", width: "100vw", height: "100vh"}}>
      <div style={{width: "50vw", height: "90vh"}}>
        <Card style={{width: "45vw", height: "100%"}}>
          <Card.Body id='pR'>

          </Card.Body>
        </Card>
      </div>
      <div style={{width: "50vw", height: "90vh"}}>
        <Card style={{width: "45vw", height: "100%"}}>
          <Card.Body>

          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}

export default Admin