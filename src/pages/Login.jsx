import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const API = import.meta.env.VITE_API_URL;
  console.log("API:", API);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ AUTO LOGIN
useEffect(() => {
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

    console.log("TOKEN:", token);

  if (!token) return;

  const verifyToken = async () => {
    try {
      const res = await fetch(`${API}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        navigate("/admin");
      } else {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      }
    } catch (err) {
      console.log("Auto login failed", err);
    }
  };

  verifyToken();
}, [navigate, API]);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Enter username & password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.message || "Login failed ❌");
        return;
      }

      if (data.token) {
        // ✅ clear old tokens
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");

        // ✅ save based on remember me
        if (rememberMe) {
          localStorage.setItem("token", data.token);
        } else {
          sessionStorage.setItem("token", data.token);
        }

        console.log("TOKEN SAVED:", data.token);

        navigate("/admin");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      alert("Server error ❌");
    }
  };

  return (
    <div style={container}>
      <h2 style={{ color: "yellow" }}>Admin Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={input}
      />

      {/* Remember Me */}
      <div style={{ margin: "10px", color: "white" }}>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <span style={{ marginLeft: "8px" }}>Remember Me</span>
      </div>

      <button onClick={handleLogin} style={btn}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}

export default Login;

// 🎨 STYLES
const container = {
  background: "#000",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const input = {
  margin: "10px",
  padding: "10px",
  width: "250px",
};

const btn = {
  background: "red",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
};
