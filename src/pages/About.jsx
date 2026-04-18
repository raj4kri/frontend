import React, { useState, useEffect } from "react";

function About() {

  
  const [team, setTeam] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/team`) // FIXED
      .then(res => res.json())
      .then(data => setTeam(data))
      .catch(err => console.log("TEAM FETCH ERROR:", err));
  }, []);

  return (
    <div style={container}>
      
      {/* Hero */}
      <div style={hero}>
        <h1 style={heroTitle}>Deepak Communication</h1>
        <p style={heroSubtitle}>
          Fast & Trusted Mobile Repair Services | 7+ Years of Experience
        </p>
      </div>

      {/* Who We Are */}
      <div style={card}>
        <h2 style={heading}>Who We Are</h2>
        <p style={text}>
          Deepak Communication is a trusted mobile repairing center with over 
          <b> 7+ years of experience</b> in the industry. We specialize in solving
          all types of mobile issues with precision and care. Our goal is to provide
          fast, reliable, and affordable repair solutions using quality parts and
          expert techniques.
          <br /><br />
          Over the years, we have built strong trust with our customers by delivering
          honest service, transparent pricing, and consistent results.
        </p>
      </div>

      {/* Mission & Vision */}
      <div style={card}>
        <h2 style={heading}>Our Mission</h2>
        <p style={text}>
          Our mission is to provide high-quality mobile repair services at affordable
          prices while ensuring complete customer satisfaction.
        </p>

        <h2 style={{ ...heading, marginTop: "20px" }}>Our Vision</h2>
        <p style={text}>
          Our vision is to become the most trusted mobile repair service provider
          in the area.
        </p>
      </div>

     {/* Team Section */}
      <div style={card}>
        <h2 style={heading}>Our Team</h2>

        <div style={teamGrid}>
          {team.map((member) => (
            <div key={member._id} style={teamCard}>
              <img
                src={member.image || "/fallback.jpg"}
                alt={member.name}
                style={teamImg}
                onError={(e) => (e.target.src = "/fallback.jpg")}
              />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact
      <div style={contactBox}>
        <h2>Contact Us</h2>
        <p>📞 9060211167</p>
        <p>📍 Deepak Communication</p>
      </div> */}

    </div>
  );
}

export default About;


/* 🎨 STYLES */

const container = {
  background: "#121212",
  color: "white",
  minHeight: "100vh",
  fontFamily: "Arial",
  paddingBottom: "40px"
};

const hero = {
  background: "linear-gradient(to right, #ff0000, #ffcc00)",
  color: "black",
  padding: "60px 20px",
  textAlign: "center"
};

const heroTitle = {
  fontSize: "32px",
  margin: "0"
};

const heroSubtitle = {
  marginTop: "10px",
  color:"white"
};

const card = {
  background: "#1e1e1e",
  margin: "20px",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 0 10px rgba(255,0,0,0.3)"
};

const heading = {
  color: "#ffcc00"
};

const text = {
  lineHeight: "1.6",
  color: "#ddd"
};

const teamGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
  gap: "30px",
  // padding: "10px"
};

const teamCard = {
  background: "#2a2a2a",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "center",
  border: "1px solid #ffcc00",
  transition: "0.3s"
};

const teamImg = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
  objectPosition: "top",   // 🔥 important (shows full face properly)
  borderRadius: "10px"
};
const contactBox = {
  background: "#ff0000",
  color: "white",
  margin: "20px",
  padding: "20px",
  borderRadius: "15px",
  textAlign: "center"
};