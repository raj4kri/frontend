import logoImg from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={nav}>
      {/* LOGO */}
      <Link to="/" style={logoContainer}>
<<<<<<< HEAD
        <img src={logoImg} alt="Logo" style={logoImgStyle} />
        <span style={logoText}>Deepak Communication</span>
      </Link>

=======
  <img src={logoImg} alt="Logo" style={logoImgStyle} />
  <span style={logoText}>Deepak Communication</span>
</Link>
>>>>>>> be47433 (commit)
      {/* DESKTOP MENU */}
      <div className="desktop-menu">
        <Link to="/" style={link}>Home</Link>
        <Link to="/products" style={link}>Products</Link>
        <Link to="/services" style={link}>Services</Link>
        <Link to="/about" style={link}>About</Link>
        <Link to="/contact" style={link}>Contact</Link>

        <button style={loginBtn} onClick={() => navigate("/login")}>
          Admin
        </button>
      </div>

      {/* HAMBURGER */}
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
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/products" onClick={() => setIsOpen(false)}>Products</Link>
        <Link to="/services" onClick={() => setIsOpen(false)}>Services</Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>

        <button
          style={loginBtnMobile}
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
          gap: 25px;
          align-items: center;
        }

        .desktop-menu a {
          color: #e5e7eb;
          text-decoration: none;
          font-size: 15px;
          position: relative;
          transition: 0.3s;
        }

        .desktop-menu a:hover {
          color: #fff;
        }

        .desktop-menu a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0%;
          height: 2px;
          background: #facc15;
          transition: 0.3s;
        }

        .desktop-menu a:hover::after {
          width: 100%;
        }

        .hamburger {
          font-size: 26px;
          cursor: pointer;
          color: white;
        }

        .mobile-menu {
          position: absolute;
          top: 70px;
          left: 0;
          width: 100%;
          background: rgba(17,17,17,0.98);
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          padding: 25px 0;
          transition: transform 0.4s ease-in-out;
          z-index: 1000;
        }

        .mobile-menu a {
          color: #e5e7eb;
          font-size: 16px;
          text-decoration: none;
        }

        .mobile-menu a:hover {
          color: #fff;
        }

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

<<<<<<< HEAD
=======
const logoText = {
  fontWeight: "bold",
  fontSize: "18px",
  color: "#fff",
  textDecoration: "none",
};
const logoContainer = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  textDecoration: "none"
};

const logoImgStyle = {
  height: "60px", // adjust
  width: "auto",
};

/* STYLES */
>>>>>>> be47433 (commit)
const nav = {
  background: "rgba(0,0,0,0.85)",
  backdropFilter: "blur(10px)",
  color: "#fff",
  padding: "12px 30px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  borderBottom: "1px solid rgba(255,255,255,0.05)",
};

<<<<<<< HEAD
const logoContainer = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  textDecoration: "none",
};

const logoImgStyle = {
  height: "45px",
};

const logoText = {
  fontWeight: "600",
  fontSize: "16px",
  color: "#fff",
};
=======
// const logo = {
//   fontWeight: "bold",
//   fontSize: "18px",
// };
>>>>>>> be47433 (commit)

const link = {
  color: "#e5e7eb",
};

const loginBtn = {
  padding: "7px 16px",
  background: "linear-gradient(135deg,#ff0000,#ff9900)",
  color: "#fff",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
<<<<<<< HEAD
  fontSize: "14px",
};

const loginBtnMobile = {
  padding: "10px 20px",
  background: "#facc15",
  color: "#000",
  border: "none",
  borderRadius: "25px",
  fontWeight: "600",
};
=======
<<<<<<< HEAD
};
>>>>>>> dec0e17 (initial commit)
=======
};
>>>>>>> ada2305 (commit)
>>>>>>> be47433 (commit)
