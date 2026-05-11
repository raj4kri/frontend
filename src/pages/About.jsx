import React, { useState, useEffect } from "react";
import AboutSkeleton from "../components/skeletons/AboutSkeleton";
function About() {
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/team`)
      .then((res) => res.json())
      .then((data) => {
  setTeam(data);
  setLoading(false);
})
      .catch((err) => console.log("TEAM FETCH ERROR:", err));
      setLoading(false);
  }, []);

  if (loading) return <AboutSkeleton />;

  return (
    <div style={container}>
      {/* 🔥 HERO */}
      <div style={hero}>
        <h1 style={heroTitle}>Deepak Communication</h1>
        <p style={heroSubtitle}>
          Fast • Trusted • Affordable Mobile Repair Services
        </p>
      </div>

      {/* 🧾 WHO WE ARE */}
      <div style={card}>
        <h2 style={heading}>Who We Are</h2>
  <p style={text}>
  Deepak Communication is a trusted mobile repair center with{" "}
  <b>7+ years of experience</b> in providing reliable and professional mobile
  repair services. Over the years, we have successfully repaired hundreds of
  smartphones from leading brands including Samsung, Xiaomi, Vivo, Oppo,
  Realme, iPhone, Motorola, and more.

  <br />
  <br />

  We specialize in fixing all types of mobile problems including{" "}
  <b>
    broken screens, battery issues, charging problems, software errors,
    network issues, motherboard faults, water damage,
  </b>{" "}
  and many other hardware and software related problems. Our experienced
  technicians use modern tools and advanced repair techniques to ensure every
  device is repaired safely and efficiently.

  <br />
  <br />

  At Deepak Communication, our focus is simple — to provide{" "}
  <b>honest service, fair pricing, and long-lasting repair solutions</b>.
  We believe customers deserve transparency and quality service, which is why
  we always explain the issue clearly before starting any repair work.

  <br />
  <br />

  We use high-quality spare parts and carefully test every device after repair
  to ensure proper performance and customer satisfaction. Whether it’s a minor
  repair or a complex motherboard issue, we treat every phone with care and
  professionalism.

  <br />
  <br />

  Our goal is not just to repair mobile phones, but to build long-term trust
  with our customers through fast service, reliable solutions, and excellent
  support. That’s why many customers in Rukanpura and nearby areas choose
  Deepak Communication as their preferred mobile repair shop.
</p>
      </div>

      {/* 🎯 MISSION + VISION */}
      <div style={card}>
        <h2 style={heading}>Our Mission</h2>
        <p style={text}>
          Our mission at Deepak Communication is to deliver fast, reliable, and
          high-quality mobile repair services that customers can truly depend
          on. We aim to solve every mobile issue with precision, using advanced
          tools and genuine spare parts, ensuring long-lasting performance and
          customer satisfaction. We believe that every customer deserves
          transparent pricing, honest diagnosis, and timely service. That’s why
          we focus on clear communication—explaining the problem, the solution,
          and the cost upfront, so there are no surprises. Our goal is not just
          to repair devices, but to build long-term trust and relationships with
          our customers. Whether it’s a simple battery replacement or a complex
          motherboard repair, we treat every device with equal care and
          professionalism
        </p>

        <h2 style={{ ...heading, marginTop: "20px" }}>Our Vision</h2>
        <p style={text}>
          Our vision is to become the most trusted and preferred mobile repair
          brand in the region by consistently delivering high-quality, reliable,
          and affordable repair services. We aim to build long-term
          relationships with our customers by ensuring transparency, honesty,
          and excellence in every service we provide. We strive to set new
          standards in the mobile repair industry through skilled technicians,
          advanced tools, and customer-first practices. Our goal is not just to
          fix devices, but to create a seamless and stress-free experience for
          every customer who trusts us with their valuable gadgets. By
          continuously improving our services, embracing innovation, and
          maintaining a strong commitment to customer satisfaction, we envision
          expanding our presence and becoming a recognized name known for trust,
          quality, and professionalism.
        </p>
      </div>

      {/* 👨‍🔧 TEAM */}
     {/* 👨‍🔧 TEAM */}
<div style={teamSection}>
  <h2 style={teamHeading}>Our Team</h2>
  <p style={teamSubheading}>
    Meet our skilled mobile repair experts
  </p>

  <div style={teamGrid}>
        {team.map((member) => (
          <div
            key={member._id}
            style={teamCard}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            {/* IMAGE */}
            <div style={imageWrapper}>
              <img
                src={member.image || "/fallback.jpg"}
                alt={member.name}
                style={teamImg}
                onError={(e) => (e.target.src = "/fallback.jpg")}
              />
            </div>

            {/* INFO */}
            <div style={teamInfo}>
              <h3 style={teamName}>{member.name}</h3>

              <span style={roleBadge}>{member.role}</span>

              {/* ACTION BUTTONS */}
              {/* <div style={actionBtns}> */}
              {/* <a href="tel:7903182706" style={callBtn}>Call</a> */}
              {/* <a href="https://wa.me/917903182706" style={whatsappBtn}> */}
              {/* WhatsApp */}
              {/* </a> */}
              {/* </div> */}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default About;

/* ================= 🎨 STYLES ================= */


const teamSection = {
  padding: "25px",
};

const teamHeading = {
  fontSize: "28px",
  fontWeight: "700",
  textAlign: "center",
  color: "#facc15",
  marginBottom: "8px",
};

const teamSubheading = {
  textAlign: "center",
  color: "#94a3b8",
  marginBottom: "25px",
  fontSize: "14px",
};

const teamGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "25px",
  marginTop: "25px",
};

const teamCard = {
  display: "flex",
  gap: "15px",
  alignItems: "center",
  background: "rgba(255,255,255,0.05)",
  padding: "15px",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.1)",
  backdropFilter: "blur(10px)",
  transition: "0.3s ease",
};

/* IMAGE */
const imageWrapper = {
  padding: "2px",
  borderRadius: "14px",
  background: "linear-gradient(135deg, #facc15, #f97316)",
};

const teamImg = {
  width: "200px",
  height: "200px",
  borderRadius: "12px",
  objectFit: "cover",
  display: "block",
};

/* TEXT */
const teamInfo = {
  textAlign: "left",
  flex: 1,
};

const teamName = {
  fontSize: "16px",
  fontWeight: "600",
  marginBottom: "6px",
};

/* ROLE BADGE */
const roleBadge = {
  display: "inline-block",
  padding: "4px 10px",
  fontSize: "11px",
  borderRadius: "20px",
  background: "#1e293b",
  color: "#facc15",
  marginBottom: "10px",
};

/* BUTTONS */
const actionBtns = {
  display: "flex",
  gap: "8px",
};

const callBtn = {
  padding: "6px 10px",
  fontSize: "12px",
  borderRadius: "6px",
  background: "#2563eb",
  color: "#fff",
  textDecoration: "none",
};

const whatsappBtn = {
  padding: "6px 10px",
  fontSize: "12px",
  borderRadius: "6px",
  background: "#22c55e",
  color: "#fff",
  textDecoration: "none",
};

/* TEAM */

const teamRole = {
  fontSize: "13px",
  color: "#94a3b8",
};

const container = {
  background: "linear-gradient(135deg, #0f172a, #020617)",
  color: "white",
  minHeight: "100vh",
  paddingBottom: "40px",
  fontFamily: "sans-serif",
};

/* HERO */
const hero = {
  background: "linear-gradient(135deg, #1e293b, #020617)",
  padding: "70px 20px",
  textAlign: "center",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
};

const heroTitle = {
  fontSize: "40px",
  fontWeight: "700",
  lineHeight: "1.3", // ✅ IMPORTANT
  paddingBottom: "5px", // ✅ prevent cut
  background: "linear-gradient(90deg, #facc15, #f97316)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const heroSubtitle = {
  marginTop: "12px",
  color: "#94a3b8",
  fontSize: "15px",
};

/* CARD */
const card = {
  background: "rgba(255,255,255,0.05)",
  margin: "25px",
  padding: "25px",
  borderRadius: "18px",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.1)",
};

const heading = {
  fontSize: "20px",
  marginBottom: "10px",
  color: "#facc15",
};

const text = {
  lineHeight: "1.7",
  color: "#cbd5f5",
  fontSize: "14px",
};
