import { segnalazioni, utenti } from './Modello/model';
import { FloatDataType, Sequelize } from 'sequelize';

export function creaSegnalazioni(req:any): void{

    segnalazioni.create({
        timestamp: req.token.time,
        latitudine: req.token.latitudine,
        longitudine: req.token.longitudine,
        tipologia: req.token.tipologia,
        severita: req.token.severita,
        email: req.token.email,
        stato: "PENDING"});

    /*
    segnalazioni.create({
        timestamp: '2021-02-15 14:30',
        latitudine: 68.42,
        longitudine: 40.46,
        tipologia: "buca",
        severita: "media",
        email: "ronchini.nicola@outlook.it",
        stato: "PENDING"});
    */
}

export async function test(email: string): Promise<Boolean>{
    let user: any; 
    user = await utenti.findByPk(email,{raw:true});
    //console.log(user.nome)
    if (user === null) {console.log("not found"); return false}
    else {console.log("found"); return true};
}


