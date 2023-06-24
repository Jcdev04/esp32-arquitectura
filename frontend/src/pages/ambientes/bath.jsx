import React from "react";
import { socket } from "../../js/socket";
import Toggle from "../../components/toggle";
function Bath() {
  const handleFocoBath = (value) => {
    const LED = {};
    LED.value = value;
    LED.habitacion = 3;
    socket.emit("handle_foco", JSON.stringify(LED));
    console.log(LED);
  };
  return (
    <>
      <Toggle
        handleFoco={handleFocoBath}
        nombreToggle={"Foco baño"}
        idToggle={"toggle_foco_bath"}
      />
    </>
  );
}

export default Bath;
