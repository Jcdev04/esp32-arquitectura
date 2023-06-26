import React from "react";
import { socket } from "../../js/socket";
import Toggle from "../../components/toggle";
function CocinaComedor({ setEstados, estados }) {
  const handleFocoCocina = (value) => {
    setEstados((previous) => ({ ...previous, led: value }));
    const LED = {};
    LED.value = value;
    LED.habitacion = 5;
    socket.emit("handle_foco", JSON.stringify(LED));
  };
  return (
    <>
      <Toggle
        estado={estados.led}
        handleFoco={handleFocoCocina}
        nombreToggle="Foco comedor"
        idToggle="toggle_foco_comedor"
      />
    </>
  );
}

export default CocinaComedor;
