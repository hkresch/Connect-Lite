import { logout } from "../firebase";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import LoginModal from "./LoginModal";
import


const LogoutModal = () => {
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
            <Modal.Body>Are you sure you would like to logout?</Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button href="/login" variant="primary" onClick={() => {
                    logout();
                    handleClose();
                }}>
                    Logout
                    </Button>
            </Modal.Footer>
        </Modal>
        
        
        </>
    )
}

export default LogoutModal;