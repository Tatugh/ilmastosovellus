import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <p className="text-white text-sm footer-p">
          Copyright &copy; {new Date().getFullYear()} Your Company Name
        </p>
        <nav>
          <div className="nav-item footer-p">
            <Link to="/terms" style={{ color: "white" }}>
              Terms of Service
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
