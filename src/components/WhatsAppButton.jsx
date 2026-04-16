function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      style={styles.button}
    >
      💬
    </a>
  );
}

const styles = {
  button: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#25D366",
    color: "white",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "30px",
    textDecoration: "none",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    zIndex: 1000
  }
};

export default WhatsAppButton;