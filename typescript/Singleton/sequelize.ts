import { DataTypes } from "sequelize";
import { Sequelize } from 'sequelize';
require('dotenv').config()

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

public static getConnection(): Sequelize {
      if (!SequelizeSingleton.instance) {
          this.instance = new SequelizeSingleton();
          this.instance.connection.authenticate();
      }
      return SequelizeSingleton.instance.connection;
  }
}



//test
/*
  export async function testsegn() {
  const segn = await segnalazioni.findAll();
  console.log(segn.every((segn: any) => segn instanceof segnalazioni));
  console.log("All users:", JSON.stringify(segn, null, 4));
  }

export async function testutenti() {
    const usr = await utenti.findAll();
    console.log(usr.every((segn: any) => segn instanceof segnalazioni));
    console.log("All users:", JSON.stringify(usr, null, 4));
    }

testsegn();
testutenti();
*/

