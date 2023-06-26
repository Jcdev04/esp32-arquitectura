import { useEffect, useState } from "react";
import { socket } from "./js/socket";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Principal from "./pages/principal";
//RootComponent
import Ambiente from "./components/ambiente";
//ContentComponents
import Cochera from "./pages/ambientes/cochera";
import Habitacion from "./pages/ambientes/habitacion";
import Bath from "./pages/ambientes/bath";
import Sala from "./pages/ambientes/sala";
import CocinaComedor from "./pages/ambientes/cocina-comedor";
import Monitorear from "./pages/ambientes/monitorear";
function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [alarma, setAlarma] = useState(false);
  //estados globales
  const [habitacion, setHabitacion] = useState({ led: false });
  const [bath, setBath] = useState({ led: false });
  const [sala, setSala] = useState({ led: false, seguridad: false });
  const [cochera, setCochera] = useState({
    led: false,
    puerta: false,
    monitorear: false,
  });
  const [cocina, setCocina] = useState({ led: false });
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }
    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Principal />} />
            <Route
              path="habitacion"
              element={
                <Ambiente
                  AmbienteContenido={
                    <Habitacion
                      estados={habitacion}
                      setEstados={setHabitacion}
                    />
                  }
                  nombre={"Habitación"}
                />
              }
            />
            <Route
              path="bath"
              element={
                <Ambiente
                  AmbienteContenido={
                    <Bath estados={bath} setEstados={setBath} />
                  }
                  nombre={"Baño"}
                />
              }
            />
            <Route
              path="sala"
              element={
                <Ambiente
                  AmbienteContenido={
                    <Sala
                      setAlarma={setAlarma}
                      estados={sala}
                      setEstados={setSala}
                    />
                  }
                  nombre={"Sala"}
                  alarma={alarma}
                />
              }
            />
            <Route
              path="cochera"
              element={
                <Ambiente
                  AmbienteContenido={
                    <Cochera estados={cochera} setEstados={setCochera} />
                  }
                  nombre={"Cochera"}
                />
              }
            />
            <Route
              path="cocina-comedor"
              element={
                <Ambiente
                  AmbienteContenido={
                    <CocinaComedor estados={cocina} setEstados={setCocina} />
                  }
                  nombre={"Cocina y Comedor"}
                />
              }
            />
            <Route path="/monitorear" element={<Monitorear />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
