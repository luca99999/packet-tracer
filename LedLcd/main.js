// funzione di inizializzazione
function setup() {
	// Pin 1 del Led in Output
	pinMode(1, OUTPUT);
	// Pin 0 del bottone in Input
	pinMode(0, INPUT);
	// Pin 2 del LCD in OUTPUT
    pinMode(1, OUTPUT);
}

// ciclo infinito
function loop() {
	// legge dal pin 0 lo stato del bottone (ON / OFF)
	// quando il bottone è impostato su ON il valore è 1023
	// altrimenti su OFF è 0
	var bottone = digitalRead(0);
	Serial.println("Stato bottone " + bottone);
	if(bottone == 1023)
	{
		// scrive sul LCD ON
		customWrite(2, "Bottone ON");
		// accende il led
		digitalWrite(1, HIGH);
	}
	else
	{
	   // scrive sul LCD OFF
	   customWrite(2, "Bottone OFF");
	   // spegne il led
	   digitalWrite(1, LOW);
	}
}