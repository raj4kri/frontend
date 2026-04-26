import React, { useState } from "react";

function Contact() {
  const API = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    dob: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Validation
  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.includes("@")) return "Valid email required";
    if (form.phone && form.phone.length < 10)
      return "Phone must be 10 digits";
    return null;
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      showToast(error, "error");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        showToast("Message sent successfully ✅", "success");

        setForm({
          name: "",
          email: "",
          phone: "",
          whatsapp: "",
          dob: "",
          message: "",
        });
      } else {
        showToast(data.error || "Something went wrong ❌", "error");
      }
    } catch (err) {
      showToast("Server error ❌", "error");
    }

    setLoading(false);
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  return (
    <div style={container}>
      
      {/* ✅ SEO (IMPORTANT) */}
      <title>Contact | Deepak Communication</title>
      <meta
        name="description"
        content="Contact Deepak Communication for mobile repair in Rukanpura, Patna. Call or WhatsApp for fast service."
      />

      {/* ✅ TOAST */}
      {toast.show && (
        <div
          style={{
            ...toastStyle,
            background: toast.type === "success" ? "#28a745" : "#dc3545",
          }}
        >
          {toast.message}
        </div>
      )}

      <h1 style={title}>Contact Us</h1>
      <p style={subtitle}>
        Get in touch for fast mobile repair service
      </p>

      <div style={wrapper}>
        {/* FORM */}
        <div style={formBox}>
          <h3 style={sectionTitle}>Send Message</h3>

          <form onSubmit={handleSubmit}>
            <input style={input} name="name" placeholder="Name" value={form.name} onChange={handleChange} required />

            <input style={input} name="email" placeholder="Email" value={form.email} onChange={handleChange} required />

            <input style={input} name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />

            <input style={input} name="whatsapp" placeholder="WhatsApp Number" value={form.whatsapp} onChange={handleChange} />

            <input style={input} type="date" name="dob" value={form.dob} onChange={handleChange} />

            <textarea style={textarea} name="message" placeholder="Message" value={form.message} onChange={handleChange} required />

            <button style={button} disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* INFO */}
        <div style={infoBox}>
          <h3 style={sectionTitle}>Contact Information</h3>

          <p style={info}>📞 <a href="tel:7903182706">+91 7903182706</a></p>
          <p style={info}>📧 deepakcommunication@gmail.com</p>
          <p style={info}>📍 Rukanpura, Patna, Bihar</p>

          <iframe
            title="map"
            src="https://www.google.com/maps?q=Deepak+Communication+Rukanpura&output=embed"
            style={map}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;

/* ===== STYLES ===== */

const toastStyle = {
  position: "fixed",
  top: "20px",
  right: "20px",
  padding: "12px 20px",
  borderRadius: "8px",
  color: "#fff",
  zIndex: 9999,
};

const container = {
  background: "#121212",
  color: "white",
  minHeight: "100vh",
  padding: "40px 20px",
  textAlign: "center",
};

const title = {
  color: "#ffcc00",
  fontSize: "32px",
};

const subtitle = {
  color: "#aaa",
  marginBottom: "30px",
};

const wrapper = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "center",
};

const formBox = {
  flex: "1",
  minWidth: "300px",
  background: "#1e1e1e",
  padding: "20px",
  borderRadius: "15px",
  border: "1px solid #ffcc00",
};

const infoBox = {
  flex: "1",
  minWidth: "300px",
  background: "#1e1e1e",
  padding: "20px",
  borderRadius: "15px",
  border: "1px solid #ffcc00",
};

const sectionTitle = {
  color: "#ff9800",
  marginBottom: "15px",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ffcc00",
  background: "#121212",
  color: "white",
};

const textarea = {
  ...input,
  height: "100px",
};

const button = {
  background: "#ffcc00",
  color: "black",
  padding: "10px",
  border: "none",
  width: "100%",
  borderRadius: "5px",
  cursor: "pointer",
};

const info = {
  marginBottom: "10px",
  color: "#ccc",
};

const map = {
  width: "100%",
  height: "200px",
  border: "0",
  marginTop: "15px",
  borderRadius: "10px",
};