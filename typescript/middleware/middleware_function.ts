import { segnalazioni, utenti } from '../Modello/model';
import { Sequelize } from 'sequelize';

/**
 * Funzione: verificaEsistenza
 *
 * Funzione che si occupa di verificare la presenza del campo email nel token
 * e la relativa esistenza dell'utente nel database. 
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore
 * @param next se non viene trovato nessun errore passa alla prossima funzione
 */
export async function verificaEsistenza(req:any,res:any,next: any) {
    if (req.token.email) {
        let esistenza: any = await utenti.findOne({where: {email:req.token.email}})
        if (esistenza != null) next();
        else res.send("Utente non esistente");
    } else res.send("Mail non specificata")
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
    if (req.token.timestamp) {
        const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        if (regex.test(req.token.timestamp)) next();
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

/**
 * Funzione: CheckTipologia
 * 
 * Funzione che verifica la presenza del campo tipologia ed il contenuto.
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore se la tipologia è sbagliata o non specificata
 * @param next se non viene trovato nessun errore passa alla prossima funzione
 */
export function checkTipologia(req:any,res:any,next:any){
    if (req.token.tipologia) {
        if (req.token.tipologia === "buca" || req.token.tipologia === "avvallamento") next()
            else res.send("Tipologia non esistente")
    }
    else res.send("Tipologia non specificata")
}

/**
 * Funzione: CheckSeverita
 * 
 * Funzione che verifica la presenza del campo severità ed il contenuto.
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore se la severità è sbagliata o non specificata
 * @param next se non viene trovato nessun errore passa alla prossima funzione
 */
export function checkSeverita(req:any,res:any,next:any){
    if (req.token.severita) {
        if (req.token.severita === "bassa" || req.token.severita === "media" || req.token.severita === "alta") next()
            else res.send("Severità non esistente")
    }
    else res.send("Severità non specificata")
}

/**
 * Funzione: CheckLatitudine
 * 
 * Funzione che verifica la presenza del campo latitudine e la sua correttezza.
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore se la latitudine è sbagliata o non specificata
 * @param next se non viene trovato nessun errore passa alla prossima funzione
 */
export function checkLatitudine(req:any,res:any,next:any){
    if (req.token.latitudine) {
        if (req.token.latitudine <= 90 || req.token.latitudine >= -90) next()
            else res.send("Latitudine non valida")
    }
    else res.send("Latitudine non specificata")
}

/**
 * Funzione: CheckLongitudine
 * 
 * Funzione che verifica la presenza del campo longitudine e la sua correttezza.
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore se la longitudine è sbagliata o non specificata
 * @param next se non viene trovato nessun errore passa alla prossima funzione
 */
export function checkLongitudine(req:any,res:any,next:any){
    if (req.token.longitudine) {
        if (req.token.longitudine <= 180 || req.token.longitudine >= -180) next()
            else res.send("Longitudine non valida")
    }
    else res.send("Longitudine non specificata")
};

/**
 * Funzione: campiNonAcc
 * 
 * Funzione che si occupa di verificare che l'utente non cambi 
 * campi non accessibili.
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore se l'utente cerca di modificare campi proibiti
 * @param next se non viene trovato nessun errore passa alla prossima funzione
 */
export async function campiNonAcc(req:any,res:any,next:any) {
    let istanza : any = await segnalazioni.findOne({where: {id:req.token.id}})
    if (req.token.email != istanza.email || req.token.stato) res.send("Non hai i permessi per modificare questi campi")
        else next();
};

/**
 * Funzione: ModTipologia
 * 
 * Funzione che verifica la presenza del campo tipologia ed il contenuto.
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore se la tipologia è sbagliata
 * @param next se non viene trovato nessun errore passa alla prossima funzione
 */
export function ModTipologia(req:any,res:any,next:any){
    if (req.token.tipologia) {
        if (req.token.tipologia === "buca" || req.token.tipologia === "avvallamento") next()
            else res.send("Tipologia non esistente")
    }
    else next()
}

/**
 * Funzione: ModSeverita
 * 
 * Funzione che verifica il contenuto del campo severità.
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore se la severità è sbagliata 
 * @param next se non viene trovato nessun errore passa alla prossima funzione
 */
export function ModSeverita(req:any,res:any,next:any){
    if (req.token.severita) {
        if (req.token.severita === "bassa" || req.token.severita === "media" || req.token.severita === "alta") next()
            else res.send("Severità non esistente")
    }
    else next()
}

/**
 * Funzione: ModLatitudine
 * 
 * Funzione che verifica il contenuto del campo latitudine.
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore se la latitudine è sbagliata 
 * @param next se non viene trovato nessun errore passa alla prossima funzione
 */
export function ModLatitudine(req:any,res:any,next:any){
    if (req.token.latitudine) {
        if (req.token.latitudine <= 90 || req.token.latitudine >= -90) next()
            else res.send("Latitudine non valida")
    }
    else next()
}

/**
 * Funzione: ModLongitudine
 * 
 * Funzione che verifica la presenza del campo longitudine e la sua correttezza.
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore se la longitudine è sbagliata
 * @param next se non viene trovato nessun errore passa alla prossima funzione
 */
export function ModLongitudine(req:any,res:any,next:any){
    if (req.token.longitudine) {
        if (req.token.longitudine <= 180 || req.token.longitudine >= -180) next()
            else res.send("Longitudine non valida")
    }
    else next()
}

/**
 * Funzione: checkRaggio
 * 
 * Funzione che verifica la presenza del campo raggio e la sua correttezza.
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'eventuale errore se il raggio non è presente o minore di zero
 * @param next se non viene trovato nessun errore passa alla prossima funzione
 */
export function checkRaggio(req:any,res:any,next:any){
    if (req.token.raggio) {
        if (req.token.raggio > 0) next()
            else res.send("Raggio non valido")
    }
    else res.send("Raggio non presente")
}

/**
 * Funzione: checkEmailCanc
 * 
 * Funzione che si occupa della verifica della mail per la cancellazione delle segnalazioni
 * 
 * @param req token JWT preso in ingresso
 * @param res restituzione dell'errore in caso che non si abbiano i permessi per la cancellazione
 * @param next se non viene trovato nessun errore passa alla prossima funzione
 */
export async function checkEmailCanc(req:any,res:any,next:any) {
    let istanza : any = await segnalazioni.findOne({where: {id:req.token.id}})
    let utente: any = await utenti.findAll({where: {email:req.token.email}})
    if (req.token.email === istanza.email || utente[0].dataValues.ruolo === "admin") next()
        else res.send("Non hai i permessi per cancellare questa segnalazione");
};

