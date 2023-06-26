//https://github.com/Links2004/arduinoWebSockets/issues/641
#include <ArduinoJson.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <WiFiClientSecure.h>
#include <WebSocketsClient.h>
#include <SocketIOclient.h>
#include <ESP32Servo.h>
#include "DHT.h"
#ifdef DEBUG_ESP_PORT
#define DEBUG_MSG(...) DEBUG_ESP_PORT(__VA_ARGS__)
#else
#define DEBUG_MSG(...)
#endif
#define DEBUG_ESP_PORT Serial
#define USE_SERIAL Serial

int time_ms = 60; //tiempo en milisegundos
int tiempo = 0; // //tiempo que demora en llegar el eco
int distancia = 0; //distancia en centimetros


WiFiMulti WiFiMulti;
WebSocketsClient webSocket;
SocketIOclient socketIO;
//WebSocketsClient socketIO;
//TEMPERATURA
#define DHTPIN 19
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
//ULTRASONIDO
const int Trigger = 22;
const int Echo = 21;
//BUZZER
#define Buzzer 23 // Pin del buzzer
//FOCOS
const int foco_cochera = 32;
const int foco_habitacion = 4;
const int foco_bath = 2;
const int foco_sala = 15;
const int foco_cocina = 5;

//PIR
const int pinPir = 18; // for ESP8266 microcontroller
//SERVO
const int pinServo=13;

Servo servo;
int grados = 0;
bool security = false;
bool alarmaAuto = false;
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
  //Humedad y temperatura
  dht.begin();
  //PIR
  pinMode(pinPir, INPUT);
  //Servo Motor
  servo.attach(pinServo, 500, 2500);
  servo.write(grados);
  //BUZZER
  pinMode(Buzzer, OUTPUT); // Pin del Buzzer como salida.
  //Serial.setDebugOutput(true);
  USE_SERIAL.setDebugOutput(true);
  USE_SERIAL.println();

  for (uint8_t t = 4; t > 0; t--) {
    USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
    //pausa en la ejecución del programa hasta que se hayan enviado todos los datos pendientes en el búfer del puerto serie.
    delay(1000);
    USE_SERIAL.flush();
  }
  //Cambiar
  WiFiMulti.addAP("BRUNO", "lucasvito");
  //WiFiMulti.addAP("UPN_ESTUDIANTES", "H@zLoCorrectoUPN");

  //WiFi.disconnect();
  while (WiFiMulti.run() != WL_CONNECTED) {

    Serial.println("reconectando...");

    delay(100);
  }
  //Fin cambiar

  socketIO.begin("192.168.0.20", 3000, "/socket.io/?EIO=4");
  //socketIO.begin("10.253.4.205", 3000, "/socket.io/?EIO=4");
  
  // event handler
  socketIO.onEvent(socketIOEvent);
  // try ever 5000 again if connection has failed
  //webSocket.setReconnectInterval(3000);
  //Se podría mandar un JSON con todos los valores por defecto.
  pinMode(foco_cochera, OUTPUT);
  pinMode(foco_habitacion, OUTPUT);
  pinMode(foco_bath, OUTPUT);
  pinMode(foco_sala, OUTPUT);
  pinMode(foco_cocina, OUTPUT);
  digitalWrite(foco_cochera, LOW);
  pinMode(Trigger, OUTPUT);
  pinMode(Echo, INPUT);
}
unsigned long messageTimestamp = 0;

void loop() {
  //	webSocket.loop();
  socketIO.loop();
  uint64_t now = millis();
  //Ejecutar cada dos segundos
  if (now - messageTimestamp > 1200) {
    messageTimestamp = now;
    //------------GENERAR Y ENVIAR EL EVENTO-------------------
    // creat JSON message for Socket.IO (event)
    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();
    // Hint: socket.emit('event_name', ....
    array.add("value_sensores");

    // add payload (parameters) for the event
    JsonObject param1 = array.createNestedObject();

    /////////////////////////////////////PIR
    if(security){  
      int val = digitalRead(pinPir);
      if (val == HIGH) {
        param1["movimiento"] = true;
      }
      else {
        param1["movimiento"] = false; 
      }
      Serial.println(val);
    }
    //////////////////////////////////////ULTRASONIDO
    int distancia = 0;
    if(alarmaAuto){
      distancia = ultrasonido();
      param1["distancia"] = distancia;
    }
    prenderBuzzer(alarmaAuto,distancia);
    /////////////////////////////////////TEMPERATURA Y HUMEDAD 
    float h = dht.readHumidity();
    float t = dht.readTemperature();
    if (isnan(h) || isnan(t)) {
      Serial.println(F("Failed to read from DHT sensor!"));
    }else{
      param1["humedad"] = h;
      param1["temperatura"] = t;
    }
    // JSON to String (serializion)
    String output;
    serializeJson(doc, output);
    // Send event
    socketIO.sendEVENT(output);
  }
}

int ultrasonido(){
    int t; //tiempo en llegar el eco
    int d; //distancia en centimetros
    digitalWrite(Trigger, HIGH);
    delayMicroseconds(10);//pulso de 10us
    digitalWrite(Trigger, LOW);
    t = pulseIn(Echo, HIGH); //ancho del pulso 
    d = t/59;//tiempo a una distancia en cm
    return d;  
}


/////////////////////////////////////////////////PRINCIPAL
void handleEvent(uint8_t* payload) {
  DynamicJsonDocument doc(256);
  // Parse the JSON data
  deserializeJson(doc, (uint8_t*)payload);
  // Get the event name
  String eventName = doc[0];
  // Get the value pairs
  String valuesJsonStr = doc[1];
  if(eventName=="handle_foco_valor"){
    led_display(valuesJsonStr);
  }
  else if(eventName=="handle_puerta_cochera"){
    puerta_cochera(valuesJsonStr);
  }else if(eventName=="handle_seguridad_valor"){
    seguridad(valuesJsonStr);
  }else if(eventName=="handle_alarma_auto"){
    handleAlarmaAuto(valuesJsonStr);
  }
}
////////////////////////////////////////////////LEDS
//Prender y apagar led
void led_display(String valuesJsonStr) {
  DynamicJsonDocument valuesDoc(256);
  deserializeJson(valuesDoc, valuesJsonStr);
  bool value = valuesDoc["value"].as<bool>();
  int habitacion = valuesDoc["habitacion"].as<int>();
  if (value) {
    switch(habitacion){
    case 1:
        digitalWrite(foco_cochera, HIGH);
        break;
    case 2:
        digitalWrite(foco_habitacion, HIGH);
        break;
    case 3:
        digitalWrite(foco_bath, HIGH);
        break;
    case 4:
        digitalWrite(foco_sala, HIGH);
        break;
    case 5:
        digitalWrite(foco_cocina, HIGH);
        break;
    }
  } else {
     switch(habitacion){
    case 1:
        digitalWrite(foco_cochera, LOW);
        break;
    case 2:
        digitalWrite(foco_habitacion, LOW);
        break;
    case 3:
        digitalWrite(foco_bath, LOW);
        break;
    case 4:
        digitalWrite(foco_sala, LOW);
        break;
    case 5:
        digitalWrite(foco_cocina, LOW);
        break;
    }
  }
}
///////////////////////////////////////////////SERVOMOTOR
void puerta_cochera(String valuesJsonStr){
  DynamicJsonDocument valuesDoc(256);
  deserializeJson(valuesDoc, valuesJsonStr);
  bool value = valuesDoc["value"].as<bool>();
  if (value) {
    grados=90;  
  } else {
    grados = 0;
  }
  servo.write(grados);
}
///////////////////////////////////////////////Seguridad
void seguridad(String valuesJsonStr){
  DynamicJsonDocument valuesDoc(256);
  deserializeJson(valuesDoc, valuesJsonStr);
  security = valuesDoc["value"].as<bool>();
}
//////////////////////////////////////////////Alarma Auto
void handleAlarmaAuto(String valuesJsonStr){
  DynamicJsonDocument valuesDoc(256);
  deserializeJson(valuesDoc, valuesJsonStr);
  alarmaAuto = valuesDoc["value"].as<bool>();
}
void prenderBuzzer(bool prender, int distancia){
  if(prender && distancia<4){
    digitalWrite(Buzzer, HIGH);
    tone(Buzzer, 500, 500);
  }else{
    digitalWrite(Buzzer, LOW);
    noTone(Buzzer);
  }
}







