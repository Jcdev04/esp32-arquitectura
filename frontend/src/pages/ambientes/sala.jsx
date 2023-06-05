import { useState, useEffect } from "react";
import { socket } from "../../js/socket.js";

function Sala({ setAlarma }) {
  const [seguridad, setSeguridad] = useState(false);
  useEffect(() => {
    socket.on("valores_sensores", (data) => {
      if (data.movimiento) {
        setAlarma(true);
        const ALARM = {};
        ALARM.value = true;
        socket.emit("activacion_alarma", JSON.stringify(ALARM));
        desactivarAlarma();
      }
    });
  }, []);

  const desactivarAlarma = (ALARM) => {
    setTimeout(() => {
      setAlarma(false);
      ALARM.value = false;
      socket.emit("activacion_alarma", JSON.stringify(ALARM));
    }, 5000);
  };

  const handleSeguridad = (value) => {
    const SEGURIDAD = {};
    SEGURIDAD.value = value;
    setSeguridad(value);
    socket.emit("handle_seguridad", JSON.stringify(SEGURIDAD));
  };

  return (
    <>
      <div className="card__elemento">
        <p className="card__texto">Foco</p>
        {/* <!-- Rounded switch -->   */}
        <div className="toggle-switch">
          <input
            className="toggle-input cochera__puerta"
            id="toggle-sala"
            type="checkbox"
          />
          <label className="toggle-label" htmlFor="toggle-sala"></label>
        </div>
      </div>

      <div className="card__elemento">
        <p className="card__texto">Activar seguridad</p>
        {/* <!-- Rounded switch -->   */}
        <div className="toggle-switch">
          <input
            className="toggle-input cochera__puerta"
            id="toggle-seguridad"
            type="checkbox"
            onChange={(e) => handleSeguridad(e.target.checked)}
          />
          <label className="toggle-label" htmlFor="toggle-seguridad"></label>
        </div>
      </div>
      {seguridad && (
        <div className="card__elemento">
          <p className="card__texto" style={{ color: "#740808" }}>
            *Se emitirá una alarma en cuanto se detecte movimiento
          </p>
        </div>
      )}
    </>
  );
}

export default Sala;
