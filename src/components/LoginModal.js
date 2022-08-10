import { Image } from 'antd'
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useAuth} from '../contexts/UserAuth';
import "../styles/Login.css"
import GoogleButton from 'react-google-button';
import Register from '../pages/Register';
import Reset from '../pages/Reset';
import { lightBlue } from '@mui/material/colors';




 const LoginModal = () => {

  const {logInWithEmailAndPassword, googleLogin, auth, registerWithEmailAndPassword } = useAuth();
  // const name = useAuth();
 

  const [showlogin, setShowLogin] = useState(true)

  return (
    <div >
      <Modal
        show={showlogin}
        
        >
          <Modal.Header >
            <Modal.Title>
              Login
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <GoogleButton
        type="light"
        onClick={googleLogin}>
        Login with Google
        </GoogleButton>
        </Form>
          </Modal.Body>
        </Modal>

 </div>
  );

 }

export default LoginModal;




{/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
<Form.Label>Email address</Form.Label>
<Form.Control
  type="email"
  placeholder="name@example.com"
  autoFocus
  onChange={(e) => setEmail(e.target.value)}
/>
</Form.Group>
<Form.Group
className="mb-3"
controlId="exampleForm.ControlTextarea1"
>
<Form.Label>Password</Form.Label>
<Form.Control                
  type="password"
  placeholder=""
  onChange={(e) => setPassword(e.target.value)}  />
</Form.Group>
<Button variant='primary' type='submit'
onSubmit={logInWithEmailAndPassword(auth, email, password)}>
Login
</Button> */}