import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from "react-bootstrap/Dropdown";


const LocationDisplay = () => {
    const [show, setShow] = useState(false);
    const [query, setQuery] = useState("")
    const [locations, setLocations] = useState([])
    const [selectedLocation, setLocation] = useState(undefined)
    const [locationName, _] = useState(localStorage.getItem("locationData"))
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Constructs new 'locData' array which contains 5 locations as objects from fetched data
    // Then sets the data as valid JSON string to localStrorage with key of 'locationData'
    // When you get 'locationData' from localStorage you have to parse the JSON string data with builtin function
    // 'JSON.parse()'. This returns a valid JSON object which then can be used for later purposes
    const locationDataCleaner = (data) => {//clean up data to get rid of unnecessary info and add expiration
        const locData = data.results.map((location) => {
            return {
                name: location.name,
                longitude: location.longitude,
                latitude: location.latitude,
                expiration: Date.now() + 1000 * 60 * 60 // 1 hour in milliseconds

            }
        })
        setLocations(locData)
    }

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault()    
    
        fetch(`http://localhost:3001/api/location/data?q=${query}`, {
            method: "POST"
        }).then((res) => {
            return res.json()  
        }).then((locData) => {
            locationDataCleaner(locData)
        }).catch((err) => {
            console.error(err)
        })
    }

    //save selected location to localStorage, empty out locations and reload page to see changes
    const handleSubmit = () => {
        localStorage.setItem("locationData", JSON.stringify(selectedLocation))
        console.log(JSON.stringify(selectedLocation))
        setLocations([])    
        window.location.reload()
    }

    if(!localStorage.getItem("locationData")) {
        localStorage.setItem("locationData", JSON.stringify({"name":"Mikkeli"}))
    }
    
    return (
    <div className='location-container'>        
          <button className='btn-add' onClick={handleShow}></button>
          <Modal className="modal" show={show} onHide={handleClose}>
            <Modal.Header className="modal-title" closeButton>
                <Modal.Title className="modal-title">Add a location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleClose}>
                    <Form.Control size="lg" type="text" placeholder="Narnia" onChange={handleChange}/>
                    <Modal.Footer>
                        <button type="button" className="btn btn-primary" onClick={handleSearch}>Search</button>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>OK</button>
                    </Modal.Footer>
                </Form>
                {locations.length > 0 && (
                    <div className="locations-list">
                    <h2>Locations</h2>
                    {locations.map((location, index) => (
                        <ul key={index}>
                            <input type="radio" id={`location-${index}`} name="selectedLocation" value={location} onChange={(e) => setLocation(location)} />
                            <label for={`location-${index}`}>{location.name} - Longitude: {location.longitude} Latitude: {location.latitude}</label>
                        </ul>
                        ))}
                    </div>
                )}
            </Modal.Body>
          </Modal>
          
          <h1 className='current-location'>{JSON.parse(locationName).name}</h1>
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