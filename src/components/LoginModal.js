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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <div className="d-grid gap-2">
      <Button variant="primary" onClick={handleShow} size="lg">
        Signin
      </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
            onClick={() => logInWithEmailAndPassword(auth, email, password)}>
            Login
            </Button>
            <GoogleButton
        type="light"
        onClick={googleLogin}>
        Login with Google
        </GoogleButton>
        <Button onClick={() => Register}>
    Register
    </Button>
    <Button onClick={Reset}>
    Reset
    </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

 }

export default LoginModal;
