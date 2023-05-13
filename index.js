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
  /* socket.on('event_name', (data) => {
    console.log(data.now);
  }); */
  socket.on('disconnect', () => {
    console.log('desconectado');
  });
  socket.on('prender_apagar_interface', (data) => {
    console.log(data);
    io.emit('prender_apagar', data);
  });
});

http.listen(port);
