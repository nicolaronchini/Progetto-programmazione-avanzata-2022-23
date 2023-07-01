import { segnalazioni, utenti } from './Singleton/sequelize';

/*
export async function test(email: string): Promise<boolean> {
    let user: any; 
    user = await utenti.findByPk(email,{raw:true});
    //console.log(user.nome)
    return user;
}
*/

export async function test(email: string): Promise<Boolean>{
    let user: any; 
    user = await utenti.findByPk(email,{raw:true});
    //console.log(user.nome)
    if (user === null) {console.log("not found");return false}
    else {console.log("found");return true};
}

//console.log(test('adrianomancinifalso@gmail.com'));

console.log(Boolean(test('adrianomancinifalso@gmail.com')));
