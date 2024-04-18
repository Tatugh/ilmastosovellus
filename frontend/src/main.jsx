import ReactDOM from "react-dom/client";
import React, { useState } from "react";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Terms from "./Pages/Terms.jsx";

export default function Main() {
  return (
    <BrowserRouter>
      <nav className="navbar-container">
        <Navbar />
      </nav>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
