import React from "react";


import { useNavigate } from "react-router-dom";





function Services() {


  const navigate = useNavigate()
  const services = [
    {
      title: "Screen Replacement",
       slug: "screen-replacement",
      icon: "📱",
      desc: "High-quality screen replacement with crystal clear display & smooth touch.",
    },
    {
      title: "Battery Replacement",
      slug: "battery-replacement",
      icon: "🔋",
      desc: "Long-lasting battery replacement for all smartphone brands.",
    },
    {
      title: "Software Issue",
      slug: "software-issue",
      icon: "💻",
      desc: "Fix lag, bugs, crashes & OS issues with expert support.",
    },
    {
      title: "Charging Problem",
      slug: "charging-problem",
      icon: "🔌",
      desc: "Repair charging ports & fix slow or no charging issues.",
    },
    {
      title: "Network Fix",
      slug: "network-fix",
      icon: "📶",
      desc: "Solve SIM & network problems quickly and efficiently.",
    },
    {
      title: "Mobile Unlock",
      slug: "mobile-unlock",
      icon: "🔓",
      desc: "Safe unlocking for PIN, pattern & FRP locks.",
    },
    {
      title: "Motherboard Repair",
      slug: "motherboard-repair",
      icon: "🛠️",
      desc: "Advanced chip-level repair for dead or damaged phones.",
    },
  ];

  return (
    <div style={container}>
      <h1 style={title}>Our Services</h1>
      <p style={subtitle}>
        Professional mobile repair with 7+ years of experience
      </p>

      <div style={grid}>
        {services.map((s, index) => (
          <div key={index} style={card}

          onClick={() => navigate(`/services/${s.slug}`)}
          
          >
            <div style={iconWrapper}>
              <span style={icon}>{s.icon}</span>
            </div>

            <h3 style={cardTitle}>{s.title}</h3>
            <p style={desc}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;

// ================= DATA =================






/* ================= STYLES ================= */

const container = {
  background: "linear-gradient(135deg, #0f172a, #020617)",
  minHeight: "100vh",
  padding: "40px 10px",
  textAlign: "center",
  color: "#fff",
  
};

const title = {
   fontSize: "40px",
  fontWeight: "700",
  lineHeight: "1.3", // ✅ IMPORTANT
  paddingBottom: "5px", // ✅ prevent cut
  background: "linear-gradient(90deg, #facc15, #f97316)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const subtitle = {
  color: "#94a3b8",
  marginBottom: "20px",
  fontSize: "15px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "25px",
};

const card = {
  background: "rgba(255,255,255,0.05)",
  borderRadius: "18px",
  padding: "25px",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.1)",
  transition: "all 0.3s ease",
  cursor: "pointer",
};

const iconWrapper = {
  width: "60px",
  height: "60px",
  margin: "0 auto 15px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #facc15, #f97316)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "26px",
  boxShadow: "0 5px 15px rgba(255,165,0,0.4)",
};

const icon = {
  fontSize: "26px",
};

const cardTitle = {
  fontSize: "18px",
  fontWeight: "600",
  marginBottom: "10px",
};

const desc = {
  fontSize: "13px",
  color: "#cbd5f5",
  lineHeight: "1.6",
};