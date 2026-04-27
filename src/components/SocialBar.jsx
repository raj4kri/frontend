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

      <a href="https://wa.me/917903182706" target="_blank" rel="noreferrer">
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
  
<<<<<<< HEAD
  top: "30%",
  right: "10px",
    color: "#fff",
  transform: "translateY(50%)",
=======
  top: "50%",
  left: "10px",
    color: "#fff",
  transform: "translateY(-50%)",
>>>>>>> be47433 (commit)
  display: "flex",
  flexDirection: "column",
   borderRadius: "2px",
  gap: "15px",
  zIndex: 999
};

<<<<<<< HEAD
=======
<<<<<<< HEAD
const iconStyle = {
  background: "#000",
  color: "#fff",
  padding: "10px",
  borderRadius: "50%",
  fontSize: "18px",
  cursor: "pointer",
  transition: "0.3s"
};
>>>>>>> dec0e17 (initial commit)
=======
// const iconStyle = {
//   // background: "#000",
//   flexDirection: "column",
//   color: "#fff",
//   padding: "10px",
//   borderRadius: "50%",
//   fontSize: "18px",
//   cursor: "pointer",
//   transition: "0.3s"
// };
>>>>>>> ada2305 (commit)
>>>>>>> be47433 (commit)
