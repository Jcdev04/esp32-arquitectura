

#define trig 19 // Pin del trigger del sensor ultrasónico
#define echo 21    // Pin del echo del sensor ultrasónico
#define Buzzer 23 // Pin del buzzer

int time_ms = 60; //tiempo en milisegundos
int tiempo = 0; // //tiempo que demora en llegar el eco
int distancia = 0; //distancia en centimetros

void setup()
{
  Serial.begin (9600); //iniciailzamos la comunicación
  pinMode (trig, OUTPUT); //Pin trigger como salida.
  pinMode (echo, INPUT); //Pin echo como entrada.
  pinMode(Buzzer, OUTPUT); // Pin del Buzzer como salida.

}

void loop()
{
  digitalWrite(Buzzer, LOW); //Inicializamo el sonido del buzzer como OFF.
  digitalWrite(trig, HIGH); //generamos Trigger (disparo) de 100us
  delayMicroseconds(100);
  digitalWrite(trig, LOW);
  tiempo = pulseIn(echo, HIGH); //medimos el tiempo entre pulsos, en microsegundos
  distancia = tiempo / 58.5; //escalamos el tiempo a una distancia en cm
  delay(100);

  if (distancia <= 22)
  {
    Serial.print("La distancia es de ");
    Serial.print(distancia);      //Enviamos serialmente el valor de la distancia
    Serial.print("cm");
    Serial.println();
    digitalWrite(23, HIGH);
    tone(Buzzer, 200, 200);


  } else if (distancia <= 15){
    Serial.print("La distancia es de ");
    Serial.print(distancia);      //Enviamos serialmente el valor de la distancia
    Serial.print("cm");
    Serial.println();
    digitalWrite(23, HIGH);
    tone(Buzzer, 2500, 200);

  } else if (distancia <= 8 ){
    Serial.print("La distancia es de ");
    Serial.print(distancia);      //Enviamos serialmente el valor de la distancia
    Serial.print("cm");
    Serial.println();

    tone(Buzzer, 3000, 200);

  }

  noTone(Buzzer);
}
