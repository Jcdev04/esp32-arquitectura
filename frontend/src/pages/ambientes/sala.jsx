function Sala() {
  return (
    <>
      <div className="card__elemento">
        <p className="card__texto">Foco</p>
        {/* <!-- Rounded switch -->   */}
        <div className="toggle-switch">
          <input
            className="toggle-input cochera__puerta"
            id="toggle-sala"
            type="checkbox"
          />
          <label className="toggle-label" htmlFor="toggle-sala"></label>
        </div>
      </div>
    </>
  );
}

export default Sala;
