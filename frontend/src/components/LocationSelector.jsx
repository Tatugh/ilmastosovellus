import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Notification from "./Notification";

const LocationDisplay = ({ onLocationChange, port }) => {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(undefined);
  const [savedLocations, setSavedLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(
    JSON.parse(localStorage.getItem("locationData")) || {
      name: "Mikkeli",
    }
  );

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedLocations")) || [];
    setSavedLocations(saved);
  }, []);

  const handleClose = () => {
    setShow(false);
    setNotification(null);
  };
  const handleShow = () => setShow(true);

  const locationDataCleaner = (data) => {
    if (data) {
      const locData = data.results.map((location) => ({
        name: location.name,
        longitude: location.longitude,
        latitude: location.latitude,
        expiration: Date.now() + 1000 * 60 * 60, // 1 hour in milliseconds
      }));
      setLocations(locData);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      fetch(`http://localhost:${port}/api/location/data?q=${query}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then(locationDataCleaner)
        .catch(console.error);
    }
  };

  const isLocationAlreadySaved = (location) => {
    return savedLocations.some(
      (savedLoc) =>
        savedLoc.latitude === location.latitude &&
        savedLoc.longitude === location.longitude
    );
  };

  const handleSubmit = () => {
    if (selectedLocation) {
      if (!isLocationAlreadySaved(selectedLocation)) {
        const updatedSavedLocations = [...savedLocations, selectedLocation];
        localStorage.setItem(
          "savedLocations",
          JSON.stringify(updatedSavedLocations)
        );
        setSavedLocations(updatedSavedLocations);
        handleClose();
        setCurrentLocation(selectedLocation);
        localStorage.setItem("locationData", JSON.stringify(selectedLocation));
        onLocationChange(selectedLocation);
        setQuery("");
        setLocations([]);
        setSelectedLocation("");
      }

      setNotification({
        type: "warning",
        message: "The currently selected location is already saved.",
      });

      setTimeout(() => setNotification(null), 3000);
    }
  };

  const switchLocation = (location) => {
    setCurrentLocation(location);
    localStorage.setItem("locationData", JSON.stringify(location));
    onLocationChange(location);
  };

  const deleteLocation = (locationToDelete) => {
    const updatedLocations = savedLocations.filter(
      (loc) => loc.name !== locationToDelete.name
    );
    setSavedLocations(updatedLocations);
    localStorage.setItem("savedLocations", JSON.stringify(updatedLocations));
    if (currentLocation.name === locationToDelete.name) {
      const newCurrentLocation = updatedLocations[0] || {
        name: "Mikkeli",
      };
      setCurrentLocation(newCurrentLocation);
      localStorage.setItem("locationData", JSON.stringify(newCurrentLocation));
      onLocationChange(newCurrentLocation);
    }
  };

  return (
    <div className="location-container">
      <button className="btn-add" onClick={handleShow}></button>
      <Modal className="modal" show={show} onHide={handleClose}>
        <Modal.Header className="modal-title" closeButton>
          <Modal.Title className="modal-title">Add a location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Notification
            notification={notification}
            onClose={() => setNotification(null)}
          />
          <Form onSubmit={handleSearch}>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Narnia"
              onChange={handleChange}
            />
            <Modal.Footer>
              <button type="submit" className="btn btn-primary">
                Search
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                OK
              </button>
            </Modal.Footer>
          </Form>
          {locations.length > 0 && (
            <div className="locations-list">
              <h2>Locations</h2>
              {locations.map((location, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    id={`location-${index}`}
                    name="selectedLocation"
                    checked={selectedLocation === location}
                    onChange={() => setSelectedLocation(location)}
                  />
                  <label htmlFor={`location-${index}`}>
                    {location.name} - Longitude: {location.longitude} Latitude:{" "}
                    {location.latitude}
                  </label>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* <div className="current-location"> */}
      <h1 className="current-location text-3xl md:text-4xl xl:text-5xl">
        {currentLocation.name}
      </h1>
      <Dropdown>
        <Dropdown.Toggle className="button-dots">•••</Dropdown.Toggle>
        <Dropdown.Menu>
          {savedLocations.length === 0 && <p> Added Locations Quick Switch </p>}
          {savedLocations.map((location, index) => (
            <Dropdown.Item key={index} onClick={() => switchLocation(location)}>
              {location.name}
            </Dropdown.Item>
          ))}
          <Dropdown.Divider />
          {savedLocations.map((location, index) => (
            <Dropdown.Item
              key={`delete-${index}`}
              onClick={() => deleteLocation(location)}
            >
              Delete {location.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
    // </div>
  );
};

export default LocationDisplay;
