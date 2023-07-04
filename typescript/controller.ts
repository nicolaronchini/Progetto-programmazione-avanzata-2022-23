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
}

export function cancSegnalazioni(segn:number): void{
    segnalazioni.destroy({where: { id: segn}, force:true});
}

export function modSegnalazioni(req:any): void{
    segnalazioni.update(req.token, {where : {id: req.token.id}});
}

export async function test(email: string): Promise<Boolean>{
    let user: any; 
    user = await utenti.findByPk(email,{raw:true});
    //console.log(user.nome)
    if (user === null) {console.log("not found"); return false}
    else {console.log("found"); return true};
}


