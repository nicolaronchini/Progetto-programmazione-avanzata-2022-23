import { segnalazioni, utenti } from './Singleton/sequelize';

export async function test(email: string): Promise<boolean> {
    let user: any; 
    user = await utenti.findByPk(email);
    return user;
}
    
if (test('adrianomancini@gmail.com')) {console.log("Trovato")};
