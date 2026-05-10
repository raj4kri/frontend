function AboutSkeleton() {
  return (
    <div style={container}>
      {/* HERO */}
      <div style={hero}>
        <div style={heroTitle}></div>
        <div style={heroSub}></div>
      </div>

      {/* CARDS */}
      {[1, 2].map((item) => (
        <div key={item} style={card}>
          <div style={heading}></div>

          <div style={line}></div>
          <div style={line}></div>
          <div style={{ ...line, width: "80%" }}></div>

          <div style={{ ...heading, marginTop: "25px" }}></div>

          <div style={line}></div>
          <div style={line}></div>
          <div style={{ ...line, width: "70%" }}></div>
        </div>
      ))}

      {/* TEAM */}
      <div style={teamGrid}>
        {[1, 2, 3].map((item) => (
          <div key={item} style={teamCard}>
            <div style={image}></div>

            <div style={{ flex: 1 }}>
              <div style={name}></div>
              <div style={role}></div>

              <div style={smallLine}></div>
              <div style={{ ...smallLine, width: "60%" }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutSkeleton;

/* ===== SHIMMER ===== */

const shimmer = {
  background:
    "linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.05) 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s infinite",
};

const container = {
  background: "linear-gradient(135deg, #0f172a, #020617)",
  minHeight: "100vh",
  paddingBottom: "40px",
};

const hero = {
  padding: "70px 20px",
  textAlign: "center",
};

const heroTitle = {
  ...shimmer,
  width: "250px",
  height: "40px",
  borderRadius: "8px",
  margin: "0 auto 15px",
};

const heroSub = {
  ...shimmer,
  width: "320px",
  height: "16px",
  borderRadius: "6px",
  margin: "0 auto",
};

const card = {
  background: "rgba(255,255,255,0.05)",
  margin: "25px",
  padding: "25px",
  borderRadius: "18px",
  border: "1px solid rgba(255,255,255,0.08)",
};

const heading = {
  ...shimmer,
  width: "180px",
  height: "24px",
  borderRadius: "6px",
  marginBottom: "20px",
};

const line = {
  ...shimmer,
  width: "100%",
  height: "14px",
  borderRadius: "6px",
  marginBottom: "12px",
};

const teamGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "25px",
  padding: "25px",
};

const teamCard = {
  display: "flex",
  gap: "15px",
  alignItems: "center",
  background: "rgba(255,255,255,0.05)",
  padding: "15px",
  borderRadius: "16px",
};

const image = {
  ...shimmer,
  width: "120px",
  height: "120px",
  borderRadius: "12px",
  flexShrink: 0,
};

const name = {
  ...shimmer,
  width: "140px",
  height: "18px",
  borderRadius: "6px",
  marginBottom: "10px",
};

const role = {
  ...shimmer,
  width: "90px",
  height: "14px",
  borderRadius: "20px",
  marginBottom: "15px",
};

const smallLine = {
  ...shimmer,
  width: "100%",
  height: "12px",
  borderRadius: "6px",
  marginBottom: "10px",
};