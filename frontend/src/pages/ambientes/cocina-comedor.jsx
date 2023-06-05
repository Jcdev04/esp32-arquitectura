import React from "react";

function CocinaComedor() {
  return (
    <>
      <div className="card__elemento">
        <p className="card__texto">Foco</p>
        {/* <!-- Rounded switch -->   */}
        <div className="toggle-switch">
          <input
            className="toggle-input cochera__puerta"
            id="toggle-comedor"
            type="checkbox"
          />
          <label className="toggle-label" htmlFor="toggle-comedor"></label>
        </div>
      </div>
    </>
  );
}

export default CocinaComedor;
