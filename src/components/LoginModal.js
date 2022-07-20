import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import Loader from './Loader';
import Form from 'react-bootstrap/Form';
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import "../styles/Login.css"
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from "react-router-dom";



 const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useState("");
  const [show, setShow] = useState(false);

  //if (loading) return <Loader/>;

  const handleClose = () => setShow(false)
  const handleOpen = () => setShow(true)

  if (user) handleClose()

  return (
    <>
    <Modal
    onClick={handleOpen}
    show = {show}
    backdrop = "static">

      <Modal.Header>
        <Modal.Title>Login to TV Show Lite!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId='formBasicEmail'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
            type="email"
            placeholder='name@domain.com'
            value="email"
            onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId='formBasicPassword'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
          <Button variant='primary' type='submit'
          onClick={() => signInWithEmailAndPassword(email, password)}>
            Login
          </Button>
          <GoogleButton
          type="light"
          onClick={signInWithGoogle}>
            Login with Google
          </GoogleButton>
          <Button>
            <Link to="../pages/Reset">Forgot Password</Link>
          </Button>
          <Button>
            Don't have an account? <Link to="../pages/Register">Register</Link>now.
          </Button>
        </Form>
      </Modal.Body>
    </Modal>

    </>

  );

 }

export default LoginModal;




