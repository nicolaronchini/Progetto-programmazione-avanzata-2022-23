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
  datetimes: {
      type: DataTypes.JSON,
      allowNull: false,
  },
  latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
  },
  longitude: {
      type: DataTypes.FLOAT,
      allowNull: false
  }
}, {
  modelName: 'segnalazione',
  timestamps: false,
  freezeTableName: true

});

export async function test() {
  const segn = await segnalazioni.findAll();
  console.log(segn.every((segn: any) => segn instanceof segnalazioni));
  console.log("All users:", JSON.stringify(segn, null, 4));
  }

try {

console.log(segnalazioni === sequelize.models.segnalazione);

test();

} catch (error) {console.log("prova")}
