var express = require('express');
import * as controller from './controller'
import * as Middleware from './middleware/chainMiddleware'
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

/**
 * Richiesta di creazione di una segnalazione
 */
app.post('/crea-segnalazione',Middleware.JWT,Middleware.VerificaCreazione,Middleware.VerificaErr,(req,res) => {
    controller.creaSegnalazioni(req,res);
});

/**
 * Richiesta di aggiornamento di una segnalazione
 */
app.post('/modifica-segnalazione',Middleware.JWT,Middleware.VerificaModifica,Middleware.VerificaErr,(req,res) =>{
    controller.modSegnalazioni(req,res);
});

/**
 * Richiesta di cancellazione di una segnalazione
 */
app.post('/cancella-segnalazione',Middleware.JWT,Middleware.VerificaCancellazione,Middleware.VerificaErr,(req,res)=>{
    controller.cancSegnalazioni(req,res);
});

/**
 * Richiesta per verificare lo stato delle richieste filtrando per stato ed eventulamente
 * intervallo temporale
 */
app.post('/filtra',Middleware.JWT,Middleware.VerificaFiltro,Middleware.VerificaErr,(req,res)=>{
    controller.filtro(req,res);
});

/**
 * Funzione dedicata all'admin per la validazione delle segnalazioni in PENDING
 */
app.post('/agg-stato',Middleware.JWT,Middleware.VerificaAgg,Middleware.VerificaErr,(req,res)=>{
    controller.agg_stato(req,res);
});

/**
 * Richiesta di visualizzare la graduatoria degli utenti in base ai coin
 */
app.post('/graduatoria',Middleware.JWT,Middleware.VerificaGrad,Middleware.VerificaErr,(req,res)=>{
    controller.graduatoria(req,res);
});

/**
 * Richiesta per la creazione di un file con le statistiche delle segnalazioni
 */
app.post('/statistiche',Middleware.JWT,Middleware.VerificaStats,Middleware.VerificaErr,(req,res)=>{
    controller.statistiche(req,res);
});

/**
 * Richiesta per la creazione di un file con i dati delle segnalazioni presenti in un certo raggio
 * ed eventualmente in un certo intervallo di date
 */
app.post('/distanza',Middleware.JWT,Middleware.VerificaRic,Middleware.VerificaErr,(req,res)=>{
    controller.ricerca(req,res);
});

/**
 * Richiesta per la creazione di un file con i dati dei cluster delle segnalazioni
 */
app.post('/cluster',Middleware.JWT,Middleware.VerificaCluster,Middleware.VerificaErr,(req,res)=>{
    controller.clustering(req,res);
});

/**
 * Rotta dedicata all'admin per ridare i token agli utenti
 */
app.post('/refill',Middleware.JWT,Middleware.VerificaRefill,Middleware.VerificaErr,(req,res)=>{
    controller.refill(req,res);
});

app.listen(8080, ()=>{console.log("Stiamo partendo")});