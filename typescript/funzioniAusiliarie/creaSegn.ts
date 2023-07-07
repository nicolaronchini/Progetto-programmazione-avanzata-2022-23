import { segnalazioni, utenti } from '../Modello/model';
import { Sequelize } from 'sequelize';

/**
 * Funzione: creazione
 * 
 * Funzione adibita alla creazione delle segnalazioni.
 * Nel caso non venga specificata la data, viene utilizzata 
 * per la segnalazione la data della richiesta del token JWT.
 * 
 *  @param req body del token JWT utilizzato per l'autenticazione
 */
export function creazione(req:any) {
    let date: any;
    if (req.token.time) {date = req.token.time}
    else {
        let iat = new Date((req.token.iat + 240 * 60) * 1000);
        date = iat.toISOString().replace('T', ' ').slice(0, 19);
    }
    segnalazioni.create({
        timestamp: date,
        latitudine: req.token.latitudine,
        longitudine: req.token.longitudine,
        tipologia: req.token.tipologia,
        severita: req.token.severita,
        email: req.token.email,
        stato: "PENDING"});
    
};