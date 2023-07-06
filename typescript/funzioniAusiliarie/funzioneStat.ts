import { segnalazioni, utenti } from '../Modello/model';
import { Sequelize } from 'sequelize';

/**
 * Funzione: stats
 * 
 * Funzione adibita al calcolo delle occorrenze in base a
 * dei parametri specificati in ingresso.
 * 
 * @param tipo stringa che identifica il tipo di problema (buca,avvallamento)
 * @param severita stringa che identifica la severità del problema (bassa,media,alta)
 * @param stato stringa che identifica lo stato della segnalazione (PENDING,VALIDATED,REJECTED)
 * @returns numero di occorenze per i parametri specificati 
 */
export async function stats(tipo:String,severita:String,stato:String) {
    let num = await segnalazioni.count({where: {tipologia: tipo,severita: severita,stato:stato}});
    return num
};