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
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.includes("@")) return "Valid email required";
    if (form.phone && form.phone.length < 10)
      return "Phone must be 10 digits";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) return showToast(error, "error");

    setLoading(true);

    try {
      const res = await fetch(`${API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    } catch {
      showToast("Server error ❌", "error");
    }

    setLoading(false);
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false }), 3000);
  };

  return (
    <div style={container}>
      
      {toast.show && (
        <div style={{
          ...toastStyle,
          background: toast.type === "success" ? "#22c55e" : "#ef4444",
        }}>
          {toast.message}
        </div>
      )}

      <h1 style={title}>Contact Us</h1>
      <p style={subtitle}>We’re here to help you 24/7</p>

      <div style={wrapper}>
        
        {/* FORM */}
        <div style={card}>
          <h3 style={sectionTitle}>Send Message</h3>

          <form onSubmit={handleSubmit}>
            <input style={input} name="name" placeholder="Your Name" value={form.name} onChange={handleChange} />
            <input style={input} name="email" placeholder="Your Email" value={form.email} onChange={handleChange} />
            <input style={input} name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
            <input style={input} name="whatsapp" placeholder="WhatsApp Number" value={form.whatsapp} onChange={handleChange} />
            <input style={input} type="date" name="dob" value={form.dob} onChange={handleChange} />
            <textarea style={textarea} name="message" placeholder="Write your message..." value={form.message} onChange={handleChange} />

            <button style={button} disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* INFO */}
        <div style={card}>
          <h3 style={sectionTitle}>Contact Info</h3>

          <p style={info}>📞 +91 9060211167</p>
          <p style={info}>📧 deepakcommunication@gmail.com</p>
          <p style={info}>📍 Rukanpura, Patna</p>

        <iframe
  title="map"
  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14737181.092934467!2d85.0703517!3d25.606757!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed57357efa063b%3A0x5a1c560354834672!2sDeepak%20Communication!5e0!3m2!1sen!2sin!4v1777373452245!5m2!1sen!2sin"
  style={map}
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
        </div>

      </div>
    </div>
  );
}

export default Contact;

/* ===== STYLES ===== */

const container = {
  background: "#0f172a",
  minHeight: "100vh",
  padding: "50px 20px",
  textAlign: "center",
  color: "#fff",
};

const title = {
  fontSize: "32px",
  fontWeight: "700",
};

const subtitle = {
  color: "#94a3b8",
  marginBottom: "40px",
};

const wrapper = {
  display: "flex",
  gap: "25px",
  flexWrap: "wrap",
  justifyContent: "center",
};

const card = {
  flex: "1",
  minWidth: "320px",
  maxWidth: "500px",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(12px)",
  borderRadius: "20px",
  padding: "25px",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
};

const sectionTitle = {
  marginBottom: "15px",
  fontSize: "20px",
  fontWeight: "600",
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  outline: "none",
};

const textarea = {
  ...input,
  height: "100px",
};

const button = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
};

const info = {
  marginBottom: "10px",
  color: "#cbd5f5",
};

const map = {
  width: "100%",
  height: "220px",
  borderRadius: "12px",
  marginTop: "15px",
  border: "none",
};

const toastStyle = {
  position: "fixed",
  top: "20px",
  right: "20px",
  padding: "12px 20px",
  borderRadius: "8px",
  color: "#fff",
  zIndex: 999,
};