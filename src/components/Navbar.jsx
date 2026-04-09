import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



<button onClick={() => navigate("/login")}>
  Admin Login
</button>

function Navbar() {

  const navigate = useNavigate();
  return (
    <nav style={{ padding: "15px", background: "black" }}>
  <Link to="/" style={{ color: "white", marginRight: "20px" }}>Home</Link>
  <Link to="/products" style={{ color: "white", marginRight: "20px" }}>Products</Link>
  <Link to="/services" style={{ color: "white", marginRight: "20px" }}>Services</Link>
  <Link to="/about" style={{ color: "white", marginRight: "20px" }}>About Us</Link>
  <Link to="/contact" style={{ color: "white", marginRight: "20px" }}>Contact</Link>
  
  
  {/* <Link to="/admin" style={{ color: "white" }}>Admin</Link> */}
  <button onClick={() => navigate("/login")}>
  Admin Login
</button>
</nav>

  );
  
}

export default Navbar;
