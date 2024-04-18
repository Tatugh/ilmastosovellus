import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav-bar">
      <div className="nav-container">
        <div className="nav-item">
          <Link to="/">Weather</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
