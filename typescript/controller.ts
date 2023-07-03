import { segnalazioni, utenti } from './Modello/model';
import { Sequelize } from 'sequelize';

export function creaSegnalazioni(tipo: string): void{

    segnalazioni.create({
        id: 4,
        timestamp: '2022-05-15 17:30',
        latitudine: 78.12,
        longitudine: 20.40,
        tipologia: tipo,
        severita: "alta",
        email: "filippo_bernabucci@gmail.com",
        stato: "PENDING"});

    /*
    segnalazioni.create({
        timestamp: '2021-02-15 14:30',
        latitudine: 68.42,
        longitudine: 40.46,
        tipologia: "buca",
        severita: "media",
        email: "ronchini.nicola@outlook.it",
        stato: "PENDING"});
    */
}

export async function test(email: string): Promise<Boolean>{
    let user: any; 
    user = await utenti.findByPk(email,{raw:true});
    //console.log(user.nome)
    if (user === null) {console.log("not found"); return false}
    else {console.log("found"); return true};
}

creaSegnalazioni("ciao");


