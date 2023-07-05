import { DataTypes, Sequelize } from "sequelize";
import { SequelizeSingleton } from "../Singleton/sequelize";

const sequelize: Sequelize = SequelizeSingleton.getConnection();

export const segnalazioni = sequelize.define('segnalazione', {
  id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      autoIncrement: true,
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
  email: {
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
    allowNull: false,
    primaryKey: true
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
  richiesteVal: {
    type:DataTypes.INTEGER,
    allowNull: false
  },
  token: {
    type:DataTypes.INTEGER,
    allowNull: false
  },
 }, {
  modelName: "utenti",
  timestamps: false,
  freezeTableName: true
});