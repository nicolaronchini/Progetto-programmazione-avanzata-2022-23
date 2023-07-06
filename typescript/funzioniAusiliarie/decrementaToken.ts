import { utenti } from '../Modello/model';
import { Sequelize } from 'sequelize';

export function decrementa(email:string) {
    utenti.increment({token:-1},{where:{email:email}});
}