import { segnalazioni, utenti } from './Modello/model';
import { Sequelize } from 'sequelize';

export function creaSegnalazioni(): void{
    segnalazioni.create({

    });
    //da decrementare i token in base al propretatio della segnalazione
}










export async function test(email: string): Promise<Boolean>{
    let user: any; 
    let flag: Boolean;
    flag = false;
    user = await utenti.findByPk(email,{raw:true});
    //console.log(user.nome)
    if (user === null) {console.log("not found"); console.log(flag);return flag}
    else {console.log("found"); flag = true; console.log(flag); return true};
}


console.log(Boolean(test('adrianomancinifalso@gmail.com')));
