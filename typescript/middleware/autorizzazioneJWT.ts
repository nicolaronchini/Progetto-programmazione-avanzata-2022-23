const jwt = require('jsonwebtoken');
require('dotenv').config();

/*
var requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
  };
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


//let tok = jwt.sign({"time":"2021-02-15 16:35","latitudine":48.42,"longitudine":70.46,"tipologia":"buca","severita":"alta","email":"filippo_bernabucci@outlook.it"},process.env.KEY);
//let tok = jwt.sign({"email":"ronchini.nicola@outlook.it","dataInizio":"2021-03-15 14:30:00","dataFine":"2023-03-15 14:30:00"},process.env.KEY);
let tok = jwt.sign({"stato":"VALIDATED","id":[1,6]},process.env.KEY);
console.log(tok);

