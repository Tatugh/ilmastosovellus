import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from "react-bootstrap/Dropdown";


const LocationDisplay = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
    <div className='location-container'>        
          <button className='btn-add' onClick={handleShow}></button>
          <Modal className="modal" show={show} onHide={handleClose}>
            <Modal.Header className="modal-title" closeButton>
                <Modal.Title className="modal-title">Add a location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control size="lg" type="text" placeholder="Narnia" />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-primary" onClick={handleClose}>OK</button>
            </Modal.Footer>
          </Modal>
          
          <h1 className='current-location'>Mikkeli</h1>
          <Dropdown>
            <Dropdown.Toggle className="button-dots">•••</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="#action-1">Set as default location</Dropdown.Item>
                <Dropdown.Item href="#action-2">Delete location</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
          
      </div>
    )
}

export default LocationDisplay;