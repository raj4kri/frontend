// HomeSkeleton.jsx

function HomeSkeleton() {
  return (
    <div style={{ background: "#0f172a", minHeight: "100vh" }}>
      
      {/* TOP PRODUCTS */}
      <div style={topBar}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={topItem}>
            <div style={circle}></div>
            <div style={smallText}></div>
          </div>
        ))}

        <div style={exploreBtn}></div>
      </div>

      {/* HERO */}
      <div style={hero}>
        <div style={heroTitle}></div>
        <div style={heroSub}></div>
        <div style={heroSub2}></div>

        <div style={btnRow}>
          <div style={btn}></div>
          <div style={btn}></div>
        </div>
      </div>

      {/* SLIDER */}
      <div style={slider}></div>

      {/* SERVICES */}
      <div style={section}>
        <div style={sectionTitle}></div>

        <div style={grid}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={card}>
              <div style={cardTitle}></div>
              <div style={line}></div>
              <div style={lineSmall}></div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={section}>
        <div style={sectionTitle}></div>

        <div style={paragraph}></div>
        <div style={paragraph}></div>
        <div style={paragraphSmall}></div>
      </div>

      {/* FAQ */}
      <div style={section}>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={faq}></div>
        ))}
      </div>

      {/* STATS */}
      <div style={stats}>
        {[...Array(3)].map((_, i) => (
          <div key={i} style={statsBox}></div>
        ))}
      </div>

      {/* CTA */}
      <div style={cta}>
        <div style={ctaTitle}></div>
        <div style={ctaText}></div>
        <div style={ctaBtn}></div>
      </div>

      {/* FOOTER */}
      <div style={footer}></div>
    </div>
  );
}

export default HomeSkeleton;

/* ================= STYLES ================= */

const shimmer = {
  background:
    "linear-gradient(90deg,#1e293b 25%,#334155 50%,#1e293b 75%)",
  backgroundSize: "400% 100%",
  animation: "shimmer 1.5s infinite",
};

const topBar = {
  display: "flex",
  gap: "12px",
  padding: "12px",
  overflowX: "auto",
  alignItems: "center",
};

const topItem = {
  textAlign: "center",
};

const circle = {
  width: "55px",
  height: "55px",
  borderRadius: "50%",
  ...shimmer,
};

const smallText = {
  width: "50px",
  height: "10px",
  borderRadius: "6px",
  marginTop: "8px",
  ...shimmer,
};

const exploreBtn = {
  width: "90px",
  height: "35px",
  borderRadius: "20px",
  flexShrink: 0,
  ...shimmer,
};

const hero = {
  padding: "70px 20px",
  textAlign: "center",
};

const heroTitle = {
  width: "260px",
  height: "40px",
  margin: "0 auto 20px",
  borderRadius: "8px",
  ...shimmer,
};

const heroSub = {
  width: "320px",
  maxWidth: "90%",
  height: "16px",
  margin: "10px auto",
  borderRadius: "6px",
  ...shimmer,
};

const heroSub2 = {
  width: "260px",
  maxWidth: "80%",
  height: "16px",
  margin: "10px auto",
  borderRadius: "6px",
  ...shimmer,
};

const btnRow = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  marginTop: "20px",
};

const btn = {
  width: "120px",
  height: "45px",
  borderRadius: "10px",
  ...shimmer,
};

const slider = {
  width: "90%",
  height: "300px",
  borderRadius: "20px",
  margin: "20px auto",
  ...shimmer,
};

const section = {
  padding: "40px 20px",
};

const sectionTitle = {
  width: "220px",
  height: "28px",
  borderRadius: "8px",
  marginBottom: "30px",
  ...shimmer,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px",
};

const card = {
  padding: "20px",
  borderRadius: "15px",
  background: "#111827",
};

const cardTitle = {
  width: "120px",
  height: "20px",
  borderRadius: "6px",
  marginBottom: "15px",
  ...shimmer,
};

const line = {
  width: "100%",
  height: "12px",
  borderRadius: "6px",
  marginBottom: "10px",
  ...shimmer,
};

const lineSmall = {
  width: "70%",
  height: "12px",
  borderRadius: "6px",
  ...shimmer,
};

const paragraph = {
  width: "100%",
  height: "14px",
  borderRadius: "6px",
  marginBottom: "12px",
  ...shimmer,
};

const paragraphSmall = {
  width: "70%",
  height: "14px",
  borderRadius: "6px",
  ...shimmer,
};

const faq = {
  width: "100%",
  height: "60px",
  borderRadius: "10px",
  marginBottom: "15px",
  ...shimmer,
};

const stats = {
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  flexWrap: "wrap",
  padding: "40px 20px",
};

const statsBox = {
  width: "180px",
  height: "80px",
  borderRadius: "15px",
  ...shimmer,
};

const cta = {
  padding: "60px 20px",
  textAlign: "center",
};

const ctaTitle = {
  width: "220px",
  height: "30px",
  borderRadius: "8px",
  margin: "0 auto 15px",
  ...shimmer,
};

const ctaText = {
  width: "180px",
  height: "14px",
  borderRadius: "6px",
  margin: "0 auto 20px",
  ...shimmer,
};

const ctaBtn = {
  width: "130px",
  height: "45px",
  borderRadius: "10px",
  margin: "0 auto",
  ...shimmer,
};

const footer = {
  width: "100%",
  height: "80px",
  marginTop: "20px",
  ...shimmer,
};