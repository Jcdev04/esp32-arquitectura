import { useState, useEffect } from "react";
import { socket } from "../../js/socket.js";
import Toggle from "../../components/toggle.jsx";

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
  const handleFocoSala = (value) => {
    const LED = {};
    LED.value = value;
    LED.habitacion = 4;
    socket.emit("handle_foco", JSON.stringify(LED));
  };
  return (
    <>
      <Toggle
        handleFoco={handleFocoSala}
        nombreToggle="Foco sala"
        idToggle="toggle_foco_sala"
      />
      <Toggle
        handleFoco={handleSeguridad}
        nombreToggle="Activar seguridad"
        idToggle="toggle_seguridad"
      />
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
