// src/components/Navbar.jsx

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav style={nav}>
      {/* LOGO */}
      <div style={logo}>📱 </div>

      {/* HAMBURGER */}
      <div style={hamburger} onClick={toggleMenu}>
        {isOpen ? "✖" : "☰"}
      </div>

      {/* MENU */}
      <div
        style={{
          ...menu,
          transform: isOpen ? "translateY(0)" : "translateY(-120%)",
        }}
      >
        <Link to="/" style={link} onClick={toggleMenu}>Home</Link>
        <Link to="/products" style={link} onClick={toggleMenu}>Products</Link>
        <Link to="/services" style={link} onClick={toggleMenu}>Services</Link>
        <Link to="/about" style={link} onClick={toggleMenu}>About</Link>
        <Link to="/contact" style={link} onClick={toggleMenu}>Contact</Link>

        <button
          style={loginBtn}
          onClick={() => {
            navigate("/login");
            toggleMenu();
          }}
        >
          Admin Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

/* ================= STYLES ================= */

const nav = {
  background: "#000",
  color: "#fff",
  padding: "15px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative",
};

const logo = {
  fontWeight: "bold",
  fontSize: "18px",
};

const hamburger = {
  fontSize: "24px",
  cursor: "pointer",
};

const menu = {
  position: "absolute",
  top: "60px",
  left: 0,
  width: "100%",
  background: "#111",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px",
  padding: "20px 0",
  transition: "transform 0.4s ease-in-out", // ⭐ animation
  zIndex: 1000,
};

const link = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "18px",
};

const loginBtn = {
  padding: "10px 20px",
  background: "red",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
