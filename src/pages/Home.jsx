import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FAQSimple01 from "../components/FAQSimple01";
function Home() {
  const API = import.meta.env.VITE_API_URL;

  const [slider, setSlider] = useState([]);
  const [loopSlider, setLoopSlider] = useState([]);
  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);

  // ✅ Fetch images
  useEffect(() => {
    fetch(`${API}/slider`)
      .then((res) => res.json())
      .then((data) => setSlider(data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ Create infinite loop array
  useEffect(() => {
    if (slider.length > 0) {
      setLoopSlider([slider[slider.length - 1], ...slider, slider[0]]);
      setIndex(1);
    }
  }, [slider]);

  // ✅ Auto slide
  useEffect(() => {
    if (!loopSlider.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [loopSlider]);

  // ✅ Infinite loop fix
  useEffect(() => {
    if (!loopSlider.length) return;

    if (index === loopSlider.length - 1) {
      setTimeout(() => {
        setTransition(false);
        setIndex(1);
      }, 500);
    } else if (index === 0) {
      setTimeout(() => {
        setTransition(false);
        setIndex(loopSlider.length - 2);
      }, 500);
    } else {
      setTransition(true);
    }
  }, [index, loopSlider]);

  const nextSlide = () => setIndex((prev) => prev + 1);
  const prevSlide = () => setIndex((prev) => prev - 1);

  const fixImageUrl = (url) =>
    url ? url.replace("http://", "https://") : "/fallback.jpg";

  const handleImageError = (e) => {
    e.target.src = "/fallback.jpg";
  };

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      {/* 🔥 HERO */}
      <section style={hero}>
         <h1>Deepak Communication</h1>
        <h3>Best Mobile Repair Shop in Rukanpura, Patna</h3>
       
        <p>
          We offers fast & trusted mobile repair services in Rukanpura. Screen
          replacement, battery, charging & software repair at affordable prices.
        </p>

        <div>
          <a href="tel:7903182706">
            <button style={primaryBtn}>Call Now</button>
          </a>

          <a href="https://wa.me/917903182706">
            <button style={secondaryBtn}>WhatsApp</button>
          </a>
        </div>
      </section>

      {/* 🔥 PREMIUM SLIDER */}
      <div style={sliderWrapper}>
        <button style={navBtnLeft} onClick={prevSlide}>
          ❮
        </button>

        <div style={sliderViewport}>
          <div
            style={{
              ...sliderTrack,
              transform: `translateX(-${index * 100}%)`,
              transition: transition ? "0.5s ease" : "none",
            }}
          >
            {loopSlider.map((item, i) => (
              <div key={item._id || i} style={slide}>
                <img
                  alt="Mobile repair work in Rukanpura"
                  src={fixImageUrl(item.image)}
                  loading="lazy"
                  style={galleryImage}
                  onError={handleImageError}
                />
              </div>
            ))}
          </div>
        </div>

        <button style={navBtnRight} onClick={nextSlide}>
          ❯
        </button>
      </div>

      {/* 🔥 SERVICES */}
      <section style={section}>
        <h2>Our Mobile Repair Services</h2>
        <Link to="/services">View All Services</Link>

        <div style={grid}>
          {services.map((s, i) => (
            <div key={i} style={card}>
              <h3>
                {s.icon} {s.title}
              </h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={section}>
        <h2>Mobile Repair Services Rukanpura</h2>

        <p>
          Looking for a reliable mobile repair shop in Rukanpura, Patna? Deepak
          Communication provides expert solutions for screen replacement,
          battery issues, charging problems, and software repairs. With 7+ years
          of experience, we ensure fast, affordable, and high-quality service.
        </p>

        <p>
          We serve customers across Rukanpura and nearby areas with genuine
          parts and skilled technicians.
        </p>
      </section>

      <FAQSimple01 />

      {/* 🔥 STATS */}
      <section style={statsSection}>
        <div style={statsBox}>1000+ Repairs</div>
        <div style={statsBox}>500+ Customers</div>
        <div style={statsBox}>7+ Years</div>
      </section>

      {/* 🔥 CTA */}
      <section style={cta}>
        <h2>Need Mobile Repair?</h2>
        <p>Contact us now</p>

        <a href="https://wa.me/917903182706">
          <button style={primaryBtn}>Chat Now</button>
        </a>
      </section>

      {/* 🔥 FOOTER */}
      <footer style={footer}>
        <p>© 2026 Deepak Communication</p>
        <p>📍 Rukanpura, Patna | 📞 7903182706</p>
      </footer>
    </div>
  );
}

export default Home;

/* ================= DATA ================= */

const services = [
  { icon: "📱", title: "Screen Repair", desc: "Original display replacement" },
  { icon: "🔋", title: "Battery", desc: "Fast battery replacement" },
  { icon: "🔌", title: "Charging Issue", desc: "Fix charging problems" },
  { icon: "💻", title: "Software", desc: "All software issues fixed" },
];

/* ================= STYLES ================= */



const hero = {
  background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/hero.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "#fff",
  textAlign: "center",
  padding: "80px 20px",
};

const primaryBtn = {
  padding: "12px 24px",
  margin: "10px",
  background: "linear-gradient(90deg,#ffcc00,#ff9900)",
  color: "#000",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 5px 15px rgba(255,204,0,0.4)",
};

const secondaryBtn = {
  padding: "12px 24px",
  margin: "10px",
  background: "rgba(255,255,255,0.1)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.3)",
  borderRadius: "8px",
  backdropFilter: "blur(10px)",
  cursor: "pointer",
};

const sliderWrapper = {
  position: "relative",
  width: "100%",
  overflow: "hidden",
  marginTop: "20px",
};

const slide = {
  minWidth: "100%",
  height: "380px",
};

const galleryImage = {
  width: "50%",
  height: "110%",
  // objectFit: "contain",
  borderRadius: "10px",
};

const navBtnLeft = {
  position: "absolute",
  top: "50%",
  left: "15px",
  transform: "translateY(-50%)",
  background: "rgba(0,0,0,0.5)",
  color: "#fff",
  border: "none",
  padding: "12px",
  borderRadius: "50%",
  cursor: "pointer",
};

const navBtnRight = {
  ...navBtnLeft,
  left: "auto",
  right: "15px",
};
const section = {
  padding: "60px 20px",
  textAlign: "center",
  background: "#0f172a",
  color: "#fff",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "25px",
  marginTop: "30px",
};

const card = {
  background: "rgba(255,255,255,0.05)",
  borderRadius: "15px",
  padding: "20px",
  border: "1px solid rgba(255,255,255,0.1)",
  backdropFilter: "blur(10px)",
  transition: "0.3s",
  cursor: "pointer",
};

const statsSection = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "20px",
  padding: "50px 20px",
  background: "#020617",
};

const statsBox = {
  background: "linear-gradient(135deg,#1e293b,#0f172a)",
  padding: "20px 30px",
  borderRadius: "15px",
  fontSize: "18px",
  fontWeight: "600",
  color: "#facc15",
  boxShadow: "0 5px 20px rgba(0,0,0,0.5)",
};

const cta = {
  background: "linear-gradient(135deg,#2563eb,#06b6d4)",
  color: "#fff",
  textAlign: "center",
  padding: "60px 20px",
};

const footer = {
  background: "#020617",
  color: "#94a3b8",
  textAlign: "center",
  padding: "25px",
  fontSize: "14px",
};

const sliderViewport = {
  overflow: "hidden",
  width: "100%",
};




const sliderTrack = {
  display: "flex",
  width: "100%",
};



