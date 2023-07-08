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
        if (req.token.stato === "VALIDATED" || req.token.stato === "REJECTED" || req.token.stato === "PENDING") next()
            else res.send("Stato errato")
    }
    else next()
}

/**
 * Funzione: verificaEsistenzaSegn
 * 
 * Funzione che si occupa di vericare sia il campo "id" del token
 * che l'esistenza della segnalazione associata all'id.
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore se non è presente l'id nel JWT o la segnalazione non è esistente
 * @param next se non viene trovato nessun errore passa alla prossima funzione
 */
export async function verificaEsistenzaSegn(req:any,res:any,next:any) {
    if (req.token.id) {
        let esistenza: any = await segnalazioni.findOne({where: {id:req.token.id}})
        if (esistenza != null) next();
        else (res.send("Segnalazione non esistente"))
    }
    else res.send("ID non specificato");
}

/**
 * Funzione: checkIdValAdmin
 * 
 * Funzione che si occupa di vericare sia il campo "idVal" che il campo "idRej" del token
 * e verifica l'esistenza delle segnalazioni.
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore se non è presente l'idVal e l'idRej nel JWT o la segnalazione non è esistente
 * @param next se non viene trovato nessun errore passa alla prossima funzione
 */
export async function checkIdValAdmin(req:any,res:any,next:any) {
    let flag: Boolean = false;
    if (req.token.idVal || req.token.idRej) {
        if (req.token.idVal) {
            for (let id of req.token.idVal) {
                let esistenza: any = await segnalazioni.findOne({where: {id:id}})
                if (esistenza === null) flag = true;
            }
        }
        if (req.token.idRej) {
            for (let id of req.token.idRej) {
                let esistenza: any = await segnalazioni.findOne({where: {id:id}})
                if (esistenza === null) flag = true;
            }
        }
        if (!flag) next();
        else res.send("Segnalazioni non esistenti");
    }
    else res.send("Segnalazioni non inserite");
};

/**
 * Funzione: checkData
 * 
 * Funzione che verifica la presenza del campo "timestamp" della segnalazione e il relativo formato 
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore se non il formato della data è errato
 * @param next se non viene trovato nessun errore passa alla prossima funzione 
 */
export function checkData(req:any,res:any,next:any) {
    if (req.token.time) {
        const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        if (regex.test(req.token.time)) next();
            else res.send("Formato della data non riconosciuto")
    } else next()
};

/**
 * Funzione: checkOrdineDate
 * 
 * Funzione che verifica la presenza contemporanea della data d'inizio e di fine, 
 * il relativo formato e assicurandosi che la data d'inizio sia antecedente a quella di fine
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore se una delle ipotesi sopra descritte non sono verificate
 * @param next se non viene trovato nessun errore passa alla prossima funzione 
 */
export function checkOrdineDate(req:any,res:any,next:any) {
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    if (req.token.dataInizio && req.token.dataFine) {
        if (regex.test(req.token.dataInizio) && regex.test(req.token.dataFine)) {
            const dataInizio = new Date(req.token.dataInizio);
            const dataFine = new Date(req.token.dataFine);
            if (dataInizio<dataFine) next()
            else res.send("La data di inizio deve essere precedente alla data di fine")
        } else res.send("Formato sbagliato")
    }
    else res.send("Date mancanti")
};

/**
 * Funzione: CheckFormato
 * 
 * Funzione che verifica che il formato di file da restuire passato dall'utente sia corretto
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore se il formato non corrisponde
 * @param next se non viene trovato nessun errore passa alla prossima funzione
 */
export function checkFormato(req:any,res:any,next:any){
    if (req.token.formato) {
        if (req.token.formato === "JSON" || req.token.formato === "pdf" || req.token.formato === "csv") next()
            else res.send("Formato errato")
    }
    else res.send("Formato non specificato")
}

//check tipologia severita lat long raggio
//check mail o admin
// sia che sia vuoto o no

export const Verifica = [
    verificaEsistenza,
    verificaNumToken
];


//funzione refill token