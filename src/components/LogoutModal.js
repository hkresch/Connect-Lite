import React, { useState, Component } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import LoginModal from "./LoginModal";
import { useAuth } from "../contexts/UserAuth";


const LogoutModal = () => {
    
    const { logout } = useAuth();
    console.log("hi")


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Logout
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button variant="primary" onClick={logout}>
                    Logout
                </Button>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary">
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        
        
        </>
    );
}

export default LogoutModal;

