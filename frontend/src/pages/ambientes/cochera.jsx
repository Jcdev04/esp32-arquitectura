import { useEffect, useState } from "react";
import { socket } from "../../js/socket";

function Cochera() {
  const [distancia, setDistancia] = useState(0);
  useEffect(() => {
    socket.on("valores_sensores", (data) => {
      setDistancia(data.distancia);
    });
  }, []);

  const handleFoco = (value) => {
    const LED = {};
    LED.value = value;
    socket.emit("prender_apagar_interface", JSON.stringify(LED));
  };
  const handlePuertaCochera = (value) => {
    const PUERTA = {};
    PUERTA.value = value;
    socket.emit("handle_puerta", JSON.stringify(PUERTA));
  };
  return (
    <>
      <div className="card__elemento">
        <p className="card__texto">Puerta cochera</p>
        {/* <!-- Rounded switch -->   */}
        <div className="toggle-switch">
          <input
            className="toggle-input cochera__puerta"
            id="toggle-cochera"
            type="checkbox"
            onChange={(e) => handlePuertaCochera(e.target.checked)}
          />
          <label className="toggle-label" htmlFor="toggle-cochera"></label>
        </div>
      </div>
      <div className="card__elemento">
        <p className="card__texto">Foco</p>
        {/* <!-- Rounded switch -->   */}
        <div className="toggle-switch">
          <input
            className="toggle-input cochera__puerta"
            id="toggle-foco"
            type="checkbox"
            onChange={(e) => handleFoco(e.target.checked)}
          />
          <label className="toggle-label" htmlFor="toggle-foco"></label>
        </div>
      </div>
      <div className="card__elemento">
        <p className="card__texto">Distancia:</p>
        <p id="distancia__ultrasonido">{distancia} cm</p>
      </div>
    </>
  );
}

export default Cochera;
