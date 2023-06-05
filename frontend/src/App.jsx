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
function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

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

  const emitirEvento = () => {
    try {
      const value = {
        prenderLed: true,
      };
      socket.emit("hola", JSON.stringify(value));
      console.log(value);
    } catch (error) {
      console.error(error);
    }
  };

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
                  AmbienteContenido={<Habitacion />}
                  nombre={"Habitación"}
                />
              }
            />
            <Route
              path="bath"
              element={
                <Ambiente AmbienteContenido={<Bath />} nombre={"Baño"} />
              }
            />
            <Route
              path="sala"
              element={
                <Ambiente AmbienteContenido={<Sala />} nombre={"Sala"} />
              }
            />
            <Route
              path="cochera"
              element={
                <Ambiente AmbienteContenido={<Cochera />} nombre={"Cochera"} />
              }
            />
            <Route
              path="cocina-comedor"
              element={
                <Ambiente
                  AmbienteContenido={<CocinaComedor />}
                  nombre={"Cocina y Comedor"}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
