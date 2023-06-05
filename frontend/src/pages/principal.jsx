import "../styles/mapa.css";
import bano from "../assets/img/bano.png";
import camara from "../assets/img/camara.png";
import cochera from "../assets/img/cochera.png";
import cocina from "../assets/img/cocina.png";
import habitacion from "../assets/img/habitacion.png";
import sala from "../assets/img/sala.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "../js/socket.js";

function Principal() {
  const [temperatura, setTemperatura] = useState(0);
  const [humedad, setHumedad] = useState(0);

  useEffect(() => {
    socket.on("valores_sensores", (data) => {
      setTemperatura(data.temperatura);
      setHumedad(data.humedad);
    });
  }, []);
  return (
    <>
      {/* <!-- ! SECCION MAPA--> */}
      <section className="mapa">
        <div className="superior">
          <h1 className="mapa__h1">IntelliHome</h1>
        </div>

        <div className="casa">
          <div className="plano">
            <div className="plano__superior">
              <div className="tiempo">
                {temperatura} °C y {humedad}% humedad
              </div>
            </div>

            <div className="plano__inferior">
              <Link to="/cochera" className="cochera casa__cuarto">
                <span>Cochera</span>
                <div className="casa__puerta-garaje"></div>
                <span className="casa__texto">Puerta garaje</span>
              </Link>

              <Link to="/sala" className="sala casa__cuarto">
                <span>Sala</span>
                <div className="casa__puertas">
                  <div className="casa__ventana"></div>
                  <div className="casa__puerta"></div>
                </div>
                <div className="casa__puerta casa__puerta-2"></div>
                <div className="casa__puerta casa__puerta-3"></div>

                <span className="casa__texto casa__texto-2">Ventana</span>
                <span className="casa__texto casa__texto-3">Principal</span>
              </Link>

              <Link to="/habitacion" className="habitacion casa__cuarto">
                <span>Habitación</span>
                <div className="casa__puerta casa__puerta-6"></div>
              </Link>

              <Link to="/bath" className="bano casa__cuarto">
                <span>Baño</span>
                <div className="casa__puerta casa__puerta-5"></div>
              </Link>

              <Link to="cocina-comedor" className="cocina casa__cuarto">
                <span>Cocina - Comedor</span>
                <div className="casa__puerta casa__puerta-4"></div>
              </Link>
            </div>
          </div>
        </div>

        <div className="mapa__inferior">
          <div className="mapa__camara">
            <img src={camara} alt="camara" />
          </div>
        </div>
      </section>

      {/* <!-- ! SECCION MAPA RESPONSIVE --> */}
      <section className="mapaResponsive">
        <div className="superior">
          <h1 className="mapa__h1">IntelliHome</h1>
        </div>

        <div className="mapaResponsive__contenedor">
          <Link to="/cochera" className="mapaResponsive__card">
            <img src={cochera} alt="cochera" />
            <span>Cochera</span>
          </Link>

          <Link to="/sala" className="mapaResponsive__card">
            <img src={sala} alt="sala" />
            <span>Sala</span>
          </Link>

          <Link to="/cocina-comedor" className="mapaResponsive__card">
            <img src={cocina} alt="cocina" />
            <span>Cocina - Comedor</span>
          </Link>

          <Link to="/bath" className="mapaResponsive__card">
            <img src={bano} alt="baño" />
            <span>Baño</span>
          </Link>

          <Link to="/habitacion" className="mapaResponsive__card">
            <img src={habitacion} alt="habitacion" />
            <span>Habitacion</span>
          </Link>
        </div>

        <div className="mapa__inferior">
          <div className="mapa__camara">
            <img src={camara} alt="camara" className="mapa__img" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Principal;
