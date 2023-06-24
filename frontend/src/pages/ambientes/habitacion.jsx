import { socket } from "../../js/socket";
import Toggle from "../../components/toggle";
function Habitacion() {
  const handleFocoHabitacion = (value) => {
    const LED = {};
    LED.value = value;
    LED.habitacion = 2;
    socket.emit("handle_foco", JSON.stringify(LED));
  };
  return (
    <>
      <Toggle
        handleFoco={handleFocoHabitacion}
        nombreToggle="Foco habitación"
        idToggle="toggle_foco_habitacion"
      />
    </>
  );
}

export default Habitacion;
