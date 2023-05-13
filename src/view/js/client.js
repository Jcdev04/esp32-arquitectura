const socket = io();
const buttonOn = document.getElementById('button-on');
const buttonOff = document.getElementById('button-off');

const LED = {};

buttonOn.addEventListener('click', (e) => {
  LED.value = 'True';
  socket.emit('prender_apagar_interface', JSON.stringify(LED));
});
buttonOff.addEventListener('click', (e) => {
  LED.value = 'False';
  socket.emit('prender_apagar_interface', JSON.stringify(LED));
});
