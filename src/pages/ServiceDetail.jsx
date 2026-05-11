import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ServicesDetailSkeleton from "../components/skeletons/ServicesSkeleton";
import { useEffect, useState } from "react";
import {
  FaTools,
  FaCheckCircle,
  FaMobileAlt,
  FaWhatsapp,
  FaPhoneAlt,
} from "react-icons/fa";

function Section({ title, children }) {
  return (
    <div style={section}>
      <div style={sectionHeader}>
        <FaTools size={18} color="#38bdf8" />
        <h2 style={sectionTitle}>{title}</h2>
      </div>

      <div style={sectionText}>{children}</div>
    </div>
  );
}

function ServiceDetail() {
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

const serviceData = {
  "screen-replacement": {
    title: "Mobile Screen Replacement",
    icon: "📱",
    description:
      "Professional mobile screen replacement service in Patna with genuine display parts.",
    sections: [
      {
        title: "Common Screen Issues We Fix",
        content: (
          <ul style={list}>
            <li style={listItem}>
              <strong>Broken / Cracked Screen</strong>
              <p>Accidental drops can damage the display and affect touch.</p>
            </li>

            <li style={listItem}>
              <strong>Touch Not Working</strong>
              <p>Ghost touch or unresponsive screen issues.</p>
            </li>

            <li style={listItem}>
              <strong>Display Flickering</strong>
              <p>Lines or flickering caused by internal display damage.</p>
            </li>

            <li style={listItem}>
              <strong>Black Screen</strong>
              <p>Phone is on but display is not visible.</p>
            </li>
          </ul>
        ),
      },

      {
        title: "Types of Displays We Repair",
        content: (
          <div style={featureGrid}>
            <div style={featureCard}>TFT LCD</div>
            <div style={featureCard}>IPS LCD</div>
            <div style={featureCard}>OLED</div>
            <div style={featureCard}>AMOLED</div>
          </div>
        ),
      },

      {
        title: "Why Choose Us",
        content: (
          <div style={featureGrid}>
            <div style={featureCard}>✔ Same Day Repair</div>
            <div style={featureCard}>✔ Warranty Support</div>
            <div style={featureCard}>✔ Affordable Pricing</div>
          </div>
        ),
      },
    ],
  },

  "battery-replacement": {
    title: "Battery Replacement",
    icon: "🔋",
    description:
      "Professional mobile battery replacement service with genuine batteries.",
    sections: [
      {
        title: "Battery Problems We Fix",
        content: (
          <ul style={list}>
            <li style={listItem}>
              <strong>Fast Battery Drain</strong>
              <p>Battery losing charge quickly even on standby.</p>
            </li>

            <li style={listItem}>
              <strong>Phone Heating</strong>
              <p>Overheating caused by damaged battery cells.</p>
            </li>

            <li style={listItem}>
              <strong>Swollen Battery</strong>
              <p>Battery swelling pushing screen outward.</p>
            </li>

            <li style={listItem}>
              <strong>Sudden Shutdown</strong>
              <p>Phone turning off unexpectedly.</p>
            </li>
          </ul>
        ),
      },

      {
        title: "Our Battery Services",
        content: (
          <div style={featureGrid}>
            <div style={featureCard}>✔ Genuine Batteries</div>
            <div style={featureCard}>✔ Battery Health Check</div>
            <div style={featureCard}>✔ Fast Installation</div>
          </div>
        ),
      },

      {
        title: "Why Choose Us",
        content: (
          <div style={featureGrid}>
            <div style={featureCard}>✔ Same Day Service</div>
            <div style={featureCard}>✔ Warranty Available</div>
            <div style={featureCard}>✔ Expert Technicians</div>
          </div>
        ),
      },
    ],
  },

  "software-issue": {
    title: "Software Repair",
    icon: "💻",
    description:
      "Fix software issues, hanging problems, boot loop, and system errors.",
    sections: [
      {
        title: "Software Issues We Fix",
        content: (
          <ul style={list}>
            <li style={listItem}>
              <strong>Phone Hanging</strong>
              <p>Slow phone and lagging issues.</p>
            </li>

            <li style={listItem}>
              <strong>Boot Loop</strong>
              <p>Phone stuck on logo continuously restarting.</p>
            </li>

            <li style={listItem}>
              <strong>App Crashing</strong>
              <p>Apps automatically closing or freezing.</p>
            </li>

            <li style={listItem}>
              <strong>Virus / Malware</strong>
              <p>Security threats slowing down your device.</p>
            </li>
          </ul>
        ),
      },

      {
        title: "Our Software Services",
        content: (
          <div style={featureGrid}>
            <div style={featureCard}>✔ OS Reinstall</div>
            <div style={featureCard}>✔ Virus Removal</div>
            <div style={featureCard}>✔ Performance Optimization</div>
          </div>
        ),
      },

      {
        title: "Why Choose Us",
        content: (
          <div style={featureGrid}>
            <div style={featureCard}>✔ Latest Tools</div>
            <div style={featureCard}>✔ Fast Service</div>
            <div style={featureCard}>✔ Affordable Price</div>
          </div>
        ),
      },
    ],
  },

  "charging-problem": {
    title: "Charging Problem Repair",
    icon: "🔌",
    description:
      "Fix charging port issues, slow charging, and charging IC problems.",
    sections: [
      {
        title: "Charging Issues We Fix",
        content: (
          <ul style={list}>
            <li style={listItem}>
              <strong>No Charging</strong>
              <p>Phone not charging at all.</p>
            </li>

            <li style={listItem}>
              <strong>Slow Charging</strong>
              <p>Phone charging very slowly.</p>
            </li>

            <li style={listItem}>
              <strong>Loose Charging Port</strong>
              <p>Cable disconnecting frequently.</p>
            </li>

            <li style={listItem}>
              <strong>Charging Stops</strong>
              <p>Charging starts and stops automatically.</p>
            </li>
          </ul>
        ),
      },

      {
        title: "Repair Services",
        content: (
          <div style={featureGrid}>
            <div style={featureCard}>✔ Port Replacement</div>
            <div style={featureCard}>✔ Charging IC Repair</div>
            <div style={featureCard}>✔ Fast Charging Fix</div>
          </div>
        ),
      },

      {
        title: "Why Choose Us",
        content: (
          <div style={featureGrid}>
            <div style={featureCard}>✔ Same Day Repair</div>
            <div style={featureCard}>✔ Skilled Technicians</div>
            <div style={featureCard}>✔ Warranty Support</div>
          </div>
        ),
      },
    ],
  },

  "network-fix": {
    title: "Network Problem Repair",
    icon: "📶",
    description:
      "Fix no signal, SIM issues, network IC faults, and data problems.",
    sections: [
      {
        title: "Network Issues We Fix",
        content: (
          <ul style={list}>
            <li style={listItem}>
              <strong>No Signal</strong>
              <p>Weak or missing mobile network signal.</p>
            </li>

            <li style={listItem}>
              <strong>SIM Not Detected</strong>
              <p>Phone unable to detect SIM card.</p>
            </li>

            <li style={listItem}>
              <strong>Call Drop</strong>
              <p>Frequent network disconnection issues.</p>
            </li>

            <li style={listItem}>
              <strong>Mobile Data Not Working</strong>
              <p>Internet issues despite active data plan.</p>
            </li>
          </ul>
        ),
      },

      {
        title: "Our Services",
        content: (
          <div style={featureGrid}>
            <div style={featureCard}>✔ Antenna Repair</div>
            <div style={featureCard}>✔ SIM Slot Repair</div>
            <div style={featureCard}>✔ Network IC Repair</div>
          </div>
        ),
      },

      {
        title: "Why Choose Us",
        content: (
          <div style={featureGrid}>
            <div style={featureCard}>✔ Fast Diagnosis</div>
            <div style={featureCard}>✔ Affordable Pricing</div>
            <div style={featureCard}>✔ Warranty Available</div>
          </div>
        ),
      },
    ],
  },

  "mobile-unlock": {
    title: "Mobile Unlock Service",
    icon: "🔓",
    description:
      "Unlock pattern lock, PIN, password, and FRP lock safely.",
    sections: [
      {
        title: "Unlock Problems We Solve",
        content: (
          <ul style={list}>
            <li style={listItem}>
              <strong>Forgot Pattern Lock</strong>
              <p>Unable to unlock your phone.</p>
            </li>

            <li style={listItem}>
              <strong>PIN / Password Lock</strong>
              <p>Forgot phone password or PIN.</p>
            </li>

            <li style={listItem}>
              <strong>FRP Lock</strong>
              <p>Google verification lock after reset.</p>
            </li>

            <li style={listItem}>
              <strong>Locked Second-Hand Phone</strong>
              <p>Previously owned phone locked by old user.</p>
            </li>
          </ul>
        ),
      },

      {
        title: "Unlock Services",
        content: (
          <div style={featureGrid}>
            <div style={featureCard}>✔ Pattern Unlock</div>
            <div style={featureCard}>✔ Password Removal</div>
            <div style={featureCard}>✔ FRP Bypass</div>
          </div>
        ),
      },

      {
        title: "Why Choose Us",
        content: (
          <div style={featureGrid}>
            <div style={featureCard}>✔ Safe Process</div>
            <div style={featureCard}>✔ Advanced Tools</div>
            <div style={featureCard}>✔ Affordable Price</div>
          </div>
        ),
      },
    ],
  },

  "motherboard-repair": {
    title: "Motherboard Repair",
    icon: "🛠️",
    description:
      "Advanced chip-level motherboard repair service for all smartphones.",
    sections: [
      {
        title: "Motherboard Issues We Fix",
        content: (
          <ul style={list}>
            <li style={listItem}>
              <strong>Dead Phone</strong>
              <p>Phone completely not turning on.</p>
            </li>

            <li style={listItem}>
              <strong>Water Damage</strong>
              <p>Liquid damage affecting motherboard.</p>
            </li>

            <li style={listItem}>
              <strong>Short Circuit</strong>
              <p>Internal power shorting problems.</p>
            </li>

            <li style={listItem}>
              <strong>Heating & Restarting</strong>
              <p>Phone overheating and auto restart issue.</p>
            </li>
          </ul>
        ),
      },

      {
        title: "Repair Services",
        content: (
          <div style={featureGrid}>
            <div style={featureCard}>✔ IC Repair</div>
            <div style={featureCard}>✔ Water Damage Cleaning</div>
            <div style={featureCard}>✔ Full Diagnosis</div>
          </div>
        ),
      },

      {
        title: "Why Choose Us",
        content: (
          <div style={featureGrid}>
            <div style={featureCard}>✔ Chip-Level Experts</div>
            <div style={featureCard}>✔ Advanced Tools</div>
            <div style={featureCard}>✔ Warranty Support</div>
          </div>
        ),
      },
    ],
  },
};

  const service = serviceData[slug];

  if (loading) {
    return <ServicesDetailSkeleton />;
  }

  if (!service) {
    return (
      <div style={notFound}>
        <h1>Service Not Found</h1>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{service.title}</title>

        <meta
          name="description"
          content={service.description}
        />
      </Helmet>

      <div style={container}>
        {/* HERO */}
        <div style={hero}>
          <div style={heroOverlay}></div>

          <div style={heroContent}>
            <div style={iconCircle}>{service.icon}</div>

            <h1 style={heroTitle}>{service.title}</h1>

            <p style={heroSub}>
              Fast • Trusted • Affordable Mobile Repair Service
            </p>

            <div style={heroBtns}>
              <a href="tel:+919060211167" style={callBtn}>
                <FaPhoneAlt />
                Call Now
              </a>

              <a
                href="https://wa.me/919060211167"
                target="_blank"
                rel="noreferrer"
                style={whatsappBtn}
              >
                <FaWhatsapp />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={contentWrapper}>
          {/* LEFT */}
          <div style={left}>
            {service.sections.map((sec, i) => (
              <Section key={i} title={sec.title}>
                {sec.content}
              </Section>
            ))}
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={sidebar}>
            <div style={sidebarCard}>
              <h3 style={sidebarTitle}>Why Customers Trust Us</h3>

              <div style={sidebarItem}>
                <FaCheckCircle color="#22c55e" />
                7+ Years Experience
              </div>

              <div style={sidebarItem}>
                <FaCheckCircle color="#22c55e" />
                Genuine Parts
              </div>

              <div style={sidebarItem}>
                <FaCheckCircle color="#22c55e" />
                Fast Service
              </div>

              <div style={sidebarItem}>
                <FaCheckCircle color="#22c55e" />
                Affordable Rates
              </div>
            </div>

            <div style={ctaCard}>
              <FaMobileAlt size={40} color="#38bdf8" />

              <h3 style={{ marginTop: "15px" }}>
                Need Mobile Repair?
              </h3>

              <p style={{ color: "#94a3b8", fontSize: "14px" }}>
                Contact Deepak Communication today for fast
                and reliable repair service.
              </p>

              <a href="tel:+919060211167" style={ctaButton}>
                Contact Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceDetail;

/* ================= STYLES ================= */

const container = {
  background: "linear-gradient(135deg,#020617,#0f172a)",
  minHeight: "100vh",
  color: "#fff",
};

/* HERO */

const hero = {
  position: "relative",
 
  padding: "90px 20px 70px", // ✅ extra top & bottom spacing
  textAlign: "center",
  overflow: "hidden",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
};

const heroOverlay = {
  position: "absolute",
  inset: 0,
  background:
    "radial-gradient(circle at top, rgba(56,189,248,0.15), transparent 60%)",
};

const heroContent = {
  position: "relative",
  zIndex: 2,
};

const iconCircle = {
  width: "90px",
  height: "90px",
  margin: "0 auto 20px",
  borderRadius: "50%",
  background: "linear-gradient(135deg,#38bdf8,#0ea5e9)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "40px",
  boxShadow: "0 10px 30px rgba(56,189,248,0.4)",
};

const heroTitle = {
  fontSize: "42px",
  fontWeight: "700",
  lineHeight: "1.4", // ✅ increase line height
  paddingBottom: "10px", // ✅ prevent text cut
  marginBottom: "10px",
  background: "linear-gradient(90deg,#38bdf8,#22c55e)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const heroSub = {
  color: "#94a3b8",
  fontSize: "16px",
  marginBottom: "25px",
};

const heroBtns = {
  display: "flex",
  gap: "15px",
  justifyContent: "center",
  flexWrap: "wrap",
};

const callBtn = {
  background: "#2563eb",
  color: "#fff",
  padding: "12px 22px",
  borderRadius: "12px",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontWeight: "600",
};

const whatsappBtn = {
  background: "#22c55e",
  color: "#fff",
  padding: "12px 22px",
  borderRadius: "12px",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontWeight: "600",
};

/* CONTENT */

const contentWrapper = {
  display: "flex",
  gap: "25px",
  padding: "30px 20px",
  flexWrap: "wrap",
};

const left = {
  flex: 3,
  minWidth: "300px",
};

const sidebar = {
  flex: 1,
  minWidth: "280px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const section = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
};

const sectionHeader = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "18px",
};

const sectionTitle = {
  fontSize: "22px",
  fontWeight: "600",
  color: "#38bdf8",
};

const sectionText = {
  color: "#cbd5e1",
  lineHeight: "1.8",
};

const list = {
  listStyle: "none",
  padding: 0,
};

const listItem = {
  background: "#020617",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "14px",
  padding: "18px",
  marginBottom: "15px",
};

const featureGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "15px",
};

const featureCard = {
  background: "#020617",
  padding: "16px",
  borderRadius: "14px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  border: "1px solid rgba(255,255,255,0.05)",
};

const sidebarCard = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
  padding: "25px",
};

const sidebarTitle = {
  marginBottom: "18px",
  color: "#38bdf8",
};

const sidebarItem = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "14px",
  color: "#cbd5e1",
};

const ctaCard = {
  background: "linear-gradient(135deg,#0f172a,#1e293b)",
  border: "1px solid rgba(56,189,248,0.15)",
  borderRadius: "20px",
  padding: "30px 20px",
  textAlign: "center",
};

const ctaButton = {
  display: "inline-block",
  marginTop: "18px",
  background: "#38bdf8",
  color: "#fff",
  padding: "12px 20px",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: "600",
};

const notFound = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#020617",
  color: "#fff",
};