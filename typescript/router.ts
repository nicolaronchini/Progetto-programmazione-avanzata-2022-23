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

app.listen(8080);