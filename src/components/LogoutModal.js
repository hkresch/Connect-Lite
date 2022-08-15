import React, { useState, Component } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import LoginModal from "./LoginModal";
import { useAuth } from "../contexts/UserAuth";


const LogoutModal = () => {
    
    const { logout, user, authenticated } = useAuth();
    console.log("hi")


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Button onClick={handleShow} style={{display: 'flex', marginLeft: 'auto'}}>Logout</Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Would you like to Logout?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button variant="default" onClick={logout}>
                    Logout
                </Button>
                <Button variant="primary" onClick={handleClose} style={{marginLeft: 'auto'}}>
                    Stay Signed In
                </Button>
            </Modal.Body>
        </Modal>
        
        
        </>
    );
}

export default LogoutModal;

