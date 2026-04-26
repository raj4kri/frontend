import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        <h1>Best Mobile Repair Shop in Rukanpura, Patna</h1>
<h2>Deepak Communication</h2>
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
              <div  key={item._id || i} style={slide}>
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

      <section style={section}>
        <h2>Frequently Asked Questions</h2>

        <p>
          <strong>How much does mobile repair cost?</strong>
        </p>
        <p>Repair cost depends on the issue. Screen repair starts from ₹499.</p>

        <p>
          <strong>How long does repair take?</strong>
        </p>
        <p>
          Most repairs are completed within 30–60 minutes, depends on problem.
        </p>
      </section>

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
        <p>📍 Mithapur | 📞 7903182706</p>
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
  background: "linear-gradient(135deg,#ff0000,#ffcc00)",
  color: "#fff",
  textAlign: "center",
  padding: "60px 20px",
};

const sliderWrapper = {
  position: "relative",
  width: "100%",
  overflow: "hidden",
  color: "#fff",
};

const sliderViewport = {
  overflow: "hidden",
};

const sliderTrack = {
  display: "flex",
  width: "100%",
};

const slide = {
  minWidth: "100%",
  height: "350px",
};

const galleryImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover", // keep this
  imageRendering: "auto", // ✅ important
};

const navBtnLeft = {
  position: "absolute",
  top: "50%",
  left: "10px",
  transform: "translateY(-50%)",
  zIndex: 2,
  background: "#000",
  color: "#fff",
  border: "none",
  padding: "10px",
  cursor: "pointer",
};

const navBtnRight = {
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
  zIndex: 2,
  background: "#000",
  color: "#fff",
  border: "none",
  padding: "10px",
  cursor: "pointer",
};

const section = {
  padding: "50px 20px",
  textAlign: "center",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
};

const card = {
  background: "#111",
  color: "#fff",
  padding: "20px",
  borderRadius: "10px",
};

const statsSection = {
  display: "flex",
  justifyContent: "space-around",
  padding: "40px",
  background: "#222",
  color: "#fff",
};

const statsBox = {
  fontSize: "20px",
};

const cta = {
  background: "#ff0000",
  color: "#fff",
  textAlign: "center",
  padding: "50px 20px",
};

const footer = {
  background: "#000",
  color: "#aaa",
  textAlign: "center",
  padding: "20px",
};

const primaryBtn = {
  padding: "10px 20px",
  margin: "10px",
  background: "#000",
  color: "#ffcc00",
  border: "none",
};

const secondaryBtn = {
  padding: "10px 20px",
  margin: "10px",
  background: "#fff",
  color: "#000",
  border: "none",
};
