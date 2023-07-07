import { segnalazioni, utenti } from '../Modello/model';
import { Sequelize } from 'sequelize';

/**
 * Funzione: verificaEsistenza
 *
 * Funzione che si occupa della verifica dell'esistenza di un utente
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
 * Funzione che si occupa della verifica del numero
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
 * Funzione che si occupa della verifica dell'admin
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

/**
 * Funzione: checkMail
 * 
 * Funzione che si occupa di verificare la presenza del campo "mail"
 * nel token JWT.
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore se non è presente la mail nel JWT
 * @param next se non viene trovato nessun errore passa alla prossima funzione
 */
export function checkMail(req:any,res:any,next:any) {
    if (req.token.email) next()
    else res.send("Non è stata inserita la mail")
};

/**
 * Funzione: checkOrdinamento
 * 
 * Funzione adibita al check della presenza del campo "ordinamento" nel JWT e successivo controllo
 * del suo contenuto.
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore se non è presente l'ordinamento nel JWT o è scritto in modo errato
 * @param next se non viene trovato nessun errore passa alla prossima funzione
 */
export function checkOrdinamento(req:any,res:any,next:any) {
    if (req.token.ordinamento) {
        if (req.token.ordinamento === "ASC" || req.token.ordinamento === "DESC") next()
    }
    else res.send("Ordinamento sbagliato o mancante")
};

/**
 * Funzione: checkStato
 * 
 * Funzione adibita al check della presenza del campo "stato" nel JWT e successivo controllo
 * del suo contenuto.
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore se non è presente lo stato nel JWT o è scritto in modo errato
 * @param next se non viene trovato nessun errore passa alla prossima funzione
 */
export function checkStato(req:any,res:any,next:any) {
    if (req.token.stato) {
        if (req.token.stato === "VALIDATED" || req.token.stato === "REJECTED") next()
    }
    else res.send("Stato errato o mancante")
}

export const Verifica = [
    verificaEsistenza,
    verificaNumToken
];


//funzione refill token