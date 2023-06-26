import React from "react";

function Toggle({ handleFoco, nombreToggle, idToggle, estado }) {
  console.log("estado", estado);
  return (
    <div className="card__elemento">
      <p className="card__texto">{nombreToggle}</p>
      {/* <!-- Rounded switch -->   */}
      <div className="toggle-switch">
        <input
          className="toggle-input habitacion1_LED1"
          id={idToggle}
          type="checkbox"
          checked={estado}
          onChange={(e) => handleFoco(e.target.checked)}
        />
        <label className="toggle-label" htmlFor={idToggle}></label>
      </div>
    </div>
  );
}

export default Toggle;
