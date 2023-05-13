//https://github.com/Links2004/arduinoWebSockets/issues/641
#include <ArduinoJson.h>
#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <WiFiClientSecure.h>
#include <WebSocketsClient.h>
#include <SocketIOclient.h>

#ifdef DEBUG_ESP_PORT
#define DEBUG_MSG(...) DEBUG_ESP_PORT(__VA_ARGS__)
#else
#define DEBUG_MSG(...)
#endif
#define DEBUG_ESP_PORT Serial

WiFiMulti WiFiMulti;
WebSocketsClient webSocket;
SocketIOclient socketIO;
//WebSocketsClient socketIO;
#define USE_SERIAL Serial

const int LED = 21;


//Si es necesario, agregar hexdump
void socketIOEvent(socketIOmessageType_t type, uint8_t* payload, size_t length) {
  switch (type) {
    case sIOtype_DISCONNECT:
      Serial.printf("[IOc] Disconnected!\n");
      break;
    case sIOtype_CONNECT:
      Serial.printf("[IOc] Connected to url: %s\n", payload);
      // join default namespace (no auto join in Socket.IO V3)
      socketIO.send(sIOtype_CONNECT, "/");
      // socketIO.send("hiiii");
      break;
    case sIOtype_EVENT:
      // Serial.printf("[IOc] get event: %s\n", payload);
      // Call the led_display() function with the payload object
      handleEvent(payload);
      break;
    case sIOtype_ACK:
      Serial.printf("[IOc] get ack: %u\n", length);
      break;
    case sIOtype_ERROR:
      Serial.printf("[IOc] get error: %u\n", length);
      break;
    case sIOtype_BINARY_EVENT:
      Serial.printf("[IOc] get binary: %u\n", length);
      break;
    case sIOtype_BINARY_ACK:
      Serial.printf("[IOc] get binary ack: %u\n", length);
      break;
  }
}

void setup() {
  USE_SERIAL.begin(115200);
  delay(10);
  //Serial.setDebugOutput(true);
  USE_SERIAL.setDebugOutput(true);
  USE_SERIAL.println();

  for (uint8_t t = 4; t > 0; t--) {
    USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
    //pausa en la ejecución del programa hasta que se hayan enviado todos los datos pendientes en el búfer del puerto serie.
    USE_SERIAL.flush();
    delay(1000);
  }
  //Cambiar
  WiFiMulti.addAP("iPhone Jesús", "web-devxd");

  //WiFi.disconnect();
  while (WiFiMulti.run() != WL_CONNECTED) {

    Serial.println("reconectando...");

    delay(100);
  }
  //Fin cambiar

  socketIO.begin("172.20.10.2", 3000, "/socket.io/?EIO=4");
  // event handler
  socketIO.onEvent(socketIOEvent);
  // try ever 5000 again if connection has failed
  //webSocket.setReconnectInterval(3000);
  //socketIO.onEvent("prender_apagar", led_display);
  //Se podría mandar un JSON con todos los valores por defecto.
  pinMode(LED, OUTPUT);
  digitalWrite(LED, LOW);
}
unsigned long messageTimestamp = 0;

void loop() {
  //	webSocket.loop();
  socketIO.loop();

  uint64_t now = millis();
  //Ejecutar cada dos segundos
  if (now - messageTimestamp > 2000) {
    messageTimestamp = now;

    //------------GENERAR Y ENVIAR EL EVENTO-------------------
    // creat JSON message for Socket.IO (event)
    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();
    // add evnet name
    // Hint: socket.emit('event_name', ....
    array.add("event_name");

    // add payload (parameters) for the event
    JsonObject param1 = array.createNestedObject();
    param1["now"] = "Saludando desde el ESP32";

    // JSON to String (serializion)
    String output;
    serializeJson(doc, output);
    // Send event
    socketIO.sendEVENT(output);
  }
}
void handleEvent(uint8_t* payload) {
  DynamicJsonDocument doc(256);
  // Parse the JSON data
  deserializeJson(doc, (uint8_t*)payload);
  // Get the event name
  String eventName = doc[0];
  // Get the value pairs
  String valuesJsonStr = doc[1];
  if(eventName=="prender_apagar"){
    led_display(valuesJsonStr);
  }
}

//Prender y apagar led
void led_display(String valuesJsonStr) {
  DynamicJsonDocument valuesDoc(256);
  deserializeJson(valuesDoc, valuesJsonStr);
  String value = valuesDoc["value"];
  if (value=="True") {
    digitalWrite(LED, HIGH);
  } else {
    digitalWrite(LED, LOW);
  }
}
