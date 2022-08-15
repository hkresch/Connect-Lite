import React, {useState} from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'


const ShowModal = ({showName}) => {

    const [show, setShow] = useState(false);

    handleClose = () => setShow(false);
    handleShow = () => setShow(true)

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Launch
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Rate {showName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Ranking</Form.Label>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
        </>
    )


}