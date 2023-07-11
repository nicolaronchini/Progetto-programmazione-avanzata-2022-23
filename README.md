# Progetto Programmazione Avanzata 2022-23 - Bernabucci, Ronchini
## Obiettivo
Il sistema realizzato è costituito da un back-end per la gestione di segnalazioni riguardanti problematiche stradali distinte per severità e tipologia.
Il sistema permette la:
* Creazione di nuove segnalazioni
* Modifica di una segnalazione fatta dallo stesso utente
* Cancellazione di una segnalazione 
* Verifica dello stato delle proprie segnalazioni, filtrando eventualmente per stato e per intervallo di date
* Convalidazione o respingimento da parte dell'admin delle segnalazioni in "PENDING"
* Visualizzare la graduatoria degli utenti, ordinata in base ai coin posseduti per le segnalazioni validate
* Generazione di un file con le statistiche sulle segnalazioni
* Restituzione delle segnalazioni validate entro un certo raggio di ricerca e in un intervallo di date (opzionale), con relativo file 
* Generazioni di un file con i dati di clustering sulle segnalazioni in base al tipo, alla severità e ai dati di posizionamento
* Rigenerazione da parte di un admin dei token posseduti dagli utenti per poter eseguire operazioni sul database

Per ognuna delle seguenti azioni, l'utente deve prima generare un token JWT contenente tutte le informazioni necessarie per le operazioni. Successivamente, verrà utilizzato come parametro di autenticazione per le chiamate POST delle varie API realizzate.

Il sistema realizzato implementa le funzionalità di Docker per la creazione di un ambiente virtualizzato contente il database MySQL e il server su cui vengono effettuate le chiamate.

Per l'utilizzo, l'utente può sfruttare un servizio di testing come Postman per effettuare chiamate sulla porta 8080, passando il token JWT adeguato.

## Richieste
### Crea Segnalazione (/crea-segnalazione)
In questo modo è possibile creare una nuova segnalazione.

```
{
  "latitudine": 35.15,
  "longitudine": 18.9,
  "tipologia": "buca",
  "severita": "media",
  "email": "ronchini.nicola@outlook.it",
  "iat": 1688888426
}
```

* La nuova segnalazione generata viene messa in automatico a "PENDING"
* La data della segnalazione è OPZIONALE, nel caso non venisse inserita verrà utilizzata la data della richiesta
* La tipologia può assumere valori:
   * "buca" 
   * "avvallamento"
* La severità può assumere valori:
   * "bassa" - se la problematica è poco accentuata
   * "media" - se la problematica è mediamente accentuata
   * "alta" - se la problematica è molto accentuata
* I valori devono essere inseriti nel token così come scritti

### Modifica Segnalazione (/modifica-segnalazione)
In questo modo è possibile modificare una segnalazione esistente.

```
{
  "id": 1,
  "email": "ronchini.nicola@outlook.it",
  "tipologia": "avvallamento",
  "timestamp": "2023-02-15 18:30:00",
  "iat": 1688888505
}
```

* L'id deve corrispondere ad una segnalazione esistente
* La segnalazione può essere modificata solamente dall'utente che l'ha creata, controllo sull'email inserita
* I campi devono corrispondere a quelli definiti nel database
* Il payload può essere personalizzato in base a ciò che si vuole modificare

### Cancella Segnalazione (/cancella-segnalazione)
In questo modo è possibile cancellare una segnalazione esistente.

```
{
  "id": 1,
  "email": "ronchini.nicola@outlook.it",
  "iat": 1688978828
}
```

* L'id deve corrispondere ad una segnalazione esistente
* La segnalazione può essere modificata solamente dall'utente che l'ha creata, controllo sull'email inserita, o da un admin, controllo del ruolo corrispondente all'email

### Filtra Segnalazioni (/filtra)
In questo modo è possibile selezionare le segnalazioni fatte, filtrando eventualmente per lo stato e per un range di date.

```
{
  "email": "ronchini.nicola@outlook.it",
  "dataInizio": "2021-03-15 14:30:00",
  "dataFine": "2023-03-15 14:30:00",
  "stato": "PENDING",
  "iat": 1688888650
}
```

### Aggiorna stato delle segnalazioni (/agg-stato)
In questo modo è possibile aggiornare lo stato delle segnalazioni in "PENDING" a "VALIDATED" o "REJECTED". Questa operazione può essere effettuata solamente dall'amministratore e può essere eseguita in modalità bulk passando più segnalazioni in una sola richiesta.

```
{
  "idVal": [
    8,
    10,
    14
  ],
  "idRej": [
    9,
    11
  ],
  "email": "adrianomancini@gmail.com",
  "iat": 1688805805
}
```

* Gli id inseriti nei due array devono corrispondere a segnalazioni esistenti e in "PENDING"
* All'email deve corrispondere un utente con ruolo "admin"

### Visualizza graduatoria (/graduatoria)
In questo modo è possibile visualizzare la graduatoria degli utenti, classificati in base al numero di coin guadagnati con le segnalazioni validate con successo. La graduatoria può essere mostrata in ordine ascendente o discendente in base a quanto specificato nel token.

```
{
  "ordinamento": "ASC",
  "email": "ronchini.nicola@outlook.it",
  "iat": 1688888745
}
```
* L'ordinamento può assumere valori: "ASC", per ascendente, e "DESC, per discendete. I valori devono essere inseriti nel token così come scritti

### Calcolo statistiche (/statistiche)
In questo modo è possibile generare un file contenente le statistiche sulle occorrenze delle segnalazioni presenti, distinte per tipologia, severità e stato.

```
{
  "formato": "pdf",
  "email": "ronchini.nicola@outlook.it",
  "iat": 1688808335
}
```

* Il formato può assumere valori: "JSON", "csv", "pdf". I valori devono essere inseriti nel token così come scritti

### Filtra distanza delle segnalazioni (/distanza)
In questo modo è possibile generare un file contenente le segnalazioni "VALIDATED", distinte per tipologia e severità, presenti all'interno di un raggio di ricerca rispetto ad un punto fornito (latitudine e longitudine), con la relativa distanza. Il filtraggio può essere fatto anche per range di date (OPZIONALE).

```
{
  "email": "ronchini.nicola@outlook.it",
  "latitudine": 40,
  "longitudine": 12,
  "raggio": 1000000,
  "dataInizio": "2021-03-15 14:30:00",
  "dataFine": "2023-03-15 14:30:00",
  "formato": "pdf",
  "iat": 1688888934
}
```
* Il raggio fornito deve essere in metri
* Il formato può assumere valori: "JSON", "csv", "pdf". I valori devono essere inseriti nel token così come scritti

### Clustering delle segnalazioni (/cluster)
In questo modo è possibile generare un file contenente il numero di cluster presenti per le segnalazioni "VALIDATED", distinte per tipologia e severità. Per fare ciò si sfrutta DBSCAN come algoritmo di clustering e un raggio di ricerca fornito.

```
{
  "email": "ronchini.nicola@outlook.it",
  "raggio": 1000,
  "formato": "pdf",
  "iat": 1688888999
}
```
* Il raggio fornito deve essere in metri
* Il formato può assumere valori: "JSON", "csv", "pdf". I valori devono essere inseriti nel token così come scritti


### Ricarica dei token (/refill)
In questo modo è possibile per un admin restituire il numero di token massimo (10) ad un utente che gli ha esauriti. I token vengono decrementati ad ogni operazione di creazione, modifica o cancellazione sul database.

```
{
  "utente": "mariorossi@virgilio.it",
  "email": "adrianomancini@gmail.com",
  "iat": 1688825184
}
```
* L'email inserita deve corrispondere ad un utente con ruolo admin
* La mail nel campo "utente" deve corrispondere ad un utente con token pari a 0

## Progettazione
### Diagramma dei Casi d'Uso

![GitHub](/progettazione/use_case.png)

### Diagrammi delle sequenze

* /crea-segnalazione
![GitHub](/progettazione/sequenzaCreazione.png)

* /modifica-segnalazione
![GitHub](/progettazione/sequenzaModifica.png)

* /cancella-segnalazione
![GitHub](/progettazione/sequenzaCancellazione.png)

* /filtra
![GitHub](/progettazione/sequenzaFiltro.png)

* /agg-stato
![GitHub](/progettazione/sequenzaAggStato.png)

* /graduatoria
![GitHub](/progettazione/sequenzaGraduatoria.png)

* /statistiche
![GitHub](/progettazione/sequenzaStatistiche.png)

* /distanza
![GitHub](/progettazione/sequenzaDistanza.png)

* /cluster
![GitHub](/progettazione/sequenzaClustering.png)

* /refill
![GitHub](/progettazione/sequenzaRefill.png)

### Pattern
#### Singleton

Design pattern creazionale utilizzato per garantire l'esistenza di un'unica istanza di connessione al database globalmente, in modo che tutte le richieste avvengano sulla stessa.


#### Chain  of Responsability

Design pattern comportamentale utilizzato per la costruzione di catene di middleware di validazione delle richieste. In questo modo, prima di essere eseguite le funzioni del controller, si vanno a controllare la corretta creazione del token jwt e la corretta scrittuta dei payload per le rotte e a gestire gli errori intermedi. 


#### Factory

Design patter crezionale utilizzato per la creazione di oggetti specifici per ogni possibile risposta, di errore o di successo, restituita in seguito ad una richiesta. Ogni oggetto conterrà uno status code e un messaggio diverso in base alla chiamata. 

## Avvio 

* Fare la git clone della repository in locale
* Creare un nuovo file .env all'interno della cartella del progetto (dove è presente il docker-compose)
* Inserire all'interno del file la seguente riga con la chiave usata per generare i token 
```
KEY=secretkey
```
* Inizializzare Docker 
* Effetture il seguente comando all'interno della cartella del progetto
```
docker-compose up
```
* Testare il servizio attraverso le chiamate Postman fornite come test  


## Test

Sono stati definiti una serie di test che possono essere eseguiti in Postman semplicemnte importando la [postman collection](https://github.com/nicolaronchini/Progetto-programmazione-avanzata-2022-23/blob/main/progettoPA.postman_collection.json) che si trova nlla repository.

## Note

### Software

* [Visual Studio Code](https://code.visualstudio.com/) - per lo sviluppo
* [Docker](https://www.docker.com/) - per l'implementazione
* [Postman](https://www.postman.com/) - per il testing

### Autori

* Bernabucci Filippo: [GitHub](https://github.com/FilippoBernabucci)
* Ronchini Nicola: [GitHub](https://github.com/nicolaronchini)