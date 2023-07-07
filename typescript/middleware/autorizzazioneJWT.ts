const jwt = require('jsonwebtoken');
require('dotenv').config();

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
        let err = new Error("ahi ahi no auth header");
        next(err);
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
    if(decoded !== null)
      req.token = decoded;
      next();
};

export const JWT = [
    checkHeader, 
    checkToken, 
    verifyAndAuthenticate
];

/**
 * creazione dei JWT per i test
 */
//let tok = jwt.sign({"latitudine":36.15,"longitudine":12.46,"tipologia":"buca","severita":"media","email":"mariorossi@virgilio.it"},process.env.KEY);
//let tok = jwt.sign({"email":"ronchini.nicola@outlook.it","dataInizio":"2021-03-15 14:30:00","dataFine":"2023-03-15 14:30:00"},process.env.KEY);
//let tok = jwt.sign({"stato":"VALIDATED","id":[10,11,14],"email":"adrianomancini@gmail.com"},process.env.KEY);
//let tok = jwt.sign({"ordinamento":"ASC"},process.env.KEY);
//let tok = jwt.sign({"tipo":"avvallamento"},process.env.KEY);
//let tok = jwt.sign({"latitudine":40,"longitudine":12,"raggio":1000000,"dataInizio":"2021-03-15 14:30:00","dataFine":"2023-03-15 14:30:00","formato":"pdf"},process.env.KEY);
//let tok = jwt.sign({"raggio":1000,"formato":"pdf"},process.env.KEY);
let tok = jwt.sign({"formato":"csv"},process.env.KEY);
console.log(tok);

