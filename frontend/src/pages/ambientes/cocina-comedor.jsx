import React from "react";
import { socket } from "../../js/socket";

function CocinaComedor() {
  const handleFoco = (value) => {
    const LED = {};
    LED.value = value;
    LED.habitacion = 5;
    socket.emit("handle_foco", JSON.stringify(LED));
  };
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
            onChange={(e) => handleFoco(e.target.checked)}
          />
          <label className="toggle-label" htmlFor="toggle-comedor"></label>
        </div>
      </div>
    </>
  );
}

export default CocinaComedor;
