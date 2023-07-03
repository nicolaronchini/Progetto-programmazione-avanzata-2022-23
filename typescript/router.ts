var express = require('express');
import * as controller from './controller'

const app = express();

app.use(express.json());

/*
app.get('/test1',(req,res) => {
    let result = controller.test('adrianomancinifalso@gmail.com');
    if (result === null) {res.send("La mail non esiste")}
    else {res.send("La mail compare nel database")}
});
*/

app.get('/test',(req,res) => {
    res.send("prova");
});

app.post('/crea-segnalazione',(req,res) => {
    const tipo = req.body.tipo;
    controller.creaSegnalazioni(tipo);
    res.send("success");
});

app.listen(8080);