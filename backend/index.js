const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
const path = require("path");
const port = 3000;
/* app.use(express.static(path.join('src/view')));

//Es para enviar el contenido que se mostrará en esta ruta
app.get('/', (req, res) => {
  res.sendFile('src/view/index.html');
}); */
app.get("/", (req, res) => {
  res.send("");
});
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("disconnect", () => {
    console.log("desconectado");
  });
  //DESDE LA INTERFAZ
  socket.on("prender_apagar_interface", (data) => {
    io.emit("prender_apagar", data);
  });
  socket.on("handle_puerta", (data) => {
    io.emit("handle_puerta_cochera", data);
  });
  socket.on("handle_seguridad", (data) => {
    io.emit("handle_seguridad_valor", data);
  });
  socket.on("activacion_alarma", (data) => {
    io.emit("handle_alarma", data);
  });

  //DESDE EL ESP32
  socket.on("value_sensores", (data) => {
    console.log(data);
    io.emit("valores_sensores", data);
  });
});

http.listen(port);
