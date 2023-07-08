var express = require('express');
import * as controller from './controller'
import * as Middleware from './middleware/chainMiddleware'
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

/**
 * Richiesta di creazione di una segnalazione
 */
app.post('/crea-segnalazione',Middleware.JWT,Middleware.VerificaCreazione,(req,res) => {
    controller.creaSegnalazioni(req);
    res.send("success");
});

/**
 * Richiesta di aggiornamento di una segnalazione
 */
app.post('/modifica-segnalazione',Middleware.JWT,Middleware.VerificaModifica,(req,res) =>{
    controller.modSegnalazioni(req);
    res.send("success");
});

/**
 * Richiesta di cancellazione di una segnalazione
 */
app.post('/cancella-segnalazione',Middleware.JWT,Middleware.VerificaCancellazione,(req,res)=>{
    controller.cancSegnalazioni(req);
    res.send("success");
});

/**
 * Richiesta per verificare lo stato delle richieste filtrando per stato ed eventulamente
 * intervallo temporale
 */
app.post('/filtra',Middleware.JWT,Middleware.VerificaFiltro,(req,res)=>{
    controller.filtro(req,res);
});

/**
 * Funzione dedicata all'admin per la validazione delle segnalazioni in PENDING
 */
app.post('/agg-stato',Middleware.JWT,Middleware.VerificaAgg,(req,res)=>{
    controller.agg_stato(req);
    res.send("success");
});

/**
 * Richiesta di visualizzare la graduatoria degli utenti in base ai coin
 */
app.post('/graduatoria',Middleware.JWT,Middleware.VerificaGrad,(req,res)=>{
    controller.graduatoria(req,res);
});

/**
 * Richiesta per la creazione di un file con le statistiche delle segnalazioni
 */
app.post('/statistiche',Middleware.JWT,Middleware.VerificaStats,(req,res)=>{
    controller.statistiche(req);
    res.send("Success");
});

/**
 * Richiesta per la creazione di un file con i dati delle segnalazioni presenti in un certo raggio
 * ed eventualmente in un certo intervallo di date
 */
app.post('/distanza',Middleware.JWT,Middleware.VerificaRic,(req,res)=>{
    controller.ricerca(req);
    res.send("Success");
});

/**
 * Richiesta per la creazione di un file con i dati dei cluster delle segnalazioni
 */
app.post('/cluster',Middleware.JWT,Middleware.VerificaCluster,(req,res)=>{
    controller.clustering(req);
    res.send("Success");
});

/**
 * Rotta dedicata all'admin per ridare i token agli utenti
 */
app.post('/refill',Middleware.JWT,Middleware.VerificaRefill,(req,res)=>{
    controller.refill(req,res);
    res.send("Success")
});

app.listen(8080, ()=>{console.log("Stiamo partendo")});