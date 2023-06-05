import React from "react";
function Bath() {
  return (
    <>
      <div className="card__elemento">
        <p className="card__texto">Foco</p>
        {/* <!-- Rounded switch -->   */}
        <div className="toggle-switch">
          <input
            className="toggle-input habitacion1_LED1"
            id="toggle-foco"
            type="checkbox"
          />
          <label className="toggle-label" htmlFor="toggle-foco"></label>
        </div>
      </div>

      <div className="card__elemento">
        <p className="card__texto">Distancia:</p>
        <p id="distancia__ultrasonido">0 cm</p>
      </div>
    </>
  );
}

export default Bath;
