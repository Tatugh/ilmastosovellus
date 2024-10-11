import React from "react";
import Alert from "react-bootstrap/Alert";

const Notification = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <Alert variant={notification.type} onClose={onClose} dismissible>
      {notification.message}
    </Alert>
  );
};

export default Notification;
