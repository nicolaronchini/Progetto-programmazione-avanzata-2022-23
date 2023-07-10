const jwt = require('jsonwebtoken');
require('dotenv').config();
import * as errori from '../factory/factoryError'

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

