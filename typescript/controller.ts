import { segnalazioni, utenti } from './Modello/model';
import { Op,Sequelize } from 'sequelize';

/**
 * Funzione: creaSegnalazioni
 * 
 * Funzione adibita alla creazione di nuove segnalazioni, 
 * i parametri della singola segnalazione vengono passati
 * tramite token JWT.
 * 
 * @param req body del token JWT utilizzato per l'autenticazione
 */
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

/**
 * Funzione: cancSegnalazioni
 * 
 * Funzione adibita alla cancellazione delle proprie segnalazioni.
 * 
 * @param req body del token JWT utilizzato per l'autenticazione
 */
export function cancSegnalazioni(req:any): void{
    segnalazioni.destroy({where: { id: req.token.id}});
}

/**
 * Funzione: modSegnalazioni
 * 
 * Funzione adibita alla modifica delle proprie segnalazioni.
 * 
 * @param req body del token JWT utilizzato per l'autenticazione
 */
export function modSegnalazioni(req:any): void{
    segnalazioni.update(req.token, {where : {id: req.token.id}});
}

/**
 * Funzione: filtro
 * 
 * Funzione per dare la possibilità all'utente di filtrare e visualizzare le
 * proprie segnalazioni per stato e per intervallo temporale.
 * 
 * @param req body del token JWT utilizzato per l'autenticazione
 * @param res return delle segnalazioni filtrate
 */
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

/**
 * Funzione: agg_stato
 * 
 * Funzione riservata dell'admin che si occuppa della validazione delle segnalazioni con conseguente
 * aumento dei coins se validata.
 * 
 * @param req body del token JWT utilizzato per l'autenticazione
*/
export async function agg_stato(req:any) {  //da mettere i middleware per admin e stato
    segnalazioni.update({stato:req.token.stato}, {where: {id: req.token.id, stato:"PENDING"}});
    if(req.token.stato == "VALIDATED"){
        let segn : any = await segnalazioni.findAll({where: {id: req.token.id}});
        for (var val of segn) {
            let utente : any = await utenti.findAll({where: {email: val.email}});
            if(utente[0].dataValues.richiesteVal > 10) {
                utenti.increment({ coins : 0.15, richiesteVal: 1}, {where : {email: utente[0].dataValues.email}})
            }
            else {utenti.increment({ coins : 0.1, richiesteVal: 1}, {where : {email: utente[0].dataValues.email}})}
        }
    }
};

export async function test(email: string): Promise<Boolean>{
    let user: any; 
    user = await utenti.findByPk(email,{raw:true});
    //console.log(user.nome)
    if (user === null) {console.log("not found"); return false}
    else {console.log("found"); return true};
}
