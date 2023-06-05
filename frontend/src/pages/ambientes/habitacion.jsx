import { socket } from "../../js/socket";

function Habitacion() {
  const handleFoco = (value) => {
    const LED = {};
    LED.value = value;
    LED.habitacion = 2;
    socket.emit("handle_foco", JSON.stringify(LED));
  };
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
            onChange={(e) => handleFoco(e.target.checked)}
          />
          <label className="toggle-label" htmlFor="toggle-foco"></label>
        </div>
      </div>
    </>
  );
}

export default Habitacion;
