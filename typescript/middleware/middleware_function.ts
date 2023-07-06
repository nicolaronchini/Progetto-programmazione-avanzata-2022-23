import { segnalazioni, utenti } from '../Modello/model';
import { Sequelize } from 'sequelize';

/**
 * Funzione: verificaEsistenza
 *
 * Middleware che si occupa della verifica dell'esistenza di un utente
 * nel database. 
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore
 * @param next se non viene trovato nessun errore passa alla prossima funzione
 */
export async function verificaEsistenza(req:any,res:any,next: any) {
    let esistenza: any = await utenti.findOne({where: {email:req.token.email}})
    if (esistenza != null) next();
    else res.send("Utente non esistente");
}

/**
 * Funzione: verificaNumToken
 *
 * Middleware che si occupa della verifica del numero
 * di token di un utente. 
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore
 * @param next se l'utente ha abbastanza token passa alla prossima funzione
 */
export async function verificaNumToken(req:any,res:any,next: any) {
    let utente: any = await utenti.findAll({where: {email:req.token.email}})
    if (utente[0].dataValues.token >= 1) next();
    else res.send("Non hai abbastanza token");
}

/**
 * Funzione: verificaAdmin
 *
 * Middleware che si occupa della verifica dell'admin
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore se non si è admin
 * @param next se la chiamata è effettutata dall'admin passa alla prossima funzione
 */
export async function verificaAdmin(req:any,res:any,next: any) {
    let utente: any = await utenti.findAll({where: {email:req.token.email}})
    if (utente[0].dataValues.ruolo === "admin") next();
    else res.send("Non hai i permessi");
};

//check mail

export const Verifica = [
    verificaEsistenza,
    verificaNumToken
];
