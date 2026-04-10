import { useEffect, useState } from "react";

function Home() {
const API = import.meta.env.VITE_API_URL;
  // ✅ Hooks must be INSIDE component
    const [slider, setSlider] = useState([]);
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);

  // Fetch slider
  useEffect(() => {
    fetch(`${API}/slider`)
      .then((res) => res.json())
      .then((data) => setSlider(data))
      .catch((err) => console.log(err));
  }, []);

  // Auto slide
  useEffect(() => {
    if (slider.length === 0 || pause) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slider.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slider, pause]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slider.length);
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? slider.length - 1 : prev - 1
    );
  };

  return (
    <div >

      {/* 🔥 Hero Section */}
      <div style={{
        background: "linear-gradient(to right, #ff0000, #ffcc00)",
        color: "white",
        padding: "30px 20px",
        textAlign: "center"
      }}>
        <h1>📱 Deepak Communication</h1>
        <h2>Fast & Trusted Mobile Repair Services | 7+ Years</h2>
        <p>We fix all smartphone issues at affordable prices</p>

        <a href="https://wa.me/917903182706">
          <button style={primaryBtn}>Book Repair</button>
        </a>
      </div>

     <div
  style={sliderContainer}
  onMouseEnter={() => setPause(true)}
  onMouseLeave={() => setPause(false)}
>
  {slider.map((item, i) => (
    <div
      key={i}
      style={{
        ...slideWrapper,
        opacity: i === index ? 1 : 0
      }}
    >
      <img
        src={item.image}
        alt="slider"
        style={slideImage}
      />
    </div>
  ))}

  {/* Overlay */}
  <div style={overlay}>
    <h2>Deepak Communication</h2>
    <p>Fast Mobile Repair Service</p>
  </div>

  {/* Buttons */}
  <button style={prevBtn} onClick={prevSlide}>❮</button>
  <button style={nextBtn} onClick={nextSlide}>❯</button>

  {/* Dots */}
  <div style={dotsContainer}>
    {slider.map((_, i) => (
      <span
        key={i}
        onClick={() => setIndex(i)}
        style={{
          ...dot,
          background: i === index ? "#ff0000" : "#ccc"
        }}
      />
    ))}
  </div>
</div>
{/* </div> */}
      {/* 🔧 Services */}
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2 style={{ color: "#ff0000" }}>Our Services</h2>

        <div style={flexBox}>
          <div style={cardStyle}>📱 Screen Replacement</div>
          <div style={cardStyle}>🔋 Battery Replacement</div>
          <div style={cardStyle}>💻 Software Issue</div>
          <div style={cardStyle}>🔌 Charging Problem</div>
          <div style={cardStyle}>📶 Network Fix</div>
          <div style={cardStyle}>🔓 Mobile Unlock</div>
          <div style={cardStyle}>Mother Board Repair</div>
        </div>
      </div>

      {/* ⭐ Why Choose Us */}
      <div style={{
        background: "#fff3cd",
        padding: "40px",
        textAlign: "center"
      }}>
        <h2 style={{ color: "#d40000" }}>Why Choose Us?</h2>

        <div style={flexBox}>
          <div style={cardStyle}>⚡ Fast Service</div>
          <div style={cardStyle}>💰 Affordable Price</div>
          <div style={cardStyle}>🛠️ Expert Technicians</div>
        </div>
      </div>

      {/* 📞 CTA */}
      <div style={{
        background: "#ff0000",
        color: "white",
        padding: "40px",
        textAlign: "center"
      }}>
        <h2>Need Mobile Repair?</h2>
        <p>Contact us today</p>

        <a href="tel:7903182706">
          <button style={secondaryBtn}>Call Now</button>
        </a>
      </div>

    </div>
  );
}
// ================= STYLES =================

const flexBox = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginTop: "20px",
  flexWrap: "wrap"
};

const cardStyle = {
  background: "white",
  padding: "20px",
  width: "200px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  borderTop: "5px solid #ff0000"
};

const primaryBtn = {
  padding: "12px 25px",
  background: "#000",
  color: "#ffcc00",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
  borderRadius: "5px"
};

const secondaryBtn = {
  padding: "12px 25px",
  background: "#ffcc00",
  color: "#000",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px"
};

const sliderContainer = {
  position: "relative",
  width: "100%",
  height: "400px",
  overflow: "hidden",
  borderRadius:"10px",
  marginTop:"20px",
};

const slideWrapper = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  transition: "opacity 0.8s ease-in-out"
};

const slideImage = {
  width: "100%",
  height: "100%",
  objectFit: "center",   // ✅ full screen fill
  objectPosition: "center"
};

const overlay = {
  
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#fff",
  textAlign: "center",
  background: "rgba(0,0,0,0.3)",
  padding: "20px",
  borderRadius: "10px",
  zIndex: 2
};

const prevBtn = {
  position: "absolute",
  top: "50%",
  left: "10px",
  transform: "translateY(-50%)",
  background: "rgba(0,0,0,0.5)",
  color: "#fff",
  border: "none",
  padding: "10px",
  cursor: "pointer",
  fontSize: "20px",
  borderRadius:"10px",
  zIndex: 2
};

const nextBtn = {
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
  background: "rgba(0,0,0,0.5)",
  color: "#fff",
  border: "none",
  padding: "10px",
  cursor: "pointer",
  fontSize: "20px",
  borderRadius:"10px",
  zIndex: 2
};

const dotsContainer = {
  position: "absolute",
  bottom: "10px",
  width: "100%",
  textAlign: "center",
  zIndex: 2
};

const dot = {
  display: "inline-block",
  width: "10px",
  height: "10px",
  margin: "5px",
  borderRadius: "50%",
  cursor: "pointer"
};



export default Home;