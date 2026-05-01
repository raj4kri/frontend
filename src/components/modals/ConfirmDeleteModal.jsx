import React from "react";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "400px",
  maxWidth: "90%",
  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  textAlign: "center",
};

const buttonRow = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
  gap: "10px",
};

export default function ConfirmDeleteModal({
  open,
  title = "Delete Confirmation",
  message = "Are you sure you want to delete this item?",
  loading = false,
  onCancel,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3 style={{ marginBottom: "10px", color: "#d11a2a" }}>{title}</h3>

        <p style={{ color: "#555" }}>{message}</p>

        <div style={buttonRow}>
          <button
            onClick={onCancel}
            disabled={loading}
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            style={{
              flex: 1,
              padding: "10px",
              background: "#d11a2a",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}