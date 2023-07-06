import { Json } from 'sequelize/types/utils';
import { segnalazioni, utenti } from './Modello/model';
import {stats} from './funzioniAusiliarie/funzioneStat';
import {creazione} from './funzioniAusiliarie/creaSegn';
import {formulaDistanza} from './funzioniAusiliarie/formulaHaversine';
import { decrementa } from './funzioniAusiliarie/decrementaToken';
import { Op,Sequelize } from 'sequelize';

var fs = require('fs');

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
    creazione(req);
    decrementa(req.token.email);
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
export async function filtro(req:any,res:any) { //middleware data inzio e data di fine
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
        for (let val of segn) {
            let utente : any = await utenti.findAll({where: {email: val.email}});
            if(utente[0].dataValues.richiesteVal > 10) {
                utenti.increment({ coins : 0.15, richiesteVal: 1}, {where : {email: utente[0].dataValues.email}})
            }
            else {utenti.increment({ coins : 0.1, richiesteVal: 1}, {where : {email: utente[0].dataValues.email}})}
        }
    }
};

/**
 * Funzione: graduatoria
 * 
 * Funziona che si occupa di ordinare la graduatoria degli utenti
 * nel modo specificato nel token JWT.
 * 
 * @param req body del token JWT utilizzato per l'autenticazione
 * @param res return della graduatoria ordinata
 */
export async function graduatoria(req:any,res:any) { //middleware tipo ordinamento
    let grad_ordinata: any;
    grad_ordinata = await utenti.findAll({
        attributes: {exclude: ['email','ruolo','richiesteVal','token']},
        order: [['coins',req.token.ordinamento]],
        where: {ruolo: 'utente'}
    });
    res.send(grad_ordinata);
};

/**
 * Funzione: statistiche
 * 
 * Funzione adibita al calcolo delle statistiche per tutte le possibili
 * combinazioni delle segnalazioni con conseguente scrittura in un file 
 * esterno formattato in JSON.
 */
export async function statistiche() {
    let Jobj: any[] = []
    let tipi: String[] = ["buca","avvallamento"];
    let severita: String[] = ["bassa","media","alta"];
    let stati: String[] = ["PENDING","VALIDATED","REJECTED"];
    let num: any;
    for (let tipo of tipi) {
        for (let sev of severita) {
            for (let stato of stati) {
                num = await stats(tipo,sev,stato);
                if (num > 0) {
                Jobj.push({ "segnalazione" : {
                                                "tipologia" : tipo, 
                                                "severità": sev, 
                                                "stato": stato
                                            },
                            "occorrenze": num
                           })
                }
            }
        }
    }

    let json = JSON.stringify(Jobj,null,2)
    fs.writeFileSync('statistiche.json', json, 'utf8')
};  

export async function ricerca(req:any) {
    let Jobj: any[] = [];
    let segn: any;
    if (req.token.dataInizio) {
        segn = await segnalazioni.findAll({where: {stato:"VALIDATED",
                                                   timestamp: {[Op.between]:[req.token.dataInizio,req.token.dataFine]}}});
    } else {
        segn = await segnalazioni.findAll({where: {stato:"VALIDATED"}});
    }
    for (let val of segn) {
        let dist = formulaDistanza(req.token.latitudine,req.token.longitudine,val.latitudine,val.longitudine);
        if (dist < req.token.raggio/1000) {
            Jobj.push({ "segnalazione" : {
                "tipologia" : val.tipologia, 
                "severità": val.severita, 
                "distanza": dist
                }
            })
        }
    }
    let json = JSON.stringify(Jobj,null,2)
    fs.writeFileSync('filtroPerDistanza.json', json, 'utf8')
};