import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function Section({ title, children }) {
  return (
    <div style={section}>
      <h2 style={sectionTitle}>{title}</h2>
      <p style={sectionText}>{children}</p>
    </div>
  );
}

function ServiceDetail() {
  const { slug } = useParams();

  const serviceData = {
    "screen-replacement": {
      title: "Mobile Screen Replacement",
      sections: [
        {
          title: "🔧 Common Screen Issues We Fix",
          content: (
            <ul style={list}>
              <li style={listItem}>
                <strong>Broken / Cracked Screen</strong>
                <p>Accidental drops can damage the display and affect touch.</p>
              </li>
              <li style={listItem}>
                <strong>Touch Not Working</strong>
                <p>Unresponsive or ghost touch due to digitizer issues.</p>
              </li>
              <li style={listItem}>
                <strong>Display Flickering</strong>
                <p>Lines or flicker caused by internal display damage.</p>
              </li>
              <li style={listItem}>
                <strong>Black Screen</strong>
                <p>Phone is on but no display visible.</p>
              </li>
            </ul>
          ),
        },
        {
          title: "📱 Types of Displays We Repair",
          content: (
            <ul>
              <li>
                <strong>TFT LCD:</strong> Budget display
              </li>
              <li>
                <strong>IPS LCD:</strong> Better viewing angles
              </li>
              <li>
                <strong>OLED:</strong> Premium contrast
              </li>
              <li>
                <strong>AMOLED:</strong> Vibrant colors
              </li>
            </ul>
          ),
        },
        {
          title: "⚡ Why Choose Us",
          content: (
            <>
              ✔ Same day repair <br />
              ✔ Affordable pricing <br />✔ Warranty available
            </>
          ),
        },
      ],
    },

   "battery-replacement": {
  title: "Mobile Battery Replacement",
  sections: [
    {
      title: "🔋 Common Battery Issues We Fix",
      content: (
        <ul style={list}>
          <li style={listItem}>
            <strong>Fast Battery Drain</strong>
            <p>
              Your phone loses charge quickly even with minimal usage. This usually happens due to battery aging or internal damage. We replace it with a high-quality battery for long-lasting backup.
            </p>
          </li>

          <li style={listItem}>
            <strong>Phone Heating</strong>
            <p>
              Overheating while charging or using apps may indicate battery failure. We safely replace faulty batteries to prevent further damage.
            </p>
          </li>

          <li style={listItem}>
            <strong>Swollen Battery</strong>
            <p>
              A swollen battery can push the screen out and is dangerous. Immediate replacement is required to avoid risk.
            </p>
          </li>

          <li style={listItem}>
            <strong>Battery Drains Overnight</strong>
            <p>
              Even when not in use, your battery drops significantly. We fix this issue with proper battery replacement and system check.
            </p>
          </li>

          <li style={listItem}>
            <strong>Phone Shuts Down Suddenly</strong>
            <p>
              Phone turns off even when battery percentage is high. This is a sign of battery health failure.
            </p>
          </li>

          <li style={listItem}>
            <strong>Charging Percentage Not Stable</strong>
            <p>
              Battery jumps from 20% to 5% suddenly. We fix inaccurate battery calibration issues.
            </p>
          </li>
        </ul>
      ),
    },

    {
      title: "🛠️ Our Battery Services",
      content: (
        <>
          ✔ Original & high-quality battery replacement <br />
          ✔ Battery health check <br />
          ✔ Charging + battery combined repair <br />
          ✔ Safe installation with proper testing
        </>
      ),
    },

    {
      title: "⚡ Benefits of Battery Replacement",
      content: (
        <>
          ✔ Long battery backup <br />
          ✔ Improved performance <br />
          ✔ No overheating issues <br />
          ✔ Safe and reliable usage
        </>
      ),
    },

    {
      title: "⚡ Why Choose Us",
      content: (
        <>
          ✔ Same day service (30–60 minutes) <br />
          ✔ Affordable pricing <br />
          ✔ Warranty available <br />
          ✔ Experienced technicians
        </>
      ),
    },
  ],
},

    "software-issue": {
      title: "Mobile Software Repair",
      sections: [
        {
          title: "💻 Common Software Issues We Fix",
          content: (
            <ul style={list}>
              <li style={listItem}>
                <strong>Phone Hanging / Slow Performance</strong>
                <p>
                  Your phone becomes slow, apps lag, or takes time to respond.
                  We optimize system performance for smooth usage.
                </p>
              </li>

              <li style={listItem}>
                <strong>Boot Loop Problem</strong>
                <p>
                  Device stuck on logo or restarting again and again. We fix
                  system errors and restore proper booting.
                </p>
              </li>

              <li style={listItem}>
                <strong>App Crashing / Not Opening</strong>
                <p>
                  Apps automatically close or fail to open. We fix bugs and
                  reinstall system components.
                </p>
              </li>

              <li style={listItem}>
                <strong>Virus / Malware Infection</strong>
                <p>
                  Harmful apps slowing your phone or stealing data. We remove
                  malware and secure your device.
                </p>
              </li>

              <li style={listItem}>
                <strong>Auto Restart Issue</strong>
                <p>
                  Phone restarting automatically due to software conflict. We
                  diagnose and fix the root cause.
                </p>
              </li>

              <li style={listItem}>
                <strong>Software Update Failure</strong>
                <p>
                  Unable to update system or facing errors. We safely install
                  the latest OS version.
                </p>
              </li>
            </ul>
          ),
        },

        {
          title: "🛠️ Our Software Services",
          content: (
            <>
              ✔ OS reinstall & upgrade <br />
              ✔ System optimization <br />✔ Virus removal & security setup
            </>
          ),
        },

        {
          title: "⚡ Why Choose Us",
          content: (
            <>
              ✔ Latest tools & software <br />
              ✔ Safe data handling <br />
              ✔ Fast service <br />✔ Affordable pricing
            </>
          ),
        },
      ],
    },

   "charging-problem": {
  title: "Charging Problem Repair",
  sections: [
    {
      title: "🔌 Common Charging Issues We Fix",
      content: (
        <ul style={list}>
          <li style={listItem}>
            <strong>Charging Port Damage</strong>
            <p>
              Loose, broken, or worn-out charging ports can prevent proper connection. We repair or replace damaged ports for stable charging.
            </p>
          </li>

          <li style={listItem}>
            <strong>Slow Charging</strong>
            <p>
              If your phone takes too long to charge, it may be due to internal faults or port issues. We diagnose and fix it to restore fast charging.
            </p>
          </li>

          <li style={listItem}>
            <strong>No Charging</strong>
            <p>
              Phone not charging at all even after connecting the charger. We identify the root cause and fix it quickly.
            </p>
          </li>

          <li style={listItem}>
            <strong>Loose Charging Cable Connection</strong>
            <p>
              Cable disconnects easily or doesn’t fit properly. This is usually due to port damage or dirt buildup.
            </p>
          </li>

          <li style={listItem}>
            <strong>Charging Stops Frequently</strong>
            <p>
              Charging starts and stops again and again. We fix unstable power connection issues.
            </p>
          </li>

          <li style={listItem}>
            <strong>Water/Dust Damage in Charging Port</strong>
            <p>
              Dust or moisture inside the port can block charging. We clean and repair safely.
            </p>
          </li>
        </ul>
      ),
    },

    {
      title: "🛠️ Our Charging Repair Services",
      content: (
        <>
          ✔ Charging port replacement <br />
          ✔ Charging IC repair <br />
          ✔ Fast charging issue fix <br />
          ✔ Port cleaning & maintenance
        </>
      ),
    },

    {
      title: "⚡ Benefits of Repair",
      content: (
        <>
          ✔ Fast and stable charging <br />
          ✔ Longer battery life <br />
          ✔ Safe device usage <br />
          ✔ No frequent disconnection
        </>
      ),
    },

    {
      title: "⚡ Why Choose Us",
      content: (
        <>
          ✔ Same day repair (30–60 minutes) <br />
          ✔ Affordable pricing <br />
          ✔ Experienced technicians <br />
          ✔ Warranty on repairs
        </>
      ),
    },
  ],
},

   "network-fix": {
  title: "Mobile Network Problem",
  sections: [
    {
      title: "📶 Common Network Issues We Fix",
      content: (
        <ul style={list}>
          <li style={listItem}>
            <strong>No Signal / Weak Signal</strong>
            <p>
              Your phone is unable to detect network or shows very weak signal. We fix antenna and internal hardware issues to restore proper connectivity.
            </p>
          </li>

          <li style={listItem}>
            <strong>SIM Not Detected</strong>
            <p>
              Device not recognizing SIM card due to slot or motherboard issue. We repair SIM slot and internal connections.
            </p>
          </li>

          <li style={listItem}>
            <strong>Call Drop Problem</strong>
            <p>
              Frequent call disconnection or poor voice quality. We improve signal stability for smooth calling.
            </p>
          </li>

          <li style={listItem}>
            <strong>No Network After Update</strong>
            <p>
              Network lost after software update or reset. We fix software and modem-related issues.
            </p>
          </li>

          <li style={listItem}>
            <strong>Mobile Data Not Working</strong>
            <p>
              Internet not working even with active data plan. We troubleshoot APN settings and hardware faults.
            </p>
          </li>

          <li style={listItem}>
            <strong>IMEI / Baseband Issues</strong>
            <p>
              Missing IMEI or unknown baseband causing network failure. We repair system-level issues safely.
            </p>
          </li>
        </ul>
      ),
    },

    {
      title: "🛠️ Our Network Repair Services",
      content: (
        <>
          ✔ Antenna repair & replacement <br />
          ✔ SIM slot repair <br />
          ✔ Network IC repair <br />
          ✔ Software & modem fix
        </>
      ),
    },

    {
      title: "⚡ Benefits of Repair",
      content: (
        <>
          ✔ Strong and stable signal <br />
          ✔ Clear voice calls <br />
          ✔ Fast mobile data <br />
          ✔ No more call drops
        </>
      ),
    },

    {
      title: "⚡ Why Choose Us",
      content: (
        <>
          ✔ Fast diagnosis & repair <br />
          ✔ Affordable pricing <br />
          ✔ Skilled technicians <br />
          ✔ Warranty on service
        </>
      ),
    },
  ],
},

    "mobile-unlock": {
  title: "Mobile Unlock Service",
  sections: [
    {
      title: "🔓 Common Unlock Problems We Solve",
      content: (
        <ul style={list}>
          <li style={listItem}>
            <strong>Forgot Pattern Lock</strong>
            <p>
              Locked out of your phone due to forgotten pattern? We safely remove pattern lock without damaging your device.
            </p>
          </li>

          <li style={listItem}>
            <strong>PIN / Password Lock</strong>
            <p>
              Unable to access your phone due to forgotten PIN or password. We unlock it securely and quickly.
            </p>
          </li>

          <li style={listItem}>
            <strong>FRP Lock (Google Account Lock)</strong>
            <p>
              Stuck on Google verification after factory reset? We bypass FRP lock and restore access.
            </p>
          </li>

          <li style={listItem}>
            <strong>Forgot Google Account</strong>
            <p>
              Unable to remember your Google account details. We help recover access to your device.
            </p>
          </li>

          <li style={listItem}>
            <strong>Second-Hand Phone Locked</strong>
            <p>
              Bought a used phone that is locked? We unlock it and make it usable again.
            </p>
          </li>
        </ul>
      ),
    },

    {
      title: "🛠️ Our Unlock Services",
      content: (
        <>
          ✔ Pattern & PIN unlock <br />
          ✔ Password removal <br />
          ✔ FRP (Google lock) bypass <br />
          ✔ Secure unlocking with latest tools
        </>
      ),
    },

    {
      title: "⚡ Benefits of Our Service",
      content: (
        <>
          ✔ Quick unlocking (same day) <br />
          ✔ Safe and secure process <br />
          ✔ No data loss (when possible) <br />
          ✔ Works on all major brands
        </>
      ),
    },

    {
      title: "⚡ Why Choose Us",
      content: (
        <>
          ✔ Trusted mobile repair experts <br />
          ✔ Advanced unlocking tools <br />
          ✔ Affordable pricing <br />
          ✔ 100% safe process
        </>
      ),
    },
  ],
},

   "motherboard-repair": {
  title: "Motherboard Repair",
  sections: [
    {
      title: "🛠️ Common Motherboard Issues We Fix",
      content: (
        <ul style={list}>
          <li style={listItem}>
            <strong>Dead Phone (No Power)</strong>
            <p>
              Phone not turning on or completely dead. This is usually caused by motherboard failure. We diagnose and repair it using advanced tools.
            </p>
          </li>

          <li style={listItem}>
            <strong>Water / Liquid Damage</strong>
            <p>
              Exposure to water can damage internal circuits. We perform deep cleaning and chip-level repair to restore functionality.
            </p>
          </li>

          <li style={listItem}>
            <strong>Short Circuit Issues</strong>
            <p>
              Power-related faults causing phone not to start or heat up. We fix short circuits at the motherboard level.
            </p>
          </li>

          <li style={listItem}>
            <strong>No Display but Phone On</strong>
            <p>
              Phone vibrates or rings but screen is blank. This may be due to display IC or motherboard fault.
            </p>
          </li>

          <li style={listItem}>
            <strong>Network / Charging IC Failure</strong>
            <p>
              Issues like no signal or charging failure caused by damaged IC chips. We repair or replace faulty components.
            </p>
          </li>

          <li style={listItem}>
            <strong>Auto Restart / Heating Issues</strong>
            <p>
              Phone restarting automatically or overheating due to motherboard malfunction.
            </p>
          </li>
        </ul>
      ),
    },

    {
      title: "🛠️ Our Motherboard Repair Services",
      content: (
        <>
          ✔ Chip-level repair (IC repair/replacement) <br />
          ✔ Water damage cleaning & recovery <br />
          ✔ Power IC & charging IC repair <br />
          ✔ Complete motherboard diagnosis
        </>
      ),
    },

    {
      title: "⚡ Benefits of Repair",
      content: (
        <>
          ✔ Save cost compared to buying new phone <br />
          ✔ Restore full device functionality <br />
          ✔ Extend phone life <br />
          ✔ Reliable long-term performance
        </>
      ),
    },

    {
      title: "⚡ Why Choose Us",
      content: (
        <>
          ✔ Advanced chip-level tools <br />
          ✔ Experienced technicians <br />
          ✔ Affordable pricing <br />
          ✔ Warranty on repairs
        </>
      ),
    },
  ],
},
  };

  const service = serviceData[slug];

  if (!service) return <h2>Service Not Found</h2>;

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>{service.title}</title>
        <meta name="description" content={service.description} />
        <meta name="keywords" content={service.keywords} />

        <meta property="og:title" content={service.title} />
        <meta property="og:description" content={service.description} />
        <meta property="og:type" content="website" />

        <meta name="geo.region" content="IN-BR" />
        <meta name="geo.placename" content="Patna" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Deepak Communication",
            telephone: "+919060211167",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Patna",
              addressRegion: "Bihar",
              addressCountry: "IN",
            },
          })}
        </script>
      </Helmet>

      <div style={container}>
        {/* LEFT SIDE (MAIN CONTENT) */}
        <div style={left}>
          <h1 style={heroTitle}>{service.title}</h1>
          <p style={heroSub}>
            Fast • Affordable • Trusted Mobile Repair Service
          </p>

          {service.sections.map((sec, i) => (
            <Section key={i} title={sec.title}>
              {sec.content}
            </Section>
          ))}
        </div>

        {/* RIGHT SIDE (CTA CARD) */}
        <div style={right}>
          <div style={ctaCard}>
            <h2>Need Repair Now?</h2>

            <button style={callBtn}>📞 Call Now</button>
            <button style={whatsappBtn}>💬 WhatsApp</button>

            <p
              style={{ marginTop: "15px", fontSize: "13px", color: "#94a3b8" }}
            >
              ⚡ 30–60 min repair • Warranty available
            </p>
          </div>
        </div>
      </div>

      {/* STICKY MOBILE CTA */}
    </>
  );
}

export default ServiceDetail;

const list = {
  listStyle: "none",
  padding: 0,
};

const sectionText = {
  color: "#cbd5f5",
};

const listItem = {
  marginBottom: "20px",
  padding: "15px",
  background: "#020617",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.05)",
};

const container = {
  display: "flex",
  gap: "30px",
  padding: "40px",
  background: "linear-gradient(135deg, #020617, #0f172a)",
  minHeight: "100vh",
};

const left = {
  flex: 3,
};

const right = {
  flex: 1,
  position: "sticky",
  top: "100px",
  height: "fit-content",
};

const heroTitle = {
  fontSize: "36px",
  color: "#38bdf8",
  marginBottom: "10px",
};

const heroSub = {
  color: "#94a3b8",
  marginBottom: "25px",
};

const section = {
  background: "#020617",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px",
  border: "1px solid rgba(255,255,255,0.05)",
};

const sectionTitle = {
  color: "#22c55e",
  marginBottom: "10px",
};

const ctaCard = {
  background: "#020617",
  padding: "25px",
  borderRadius: "12px",
  textAlign: "center",
  border: "1px solid rgba(255,255,255,0.08)",
};

const callBtn = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "none",
  background: "#22c55e",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
};

const whatsappBtn = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "8px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
};

const hero = {
  textAlign: "center",
  marginBottom: "30px",
};

const ctaBox = {
  marginTop: "30px",
  textAlign: "center",
};

const stickyBar = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  display: "flex",
};

const stickyCall = {
  width: "100%",
  padding: "15px",
  background: "#22c55e",
  color: "#fff",
  border: "none",
};

const stickyWhats = {
  width: "100%",
  padding: "15px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
};

/* styles same as before */

/* STYLES */

const card = {
  maxWidth: "800px",
  width: "100%",
  background: "#0f172a",
  padding: "30px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  border: "1px solid rgba(255,255,255,0.1)",
};

const title = {
  fontSize: "28px",
  marginBottom: "20px",
  color: "#38bdf8",
};

const content = {
  whiteSpace: "pre-line",
  lineHeight: "1.8",
  color: "#cbd5f5",
  fontSize: "15px",
};

const btnContainer = {
  marginTop: "30px",
  display: "flex",
  gap: "15px",
};
