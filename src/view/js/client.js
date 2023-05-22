const socket = io();
const habitacion1_LED1 = document.querySelector('.habitacion1_LED1');

const LED = {};

habitacion1_LED1.addEventListener('click', (e) => {
  LED.value = habitacion1_LED1.checked;
  socket.emit('prender_apagar_interface', JSON.stringify(LED));
});
