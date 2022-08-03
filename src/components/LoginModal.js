import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useAuth} from '../contexts/UserAuth';
import "../styles/Login.css"
import GoogleButton from 'react-google-button';
import Register from '../pages/Register';
import Reset from '../pages/Reset';



 const LoginModal = () => {

  const {logInWithEmailAndPassword, googleLogin, auth, registerWithEmailAndPassword } = useAuth();
  // const name = useAuth();
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const [showlogin, setShowLogin] = useState("")
  const [showRegister, setShowRegister] = useState("")
  const [showReset, setShowReset] = useState("")

  return (
    <>
    <div className="d-grid gap-2">
     <Button onClick={() => setShowLogin(true)}>
        Login!
      </Button>
      <Button onClick={() => setShowRegister(true)}>
        Register!
      </Button>

      <Button onClick={() => setShowReset(true)}>
        Reset Password
      </Button>
      </div>

      <Modal
        show={showlogin}
        onHide={() => setShowLogin(false)}>
          <Modal.Header closeButton>
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

        <Modal
        show={showRegister}
        onHide={() => setShowRegister(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              Register
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
              type="name"
              placeholder="Full Name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
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
            onSubmit={registerWithEmailAndPassword(auth, name, email, password)}>
            Register
            </Button>
            <GoogleButton
        type="light"
        onClick={googleLogin}>
        Register with Google
        </GoogleButton>
        </Form>
          </Modal.Body>
        </Modal> </>
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