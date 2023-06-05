import React from "react";
import "../styles/habitaciones.css";
import { Link } from "react-router-dom";
import flechaIzquierda from "../assets/img/arrow-left-circle.svg";
function Ambiente({ AmbienteContenido, nombre }) {
  return (
    <section className="contenedor">
      <div className="card">
        <button className="button__regresar">
          <img
            className="flecha-izquierda"
            src={flechaIzquierda}
            alt="flecha izquierda"
          />
          <p>Regresar</p>
        </button>
        <h2 className="card__titulo">{nombre}</h2>
        <div className="card__contenido">{AmbienteContenido}</div>
      </div>
    </section>
  );
}

export default Ambiente;
