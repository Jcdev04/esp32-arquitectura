import { useEffect, useState, useRef } from "react";
import "../../styles/monitorear.css";
function Monitorear() {
  const [stream, setStream] = useState();
  const [activeCallEveryone, setActiveCallEveryone] = useState(true);

  const video = useRef();

  const handleLlamar = () => {
    setActiveCallEveryone(false);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.current.srcObject = stream;
        video.current.play();
        setStream(stream);
        video.current.srcObject = stream;
      });
  };
  const handleColgar = () => {
    setActiveCallEveryone(true);
    if (stream !== null && stream !== undefined) {
      stream.getTracks().forEach((track) => track.stop());
      video.current.pause();
      video.current.srcObject = null;
    }
  };
  return (
    <div className="container_videoconference">
      <div className="subcontainer_videoconference">
        {!activeCallEveryone ? (
          <video className="videoconference" ref={video} autoPlay muted></video>
        ) : (
          <div className="plantilla_video"></div>
        )}
        <div className="buttons__containervc">
          {activeCallEveryone ? (
            <button
              style={{
                color: "white",
                backgroundColor: "green",
                padding: "10px 20px",
                borderRadius: "15px",
                border: "none",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.25)",
              }}
              onClick={handleLlamar}
            >
              Llamar
            </button>
          ) : (
            <button
              style={{
                color: "white",
                backgroundColor: "red",
                padding: "10px 20px",
                borderRadius: "15px",
                border: "none",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.25)",
              }}
              onClick={handleColgar}
            >
              Colgar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Monitorear;
