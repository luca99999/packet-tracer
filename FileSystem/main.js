// apre il file e ritorna un array di oggetti
// in cui ogni elemento è una riga serializzata
// in oggetto del file
function stampaFile()
{
	 var arr = [];
	 var x = 0;
	 // apre il file in lettura
	 var file = FileSystem.open('/cartella/test.txt', File.READ);
	 var val;
	 // legge il file una riga per volta 
	 // e la carica in un array di oggetti
	 while((val = file.readln()))
	 {
	 	// converte una stringa Json in oggetto
	 	arr[x++] = JSON.parse(val);
	 	Serial.println(val);
	   	var obj = JSON.parse(val);
		Serial.println("Eta :" + obj.eta);
	 }
	 file.close();
	 // ritorna l'array di oggetti
	 return arr;
}

// stampa l'array passato come parametro
function stampaLista(lista)
{
	var length = lista.length;
	for(var x = 0; x < length; x++)
	{
		// JSON.stringify() serializza un oggetto in una stringa Json
		Serial.println(JSON.stringify(lista[x]));
		// stampa su lcd l'elemento trasformato in stringa Json dell'array
		customWrite(0, JSON.stringify(lista[x])); 
	}
	
}

// Algoritmo di ordinamento BubbleSort dell'array passato come parametro
// ritorna l'array ordinato secondo l'età

function bubbleSortEta(lista){
  	
  	// lunghezza dell'array
  	
    var length = lista.length;
    
    // Il ciclo esterno itera sull'intero array
    for (var i = length-1; i >= 0; i--){
       // Il ciclo interno itera comparando a coppie gli elementi dell'array
       for(var j = 1; j <= i; j++){
           // Se l'elemento corrente è minore di quello successivo vengono scambiati
           if(lista[j-1].eta > lista[j].eta){
               var comodo = lista[j-1];
               lista[j-1] = lista[j];
               lista[j] = comodo;
            }
       }
    }
    return lista;
}


// Algoritmo di ordinamento BubbleSort dell'array passato come parametro
// ritorna l'array ordinato secondo il nome

function bubbleSortNome(lista){
  	
  	// lunghezza dell'array
  	
    var length = lista.length;
    
    // Il ciclo esterno itera sull'intero array
    for (var i = length - 1; i >= 0; i--){
       // Il ciclo interno itera comparando a coppie gli elementi dell'array
       for(var j = 1; j <= i; j++){
           // Se l'elemento corrente è minore di quello successivo vengono scambiati
           // tra loro
           if(lista[j-1].nome > lista[j].nome){
               var comodo = lista[j-1];
               lista[j-1] = lista[j];
               lista[j] = comodo;
            }
       }
    }
    return lista;
}


    // Crea una directory
    FileSystem.mkdir("/cartella"); 

	// Crea il file se non esiste oppure apre un file per la scrittura, la lettura o 
	// l'aggiunta delle righe di testo
	var file = FileSystem.open('/cartella/test.txt', File.WRITE | File.READ | File.APPEND);
	// scrive stringhe in formato Json
	file.println("{\"nome\":\"Pippo\", \"eta\":20,\"citta\":\"Roma\"}");
	file.println("{\"nome\":\"Pluto\", \"eta\":30,\"citta\":\"Milano\"}");
	file.println("{\"nome\":\"Paperino\", \"eta\":25, \"citta\":\"Firenze\"}");
	
	file.close();
	
	// FileSystem.exists ritorna il valore boolean "true"
	// se il file esiste nel percorso specificato
	var lista;
	if(FileSystem.exists("/cartella/test.txt"))
	{
		
		Serial.println("Stampa File");
	    lista = stampaFile();
	    Serial.println("Ordina file per età");
	    lista = bubbleSortEta(lista);
	    Serial.println("Stampa lista ordinata per età");
	    stampaLista(lista);
	    Serial.println("Ordina file per nome");
	    lista = bubbleSortNome(lista);
	    Serial.println("Stampa lista ordinata per nome");
	    stampaLista(lista);
	    
	}
	else
	{
		Serial.println("Il file test.txt non esiste");
		
	}
	

