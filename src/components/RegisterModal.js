import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useAuth} from '../contexts/UserAuth';
import "../styles/Login.css"
import GoogleButton from 'react-google-button';



 const RegisterModal = () => {

  const { auth, registerWithEmailAndPassword  } = useAuth();
  // const name = useAuth();
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Button variant="primary" onClick={handleShow} size="lg">
        Register
    </Button>

      <Modal onClick={handleShow} show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
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
            <Button variant='primary' type='submit' onClick={() => registerWithEmailAndPassword(auth, email, password)}>
            Hello </Button>
            <GoogleButton
        type="light"
        onClick={googleLogin}>
        Register with Google
        </GoogleButton>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

 }

export default RegisterModal;