const jwt = require('jsonwebtoken');
require('dotenv').config();
import * as errori from '../factory/factory'

/**
 * Funzione: checkHeader 
 * 
 * Funzione che controlla l'esistenza dell'header del token JWT.
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore 
 * @param next se non si verificano errori passa alla prossima funzione
 */
export function checkHeader(req, res, next){
    const authHeader = req.headers.authorization;
    if (authHeader) {
        next();
    }else{
        next(errori.ErrorEnum.noAuth)
    }
};

/**
 * Funzione: checkToken 
 * 
 * Funzione che controlla il bearer token non sia undefined.
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore 
 * @param next se non si verificano errori passa alla prossima funzione
 */
export function checkToken(req,res,next){
    const bearerHeader = req.headers.authorization;
    if(typeof bearerHeader!=='undefined'){
        const bearerToken = bearerHeader.split(' ')[1];
        req.token=bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
};

/**
 * Funzione: verifyAndAuthenticate
 * 
 * Funzione che verifica la corrisondenza tra la chiave del token 
 * e la chiave privata. 
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore 
 * @param next se non si verificano errori passa alla prossima funzione
 */
export function verifyAndAuthenticate(req,res,next){
    let decoded = jwt.verify(req.token, process.env.KEY);
    if(decoded !== null) {
      req.token = decoded;
      next();
    }
    else res.send("chiave sbagliata")
};

/**
 * creazione dei JWT per i test
 */
//let tok = jwt.sign({"latitudine":35.15,"longitudine":18.90,"tipologia":"buca","severita":"media","email":"mariorossi@virgilio.it"},process.env.KEY);
let tok = jwt.sign({"latitudine":35.15,"longitudine":18.90,"tipologia":"buca","severita":"media"},process.env.KEY);
//let tok = jwt.sign({"email":"ronchini.nicola@outlook.it","dataInizio":"2021-03-15 14:30:00","dataFine":"2023-03-15 14:30:00"},process.env.KEY);
//let tok = jwt.sign({"stato":"VALIDATED","id":[10,11,14],"email":"adrianomancini@gmail.com"},process.env.KEY);
//let tok = jwt.sign({"ordinamento":"ASC","email":"ronchini.nicola@outlook.it"},process.env.KEY);
//let tok = jwt.sign({"tipo":"avvallamento"},process.env.KEY);
//let tok = jwt.sign({"email":"ronchini.nicola@outlook.it","latitudine":40,"longitudine":12,"raggio":1000000,"dataInizio":"2021-03-15 14:30:00","dataFine":"2023-03-15 14:30:00","formato":"pdf"},process.env.KEY);
//let tok = jwt.sign({"email":"ronchini.nicola@outlook.it","raggio":1000,"formato":"pdf"},process.env.KEY);
//let tok = jwt.sign({"formato":"pdf","email":"ronchini.nicola@outlook.it"},process.env.KEY);
//let tok = jwt.sign({"idVal":[8,10,14],"idRej":[9,11],"email":"adrianomancini@gmail.com"},process.env.KEY)
//let tok = jwt.sign({"id":17,"email":"ronchini.nicola@outlook.it"},process.env.KEY)
//let tok = jwt.sign({"id":1,"email":"ronchini.nicola@outlook.it","tipologia":"avvallamento","timestamp":"2023-02-15 18:30:00"},process.env.KEY)
//let tok = jwt.sign({"utente":"mariorossi@virgilio.it","email":"adrianomancini@gmail.com"},process.env.KEY)
console.log(tok);

