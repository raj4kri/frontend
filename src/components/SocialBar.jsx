import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

function SocialBar() {
  return (
    <div style={container}>
      <a href="https://facebook.com" target="_blank" rel="noreferrer">
        <FaFacebookF />
      </a>

      <a href="https://instagram.com" target="_blank" rel="noreferrer">
        <FaInstagram />
      </a>

      <a href="https://wa.me/917903182706" target="_blank" rel="noreferrer">
        <FaWhatsapp />
      </a>

      <a href="https://youtube.com" target="_blank" rel="noreferrer">
        <FaYoutube />
      </a>
    </div>
  );
}

export default SocialBar;

// ===== STYLES =====
const container = {
  position: "fixed",
  top: "50%",
  left: "10px",
  transform: "translateY(-50%)",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  zIndex: 999
};

const iconStyle = {
  background: "#000",
  color: "#fff",
  padding: "10px",
  borderRadius: "50%",
  fontSize: "18px",
  cursor: "pointer",
  transition: "0.3s"
};