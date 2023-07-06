var express = require('express');
import * as controller from './controller'
import * as Middleware from './middleware/autorizzazioneJWT'
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

app.get('/test',Middleware.JWT,(req,res) => {
    res.send(req.token)
});

app.post('/crea-segnalazione',Middleware.JWT,(req,res) => {
    controller.creaSegnalazioni(req);
    res.send("success");
});

app.post('/modifica-segnalazione',Middleware.JWT,(req,res) =>{
    controller.modSegnalazioni(req);
    res.send("success");
});

app.post('/cancella-segnalazione',Middleware.JWT,(req,res)=>{
    controller.cancSegnalazioni(req);
    res.send("success");
});

app.post('/filtra',Middleware.JWT,(req,res)=>{
    controller.filtro(req,res);
});

app.post('/agg-stato',Middleware.JWT,(req,res)=>{
    controller.agg_stato(req);
    res.send("success");
});

app.post('/graduatoria',Middleware.JWT,(req,res)=>{
    controller.graduatoria(req,res);
});

app.post('/statistiche',Middleware.JWT,(req,res)=>{
    controller.statistiche();
    res.send("Success");
});

app.listen(8080, ()=>{console.log("Stiamo partendo")});