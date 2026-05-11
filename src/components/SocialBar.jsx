import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

function SocialBar() {
  return (
    <div style={container}>
      

          <a href="https://www.facebook.com/share/18sm2b7BkT/" target="_blank" rel="noreferrer">
        <FaFacebookF />
      </a>

      <a href="https://instagram.com" target="_blank" rel="noreferrer">
        <FaInstagram />
      </a>

      <a href="https://wa.me/919060211167" target="_blank" rel="noreferrer">
        <FaWhatsapp />
      </a>

      <a href="https://youtube.com/@deepakcommunicationpatna?si=XYGpV6zKKmcwk9Kw" target="_blank" rel="noreferrer">
        <FaYoutube />
      </a>
      
    
    </div>
  );
}

export default SocialBar;

// ===== STYLES =====
const container = {
  position: "fixed",
  
  top: "30%",
  right: "10px",
    color: "#fff",
  transform: "translateY(50%)",
  display: "flex",
  flexDirection: "column",
   borderRadius: "2px",
  gap: "15px",
  zIndex: 999
};

