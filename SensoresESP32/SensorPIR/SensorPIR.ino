//int inputPin = 7; // for Arduino microcontroller
int inputPin = 32; // for ESP8266 microcontroller
//int inputPin = ; // for ESP32 microcontroller
 
void setup() {
  pinMode(inputPin, INPUT);
  Serial.begin(115200);

  delay(60*1000);
}
 
void loop(){
  int val = digitalRead(inputPin);
  if (val == HIGH) {
    Serial.println("Movimiento Detectado!");
  }
  else {
    Serial.println("Sin Movimiento!");
    }
    
  delay(500);
}
        
