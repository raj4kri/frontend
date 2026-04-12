// src/components/Navbar.jsx
import logoImg from "../assets/logo.png"; // adjust path
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={nav}>
      {/* LOGO */}
       <img src={logoImg} alt="logo" style={logoImgStyle} />

      {/* DESKTOP MENU */}
      <div className="desktop-menu">
        <Link to="/" style={link}>Home</Link>
        <Link to="/products" style={link}>Products</Link>
        <Link to="/services" style={link}>Services</Link>
        <Link to="/about" style={link}>About</Link>
        <Link to="/contact" style={link}>Contact</Link>

        <button style={loginBtn} onClick={() => navigate("/login")}>
          Admin Login
        </button>
      </div>

      {/* HAMBURGER (MOBILE ONLY) */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖" : "☰"}
      </div>

      {/* MOBILE MENU */}
      <div
        className="mobile-menu"
        style={{
          transform: isOpen ? "translateY(0)" : "translateY(-120%)",
        }}
      >
        <Link to="/" style={link} onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/products" style={link} onClick={() => setIsOpen(false)}>Products</Link>
        <Link to="/services" style={link} onClick={() => setIsOpen(false)}>Services</Link>
        <Link to="/about" style={link} onClick={() => setIsOpen(false)}>About</Link>
        <Link to="/contact" style={link} onClick={() => setIsOpen(false)}>Contact</Link>

        <button
          style={loginBtn}
          onClick={() => {
            navigate("/login");
            setIsOpen(false);
          }}
        >
          Admin Login
        </button>
      </div>

      {/* CSS */}
      <style>{`
        .desktop-menu {
          display: none;
          gap: 20px;
          align-items: center;
        }

        .hamburger {
          font-size: 24px;
          cursor: pointer;
        }

        .mobile-menu {
          position: absolute;
          top: 60px;
          left: 0;
          width: 100%;
          background: #111;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          padding: 20px 0;
          transition: transform 0.4s ease-in-out;
          z-index: 1000;
        }

        /* ✅ DESKTOP VIEW */
        @media (min-width: 768px) {
          .desktop-menu {
            display: flex;
          }

          .hamburger {
            display: none;
          }

          .mobile-menu {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;


const logoContainer = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const logoImgStyle = {
  height: "60px", // adjust
  width: "auto",
};

/* STYLES */
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

const link = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "16px",
};

const loginBtn = {
  padding: "8px 15px",
  background: "red",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
