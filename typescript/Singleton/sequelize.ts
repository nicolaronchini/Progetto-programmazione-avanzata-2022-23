import { DataTypes } from "sequelize";
import { Sequelize } from 'sequelize';
require('dotenv').config()

/**
 * Classe che definisce la struttura dell'istanza di connessione al db
 * attraverso sequelize
 */
export class SequelizeSingleton {
	
  private static instance: SequelizeSingleton;
  private connection: Sequelize;

  private constructor() {
  this.connection = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    dialect: 'mysql'
  });
}

/**
 * Funzione: connessione()
 * 
 * Funzione che verifica la presenza di un'istanza di connessione al database
 * già creata o da creare
 * 
 * @returns istanza di connessione al db
 */
public static connessione(): Sequelize {
      if (!SequelizeSingleton.instance) {
          this.instance = new SequelizeSingleton();
          this.instance.connection.authenticate();
      }
      return SequelizeSingleton.instance.connection;
  }
}




