import { useEffect, useState, useRef } from "react";
import { socket } from "../../js/socket";
import Peer from "simple-peer";
function Monitorear() {
  const [stream, useStream] = useState();
  const [callEveryone, setCallEveryone] = useState(true);
  useEffect(() => {
    //if alguien no está emitiendo un evento callEveryone false
  }, []);
  return <div>{callEveryone && <button>Llamar</button>}</div>;
}

export default Monitorear;
