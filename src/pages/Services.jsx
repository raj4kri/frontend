import React from "react";

function Services() {
  const services = [
    {
      title: "Screen Replacement",
      icon: "📱",
      desc: "We replace broken or damaged screens with high-quality parts ensuring crystal clear display and smooth touch experience.",
    },
    {
      title: "Battery Replacement",
      icon: "🔋",
      desc: "Facing battery drain issues? We provide long-lasting battery replacements for all smartphone brands.",
    },
    {
      title: "Software Issue",
      icon: "💻",
      desc: "Fix software bugs, hanging issues, app crashes, and OS problems with our expert technicians.",
    },
    {
      title: "Charging Problem",
      icon: "🔌",
      desc: "We repair charging ports and fix issues like slow charging or device not charging at all.",
    },
    {
      title: "Network Fix",
      icon: "📶",
      desc: "No signal or weak network? We solve SIM detection and network-related problems quickly.",
    },
    {
      title: "Mobile Unlock",
      icon: "🔓",
      desc: "Locked device? We provide safe unlocking services for pattern, PIN, and FRP locks.",
    },
    {
      title: "Motherboard Repair",
      icon: "🛠️",
      desc: "Advanced-level chip and motherboard repair for dead phones and critical hardware issues.",
    },
  ];

  return (
    <div style={container}>
      <h1 style={title}>Our Services</h1>
      <p style={subtitle}>
        We provide professional mobile repair services with 7+ years of experience
      </p>

      <div style={grid}>
        {services.map((s, index) => (
          <div key={index} style={card}>
            <div style={icon}>{s.icon}</div>
            <h3 style={cardTitle}>{s.title}</h3>
            <p style={desc}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;

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
  marginBottom: "10px",
};

const subtitle = {
  color: "#aaa",
  marginBottom: "30px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
};

const card = {
  background: "#1e1e1e",
  padding: "20px",
  borderRadius: "15px",
  border: "1px solid #ffcc00",
  transition: "0.3s",
  cursor: "pointer",
};

const icon = {
  fontSize: "40px",
  marginBottom: "10px",
};

const cardTitle = {
  color: "#ff9800",
  marginBottom: "10px",
};

const desc = {
  fontSize: "14px",
  color: "#ccc",
};