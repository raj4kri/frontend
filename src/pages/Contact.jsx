import React, { useState } from "react";

function Contact() {
  const API = import.meta.env.VITE_API_URL;


  // ✅ FORM STATE
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    dob: "",
    message: "",
  });


  // 👉 YAHAN ADD KARO
const [toast, setToast] = useState({
  show: false,
  message: "",
  type: "",
});

  

  // ✅ HANDLE CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ HANDLE SUBMIT
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`${API}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    // 🔍 DEBUG
    console.log("RESPONSE:", data);

 if (res.ok) {
  setToast({
    show: true,
    message: "Message sent successfully ✅",
    type: "success",
  });
  setTimeout(() => {
  setToast({ show: false, message: "", type: "" });
}, 3000);

  setForm({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    dob: "",
    message: "",
  });
} else {
  setToast({
    show: true,
    message: data.error || "Something went wrong ❌",
    type: "error",
  });

    setTimeout(() => {
    setToast({ show: false, message: "", type: "" });
  }, 3000);
}

  } catch (err) {
  setToast({
    show: true,
    message: "Server error ❌",
    type: "error",
  });
   // ✅ ADD THIS
  setTimeout(() => {
    setToast({ show: false, message: "", type: "" });
  }, 3000);


}


};
  return (
    <div style={container}>


      {/* ✅ TOAST */}
{toast.show && (
  <div
   style={{
  position: "fixed",
  top: "20px",
  right: "20px",
  padding: "12px 20px",
  borderRadius: "8px",
  color: "#fff",
  background:
    toast.type === "success" ? "#28a745" : "#dc3545",
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  zIndex: 9999,
  transform: toast.show ? "translateX(0)" : "translateX(100%)",
  transition: "all 0.3s ease",
}}
  >
    {toast.message}
  </div>
)}

    
      <h1 style={title}>Contact Us</h1>
      <p style={subtitle}>Get in touch with us for any mobile repair service</p>

      <div style={wrapper}>
        {/* LEFT SIDE - FORM */}
        <div style={formBox}>
          <h3 style={sectionTitle}>Send Message</h3>

          <form onSubmit={handleSubmit}>
            <input
              style={input}
              name="name"
              placeholder="Name"
              value={form.name || ""}
              onChange={handleChange}
              required
            />

            <input
              style={input}
              name="email"
              placeholder="Email"
              value={form.email || ""}
              onChange={handleChange}
              required
            />

            <input
              style={input}
              name="phone"
              placeholder="Phone"
              value={form.phone || ""}
              onChange={handleChange}
            />

            <input
              style={input}
              name="whatsapp"
              placeholder="WhatsApp Number"
             value={form.whatsapp || ""}
              onChange={handleChange}
            />

            <input
              style={input}
              type="date"
              name="dob"
             value={form.dob || ""}
              onChange={handleChange}
            />

            <textarea
              style={textarea}
              name="message"
              placeholder="Message"
              value={form.message || ""}
              onChange={handleChange}
              required
            />

            <button style={button} type="submit">
              Send Message
            </button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div style={infoBox}>
          <h3 style={sectionTitle}>Contact Information</h3>

          <p style={info}>📞 +91 7903182706</p>
          <p style={info}>📧 deepakcommunication@gmail.com</p>
          <p style={info}>📍 Petrol Pump, Rukanpura, Patna, Bihar</p>

          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7368590.546467234!2d75.84183607499997!3d25.606756999999988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed57357efa063b%3A0x5a1c560354834672!2sDeepak%20Communication!5e0!3m2!1sen!2sin!4v1775231394441!5m2!1sen!2sin"
            style={map}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
/* 🎨 STYLES */

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
  // maxWidth: "400px",
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
