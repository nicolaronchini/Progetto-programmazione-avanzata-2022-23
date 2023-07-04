import { segnalazioni, utenti } from './Modello/model';
import { Op,Sequelize } from 'sequelize';

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

export function cancSegnalazioni(req:any): void{
    segnalazioni.destroy({where: { id: req.token.id}});
}

export function modSegnalazioni(req:any): void{
    segnalazioni.update(req.token, {where : {id: req.token.id}});
}

export async function filtro(req:any,res:any) {
    let segnFiltrate:any;
    if (req.token.stato && (!req.token.dataInizio)) {
        segnFiltrate = await segnalazioni.findAll({where: {stato: req.token.stato, email: req.token.email}});
        res.send(segnFiltrate);
    } else if (req.token.dataInizio && (!req.token.stato)) {
        segnFiltrate = await segnalazioni.findAll({where: {email: req.token.email, 
                                                    timestamp: {[Op.between]:[req.token.dataInizio,req.token.dataFine]}}});
        res.send(segnFiltrate);
    }else if (req.token.dataInizio && req.token.stato) {
        segnFiltrate = await segnalazioni.findAll({where: {stato: req.token.stato, email: req.token.email,
                                                    timestamp: {[Op.between]:[req.token.dataInizio,req.token.dataFine]}}});
        res.send(segnFiltrate);
    }
    else {
        segnFiltrate = await segnalazioni.findAll({where: {email: req.token.email}});
        res.send(segnFiltrate);
    }
};

export function agg_stato(req:any) {
    segnalazioni.update({stato:req.token.stato}, {where: {id: req.token.id, stato:"PENDING"}});
};

export async function test(email: string): Promise<Boolean>{
    let user: any; 
    user = await utenti.findByPk(email,{raw:true});
    //console.log(user.nome)
    if (user === null) {console.log("not found"); return false}
    else {console.log("found"); return true};
}
