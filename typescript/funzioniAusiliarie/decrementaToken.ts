import { utenti } from '../Modello/model';
import { Sequelize } from 'sequelize';

/**
 * Funzione: decrementa
 * 
 * Funzione che decrementa il numero di token in seguito ad una richiesta.
 * 
 * @param email email dell'utente che effettua la richiesta
 */
export function decrementa(email:string) {
    utenti.increment({token:-1},{where:{email:email}});
}