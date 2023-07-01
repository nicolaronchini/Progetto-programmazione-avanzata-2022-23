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

const sequelize: Sequelize = SequelizeSingleton.getConnection();

export const segnalazioni = sequelize.define('segnalazione', {
  id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
  },
  timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
  },
  latitudine: {
      type: DataTypes.FLOAT,
      allowNull: false
  },
  longitudine: {
      type: DataTypes.FLOAT,
      allowNull: false
  },
  tipologia:{
    type:DataTypes.STRING,
    allowNull: false
  },
  severita: {
      type:DataTypes.STRING,
      allowNull: false
  },
  stato: {
    type:DataTypes.STRING,
    allowNull: false
  }, 
}, {
  modelName: 'segnalazione',
  timestamps: false,
  freezeTableName: true

});

export const utenti = sequelize.define('utenti', {
  email: {
    type:DataTypes.STRING,
    allowNull: false
  },
  nome: {
    type:DataTypes.STRING,
    allowNull: false
  }, 
  cognome: {
    type:DataTypes.STRING,
    allowNull: false
  }, 
  ruolo: {
    type:DataTypes.STRING,
    allowNull: false
  },  
  coins: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  token: {
    type:DataTypes.INTEGER,
    allowNull: false
  }, 
});

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


