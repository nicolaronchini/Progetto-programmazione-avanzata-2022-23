var express = require('express');
import * as controller from './controller'

const app = express();

app.get('/test1',(req,res) => {
    let result = controller.test('adrianomancinifalso@gmail.com');
    if (result === null) {res.send("La mail non esiste")}
    else {res.send("La mail compare nel database")}
});

app.listen(8080);