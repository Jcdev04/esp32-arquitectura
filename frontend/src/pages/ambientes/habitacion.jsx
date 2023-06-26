import { socket } from "../../js/socket";
import Toggle from "../../components/toggle";
function Habitacion({ estados, setEstados }) {
  const handleFocoHabitacion = (value) => {
    setEstados((previous) => ({ ...previous, led: value }));
    const LED = {};
    LED.value = value;
    LED.habitacion = 2;
    socket.emit("handle_foco", JSON.stringify(LED));
  };
  return (
    <>
      <Toggle
        estado={estados.led}
        handleFoco={handleFocoHabitacion}
        nombreToggle="Foco habitación"
        idToggle="toggle_foco_habitacion"
      />
    </>
  );
}

export default Habitacion;
