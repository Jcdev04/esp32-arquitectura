import { useEffect, useState } from "react";
import { socket } from "../../js/socket";
import Toggle from "../../components/toggle";

function Cochera() {
  const [distancia, setDistancia] = useState(0);
  const [monitorear, setMonitorear] = useState(false);
  useEffect(() => {
    socket.on("valores_sensores", (data) => {
      if (data.distancia != null) return setDistancia(data.distancia);
      setDistancia(0);
    });
  }, []);

  const handleFocoCochera = (value) => {
    const LED = {};
    LED.value = value;
    LED.habitacion = 1;
    socket.emit("handle_foco", JSON.stringify(LED));
  };
  const handlePuertaCochera = (value) => {
    const PUERTA = {};
    PUERTA.value = value;
    socket.emit("handle_puerta", JSON.stringify(PUERTA));
  };
  const handleMonitorearDistancia = (value) => {
    setMonitorear(value);
    const MONITOREAR = {};
    MONITOREAR.value = value;
    console.log(MONITOREAR);
    socket.emit("value_alarma_auto", JSON.stringify(MONITOREAR));
  };
  return (
    <>
      <Toggle
        handleFoco={handlePuertaCochera}
        nombreToggle="Puerta cochera"
        idToggle="togle_puerta_cochera"
      />
      <Toggle
        handleFoco={handleFocoCochera}
        nombreToggle="Foco cochera"
        idToggle="togle_foco_cochera"
      />
      <Toggle
        handleFoco={handleMonitorearDistancia}
        nombreToggle="Monitorear distancia"
        idToggle="togle_monitoriar_distancia"
      />
      <div className="card__elemento">
        <p className="card__texto" style={{ color: !monitorear && "#bababa" }}>
          Distancia:
        </p>
        <p
          id="distancia__ultrasonido"
          style={{ color: !monitorear && "#bababa" }}
        >
          {distancia} cm
        </p>
      </div>
    </>
  );
}

export default Cochera;
