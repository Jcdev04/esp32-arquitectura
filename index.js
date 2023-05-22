const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

const port = 3000;

app.use(express.static(path.join('src/view')));

//Es para enviar el contenido que se mostrará en esta ruta
app.get('/', (req, res) => {
  res.sendFile('src/view/index.html');
});
//*Mandar otras rutas
//...
//...
io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('disconnect', () => {
    console.log('desconectado');
  });
  //DESDE LA INTERFAZ
  socket.on('prender_apagar_interface', (data) => {
    io.emit('prender_apagar', data);
  });

  //DESDE EL ESP32
  socket.on('ultrasonido', (data) => {
    console.log(data);
    io.emit('ultrasonido_interface', data);
  });
});

http.listen(port);
