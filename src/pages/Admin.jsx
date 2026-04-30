import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Admin() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("slider");
  const [menuOpen, setMenuOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("manager");

  // FETCH USERS

  const fetchUsers = async () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    const res = await fetch(`${API}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (Array.isArray(data)) {
      setUsers(data);
    } else {
      console.error("API Error:", data);
      setUsers([]);
    }
  };
  // CREATE USER
  const createUser = async () => {
    const token = getToken();

    console.log("SENDING:", {
      username: newUsername,
      password: newPassword,
      role: newRole,
    });

    const res = await fetch(`${API}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: newUsername,
        password: newPassword,
        role: newRole || "manager",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
  console.error("ERROR RESPONSE:", data);
  alert(data.error || data.message || "Error");
  return;
}

    fetchUsers();
    setNewUsername("");
    setNewPassword("");
    setNewRole("manager");
  };

  // DELETE USER
  const deleteUser = async (id) => {
    const token = getToken();

    await fetch(`${API}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchUsers();
  };
  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
    }
  }, [activeTab]);

  // const isMobile = window.innerWidth < 768;
  const API = import.meta.env.VITE_API_URL;

  // ===

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // ✅ initial
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const sidebarStyle = {
    ...baseSidebar,
    width: isMobile ? "200px" : "220px",
    padding: "20px",
    transform: isMobile
      ? menuOpen
        ? "translateX(0)"
        : "translateX(-100%)"
      : "translateX(0)",
  };

  const contentStyle = {
    padding: "15px",
    marginLeft: isMobile ? "0" : "240px",
    marginTop: isMobile ? "60px" : "0",
  };

  const sectionHeader = {
    ...sectionHeaderBase,
    top: isMobile ? "60px" : "90px",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "flex-start" : "center",
    gap: "10px",
  };

  const gridStyle = {
    ...baseGrid,
    gridTemplateColumns: isMobile
      ? "repeat(2, 1fr)"
      : "repeat(auto-fill, minmax(140px, 1fr))",
  };
  // ================= CONTACT =================
  const [messages, setMessages] = useState([]);
  const unreadCount = messages.filter((m) => !m.isRead).length;
  const [replyInputs, setReplyInputs] = useState({});

  const fetchMessages = async () => {
    const res = await fetch(`${API}/contact`);
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ============== TOGGLE READ STATUS =================

  const toggleRead = async (id) => {
    await fetch(`${API}/contact/read/${id}`, {
      method: "PUT",
    });

    fetchMessages();
  };

  useEffect(() => {
    if (activeTab === "contact") fetchMessages();
  }, [activeTab]);

  // ================= AUTH =================
  const navigate = useNavigate();

  const getToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  // ✅ SAFE AUTH CHECK
  useEffect(() => {
    const token = getToken();

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/");
  };

  // ===============send reply=====================
  const sendReply = async (id, replyText) => {
    try {
      const res = await fetch(`${API}/contact/reply/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reply: replyText }),
      });

      const data = await res.json();
      console.log("REPLY RESPONSE:", data);

      fetchMessages();
    } catch (err) {
      console.log("REPLY ERROR:", err);
    }
  };

  const deleteMessage = async (id) => {
    await fetch(`${API}/contact/${id}`, {
      method: "DELETE",
    });

    fetchMessages();
  };

  // ================= SLIDER =================
  const [sliderImage, setSliderImage] = useState(null);
  const [sliderPreview, setSliderPreview] = useState("");
  const [sliders, setSliders] = useState([]);

  const fetchSlider = async () => {
    const token = getToken();
    const res = await fetch(`${API}/slider`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setSliders(data || []); // ✅ FIX response
  };

  useEffect(() => {
    fetchSlider();
  }, []);

  const uploadSlider = async () => {
    if (!sliderImage) {
      alert("Select image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", sliderImage);
    const token = getToken();
    console.log("FRONTEND TOKEN:", token);
    const res = await fetch(`${API}/slider`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Upload failed");
      return;
    }

    fetchSlider();
    setSliderImage(null);
    setSliderPreview("");
  };
  const deleteSlider = async (id) => {
    const token = getToken();

    await fetch(`${API}/slider/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchSlider();
  };

  // ================= CATEGORY =================
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API}/categories`);
      const data = await res.json();
      setCategories(data || []);
    } catch (err) {
      console.error("Fetch categories failed:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    const trimmed = newCategory.trim().toLowerCase();

    if (!trimmed) {
      toast.error("Category cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const token = getToken(); // ✅ ADD THIS
      const res = await fetch(`${API}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        // 👇 show backend message (duplicate etc.)
        toast.error(data.message || "Something went wrong");
        return;
      }

      toast.success(data.message || "Category added");

      setNewCategory("");
      fetchCategories();
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const token = getToken(); // ✅ ADD THIS
      await fetch(`${API}/categories/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ================= PRODUCTS =================
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const [files, setFiles] = useState([]);

  const [discount, setDiscount] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "discount") {
      setDiscount(e.target.value);
    }
  };

  const fetchProducts = async () => {
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    setProducts(data.products || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files)); // convert FileList → array
  };

  const addProduct = async () => {
    const token = getToken();

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    formData.append("name", name);
    formData.append("price", price);
    formData.append("discount", discount || 0);
    formData.append("category", category);

    try {
      let res;

      if (editId) {
        res = await fetch(`${API}/products/${editId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            price: Number(price),
            discount: Number(discount || 0),
            category,
          }),
        });
      } else {
        res = await fetch(`${API}/products`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      }

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed");
        return;
      }

      toast.success(editId ? "Product updated" : "Product added");

      fetchProducts();
      resetForm();
    } catch (err) {
      toast.error("Server error");
    }
  };
  const deleteProduct = async (id) => {
    const token = getToken(); // ✅
    await fetch(`${API}/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setDiscount(product.discount || 0); // ✅ ADD THIS
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("");
    setFiles([]);
    setEditId(null);
    setDiscount("");
  };
  // ================= TEAM =================
  const [team, setTeam] = useState([]);
  const [memberName, setMemberName] = useState("");
  const [role, setRole] = useState("");
  const [teamImage, setTeamImage] = useState(null);
  const [teamPreview, setTeamPreview] = useState("");

  const fetchTeam = async () => {
    const res = await fetch(`${API}/team`);
    const data = await res.json();
    setTeam(data || []);
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const addTeam = async () => {
    if (!teamImage) return alert("Select image");

    // const token =
    //   localStorage.getItem("token") || sessionStorage.getItem("token");

    const formData = new FormData();
    formData.append("image", teamImage);
    formData.append("name", memberName);
    formData.append("role", role);

    const token = getToken();

    try {
      const res = await fetch(`${API}/team`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ ADD HERE
        },

        body: formData,
      });

      const data = await res.json();
      console.log("TEAM RESPONSE:", data);

      if (!res.ok) {
        alert(data.error || "Upload failed");
        return;
      }

      fetchTeam();
      setTeamImage(null);
      setTeamPreview("");
      setMemberName("");
      setRole("");
    } catch (err) {
      console.log("TEAM ERROR:", err);
    }
  };

  const deleteTeam = async (id) => {
    const token = getToken(); // ✅
    await fetch(`${API}/team/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchTeam();
  };

  // ================= UI =================

  const today = new Date().toISOString().slice(5, 10);

  const birthdayUsers = messages.filter((m) => {
    if (!m.dob) return false;
    return m.dob.slice(5, 10) === today;
  });

  const getWhatsAppLink = (number, name) => {
    return `https://wa.me/${number}?text=Happy Birthday ${name} 🎉 - Deepak Communication`;
  };

  const sortedMessages = [...messages].sort((a, b) => {
    return b.isRead - a.isRead;
  });

  const previewImg = {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "2px solid #ccc",
    marginTop: "10px",
  };

  return (
    <div style={container}>
      {/* LEFT SIDEBAR */}

      {isMobile && (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            position: "fixed",
            top: "70px",
            left: "10px",
            zIndex: 1200,
            background: "#111",
            color: "#fff",
            border: "none",
            padding: "8px 12px",
            borderRadius: "5px",
          }}
        >
          ☰
        </button>
      )}
      <div style={sidebarStyle}>
        <h2 style={logo}>Admin</h2>

        {/* 🔥 SMALL LOGOUT BELOW TITLE */}
        <button onClick={logout} style={logoutBtn}>
          Logout
        </button>

        {/* MENU */}
        <div style={menu}>
          <button onClick={() => setActiveTab("users")} style={tabBtn}>
            Users
          </button>
          <button onClick={() => setActiveTab("slider")} style={tabBtn}>
            Gallery
          </button>
          <button onClick={() => setActiveTab("product")} style={tabBtn}>
            Products
          </button>
          <button onClick={() => setActiveTab("category")} style={tabBtn}>
            Category
          </button>
          <button onClick={() => setActiveTab("team")} style={tabBtn}>
            Team
          </button>
          <button onClick={() => setActiveTab("contact")} style={tabBtn}>
            Messages {unreadCount > 0 && `(${unreadCount})`}
          </button>
        </div>
      </div>

      {/* RIGHT CONTENT */}

      {activeTab === "users" && (
        <div style={sectionBox}>
          <h3>User Management</h3>

          {/* ADD USER */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <input
              style={inputStyle}
              placeholder="Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />

            <input
              style={inputStyle}
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="superadmin">Super Admin</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>

            <button style={primaryBtn} onClick={createUser}>
              Add
            </button>
          </div>

          {/* USERS LIST */}
          <div style={gridStyle}>
            {users.map((u) => (
              <div key={u._id} style={card}>
                <p>
                  <b>{u.username}</b>
                </p>
                <p>{u.role}</p>

                <button style={deleteBtn} onClick={() => deleteUser(u._id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={contentStyle}>
        {/* ===== GALLERY ===== */}
        {activeTab === "slider" && (
          <div style={sectionWrapper}>
            {/* 🔥 FIXED HEADER */}
            <div style={sectionHeader}>
              <h3 style={{ margin: 0 }}>Gallery Management</h3>

              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <div style={headerControls}>
                  <input
                    style={inputStyle}
                    type="file"
                    onChange={(e) => {
                      setSliderImage(e.target.files[0]);
                      setSliderPreview(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                </div>

                <button style={primaryBtn} onClick={uploadSlider}>
                  Upload
                </button>
              </div>
            </div>

            {/* 🔽 SCROLLABLE CONTENT */}
            <div style={sectionContent}>
              {sliderPreview && <img src={sliderPreview} style={previewImg} />}

              <div style={gridStyle}>
                {sliders.map((s) => (
                  <div key={s._id} style={card}>
                    <img src={s.image} style={img} />
                    <button
                      onClick={() => deleteSlider(s._id)}
                      style={deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== PRODUCTS ===== */}
        {activeTab === "product" && (
          <>
            <h3>Products</h3>

            <input
              style={inputStyle}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              style={inputStyle}
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              style={inputStyle}
              type="number"
              placeholder="Discount %"
              onChange={(e) => setDiscount(e.target.value)}
            />
            <input type="file" multiple onChange={handleFileChange} />

            <div style={{ display: "flex", gap: "10px" }}>
              {files.map((file, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(file)}
                  style={{ width: "60px", height: "60px" }}
                />
              ))}
            </div>

            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* <p>Final Price: ₹{finalPrice}</p> */}

            <button style={primaryBtn} onClick={addProduct}>
              {editId ? "Update Product" : "Add Product"}
            </button>

            <div style={gridStyle}>
              {products.map((p) => (
                <div key={p._id} style={card}>
                  {p.images?.[0] && <img src={p.images[0]} style={img} />}
                  <p>{p.name}</p>
                  <p>
                    <span style={{ textDecoration: "line-through" }}>
                      ₹{p.price}
                    </span>{" "}
                    <b>₹{p.finalPrice}</b>
                  </p>

                  {p.discount > 0 && (
                    <p style={{ color: "green" }}>{p.discount}% OFF</p>
                  )}
                  <button
                    onClick={() => deleteProduct(p._id)}
                    style={deleteBtn}
                  >
                    Delete
                  </button>
                  <button onClick={() => handleEdit(p)}>Edit</button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ===== CATEGORY ===== */}
        {activeTab === "category" && (
          <>
            <h3>Category</h3>

            <input
              style={inputStyle}
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New Category"
            />

            <button onClick={addCategory}>Add</button>

            <div style={gridStyle}>
              {categories.map((c) => (
                <div key={c._id} style={card}>
                  <p>{c.name}</p>
                  <button
                    onClick={() => deleteCategory(c._id)}
                    style={deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ===== TEAM ===== */}
        {activeTab === "team" && (
          <>
            <h3>Team</h3>

            <input
              style={inputStyle}
              placeholder="Name"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            />
            <input
              style={inputStyle}
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <input
              style={inputStyle}
              type="file"
              onChange={(e) => setTeamImage(e.target.files[0])}
            />

            <button onClick={addTeam}>Add</button>

            <div style={gridStyle}>
              {team.map((m) => (
                <div key={m._id} style={card}>
                  <img src={m.image} style={img} />
                  <p>{m.name}</p>
                  <p>{m.role}</p>
                  <button onClick={() => deleteTeam(m._id)} style={deleteBtn}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ===== CONTACT ===== */}
        {activeTab === "contact" && (
          <div style={contactContainer}>
            {/* 🔹 LEFT - MESSAGES */}
            <div style={messagesPanel}>
              <h3>Messages</h3>

              {sortedMessages.length === 0 ? (
                <p>No messages</p>
              ) : (
                sortedMessages.map((msg) => (
                  <div
                    key={msg._id}
                    style={{
                      ...messageCard,
                      borderLeft: msg.isRead
                        ? "4px solid #555"
                        : "4px solid red",
                    }}
                  >
                    <div style={msgTop}>
                      <div>
                        <strong>{msg.name}</strong>
                        <p style={smallText}>{msg.email}</p>
                      </div>

                      <button
                        onClick={() => toggleRead(msg._id)}
                        style={readBtn}
                      >
                        {msg.isRead ? "Unread" : "Read"}
                      </button>
                    </div>

                    <p style={msgText}>{msg.message}</p>

                    <textarea
                      placeholder="Write reply..."
                      value={replyInputs[msg._id] || ""}
                      onChange={(e) =>
                        setReplyInputs({
                          ...replyInputs,
                          [msg._id]: e.target.value,
                        })
                      }
                      style={replyBox}
                    />

                    <div style={msgActions}>
                      <button
                        onClick={() => sendReply(msg._id, replyInputs[msg._id])}
                      >
                        Reply
                      </button>

                      <button
                        onClick={() => deleteMessage(msg._id)}
                        style={deleteBtn}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 🔥 RIGHT - BIRTHDAY PANEL */}
            <div style={birthdayPanel}>
              <h3>🎂 Birthdays</h3>

              {birthdayUsers.length === 0 ? (
                <p style={{ color: "#aaa" }}>No birthdays today</p>
              ) : (
                birthdayUsers.map((b) => (
                  <div key={b._id} style={birthdayCard}>
                    <p style={{ fontWeight: "bold" }}>{b.name}</p>

                    {b.whatsapp && (
                      <a
                        href={`https://wa.me/${b.whatsapp}?text=Happy Birthday ${b.name} 🎉`}
                        target="_blank"
                        rel="noreferrer"
                        style={whatsappBtn}
                      >
                        🎉 Wish
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;

/* ===== CONTENT ===== */
const contentStyle = {
  flex: 1,
  marginLeft: "280px",
  padding: "20px",
};

const container = {
  display: "flex",
  background: "#0f0f0f",
  color: "#fff",
  minHeight: "100vh",
  marginLeft: "9%",
};

/* ===== SIDEBAR ===== */
const baseSidebar = {
  background: "rgba(20,20,20,0.95)",
  backdropFilter: "blur(10px)",
  position: "fixed",
  top: "70px",
  left: 0,
  width: "220px",
  height: "calc(100vh - 70px)",
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid rgba(255,255,255,0.08)",
  zIndex: 1000,
  transition: "0.3s",
};
const sectionContent = {
  flex: 2,
  overflowY: "auto",
  padding: "15px",
};
const contactContainer = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
  alignItems: "flex-start",
};
const messagesPanel = {
  flex: 2,
  minWidth: "300px",
};

const sectionBox = {
  maxWidth: "1200px",
  margin: "0 auto",
  width: "50%",
};

const msgTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const msgActions = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
};
const smallText = {
  fontSize: "12px",
  color: "#aaa",
};
const logo = {
  color: "#ffcc00",
  fontSize: "20px",
  textAlign: "center",
  marginBottom: "10px",
};

const sectionWrapper = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};
const headerControls = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  flexWrap: "wrap",
};

const logoutBtn = {
  background: "transparent",
  color: "#ff4d4d",
  border: "1px solid #ff4d4d",
  padding: "6px",
  borderRadius: "6px",
  fontSize: "12px",
  cursor: "pointer",
  marginBottom: "20px",
};

const menu = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const tabBtn = {
  padding: "10px",
  background: "#1a1a1a",
  border: "1px solid transparent",
  borderRadius: "8px",
  color: "#ccc",
  cursor: "pointer",
  transition: "0.2s",
};

/* ===== HEADER ===== */
const sectionHeaderBase = {
  position: "sticky",
  top: "70px",
  background: "#0f0f0f",
  padding: "15px",
  borderBottom: "1px solid #222",
  zIndex: 10,
};

/* ===== GRID ===== */
const baseGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
  gap: "15px",
};

/* ===== CARD ===== */
const card = {
  background: "linear-gradient(145deg, #1a1a1a, #111)",
  padding: "12px",
  borderRadius: "12px",
  textAlign: "center",
  border: "1px solid rgba(255,255,255,0.05)",
  boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
  transition: "0.3s",
};

/* ===== IMAGE ===== */
const img = {
  width: "100%",
  height: "130px",
  objectFit: "cover",
  borderRadius: "8px",
  marginBottom: "8px",
};

/* ===== BUTTONS ===== */
const deleteBtn = {
  background: "#ff4d4d",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer",
  marginTop: "5px",
};

const primaryBtn = {
  background: "#ffcc00",
  color: "#000",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

/* ===== INPUT ===== */
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #333",
  background: "#111",
  color: "#fff",
};

/* ===== MESSAGE CARD ===== */
const messageCard = {
  background: "#1a1a1a",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px",
  border: "1px solid #222",
};

/* ===== BIRTHDAY PANEL ===== */
const birthdayPanel = {
  flex: 1,
  minWidth: "250px",
  background: "#151515",
  padding: "15px",
  borderRadius: "12px",
  border: "1px solid #222",
  boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
};

const birthdayCard = {
  background: "#222",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "10px",
  textAlign: "center",
};

const whatsappBtn = {
  display: "inline-block",
  marginTop: "5px",
  padding: "6px 12px",
  background: "#25D366",
  color: "#fff",
  borderRadius: "6px",
  textDecoration: "none",
};

/* ================= FIX ALL MISSING STYLES ================= */

// const sectionWrapper = {
//   height: "calc(100vh - 70px)",
//   display: "flex",
//   flexDirection: "column",
// };

// const headerControls = {
//   display: "flex",
//   gap: "10px",
//   alignItems: "center",
//   flexWrap: "wrap",
// };

// const sectionContent = {
//   flex: 1,
//   overflowY: "auto",
//   padding: "15px",
// };

// const contactContainer = {
//   display: "flex",
//   gap: "20px",
//   flexWrap: "wrap",
// };

// const smallText = {
//   fontSize: "12px",
//   color: "#aaa",
// };

// const messageCard = {
//   background: "#111",
//   padding: "15px",
//   marginBottom: "15px",
//   borderRadius: "10px",
// };

// const msgTop = {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
// };

const msgText = {
  margin: "10px 0",
  color: "#ddd",
};

// const msgActions = {
//   display: "flex",
//   gap: "10px",
//   marginTop: "10px",
// };

const readBtn = {
  background: "#333",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
};

const replyBox = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  background: "#1a1a1a",
  color: "#fff",
  marginTop: "10px",
  resize: "none",
};

// const previewImg = {
//   width: "150px",
//   height: "150px",
//   objectFit: "cover",
//   borderRadius: "10px",
//   border: "2px solid #ccc",
//   marginTop: "10px",
// };
