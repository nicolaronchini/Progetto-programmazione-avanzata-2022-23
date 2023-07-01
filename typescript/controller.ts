import { segnalazioni, utenti } from './Singleton/sequelize';
import { Sequelize } from 'sequelize';

export async function test(email: string): Promise<boolean> {
    let user
    user= await utenti.findByPk(email)
    return user
}
    
test('adrianomancini@gmail.com');
