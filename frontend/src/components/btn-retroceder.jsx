import React from "react";

function btnRetroceder() {
  return (
    <button
      style={{
        backgroundColor: "white",
        padding: "10px",
        border: "none",
        borderRadius: "20px",
        marginBottom: 10,
        cursor: " pointer",
      }}
    >
      <p style={{ color: "var(--anaranjado)", fontSize: "var(--p)" }}>
        Retroceder al menú principal
      </p>
    </button>
  );
}

export default btnRetroceder;
