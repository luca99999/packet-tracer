// funzione di inizializzazione
function setup() {
	// Pin 1 del Led in Output
	pinMode(1, OUTPUT);
	// Pin 0 del bottone in Input
	pinMode(0, INPUT);
	// Pin 2 del LCD in OUTPUT
    pinMode(1, OUTPUT);
    
    // attachInterrupt registra una funzione di callback in modo tale che 
    // quando cambia lo stato sul pin la funzione passata come parametro è invocata.
    // Questo funziona sia per l'input analogico, digitale e custom.
    // Solo una funzione può essere registrata per pin.
    
    // Quando cambia lo stato sul pin 0 viene eseguita la funzione
    // isr
	attachInterrupt(0, isr);
}

// funzione di callback
function isr() {
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
