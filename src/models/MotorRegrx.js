const Sequelize  = require("sequelize");
const sequelize = require('../database/db');
const Vehiculo = require("./Vehiculo");
const moment  = require("moment");

const MotorRegrx = sequelize.define('RegRx',{
    
    CodMRegRx:{ 
        type: Sequelize.INTEGER,
        primaryKey:true,
    },
    Vehiculo_VIN:{ 
        type: Sequelize.STRING,
        allowNull: false,
        foreignKey: true
    },
    Generico_CodGenerico:{ 
        type: Sequelize.INTEGER,
    },
    Fecha_Hora: {
        type: Sequelize.DATE,
        get: function() {

            return moment.utc(this.getDataValue('Fecha_Hora')).format("YYYY-MM-DD HH:mm:ss")
          }
    },
    Lat: {
        type: Sequelize.INTEGER,
    },
    Lon: {
        type: Sequelize.INTEGER,
    },
    Estado:{
        type: Sequelize.INTEGER,

    },
    Generico1 : {
        type: Sequelize.FLOAT,
        

        },
        Generico2 : {
        type: Sequelize.FLOAT,

        },
        Generico3 : {
        type: Sequelize.FLOAT,

        },
        Generico4 : {
        type: Sequelize.FLOAT,

        },
        Generico5 : {
        type: Sequelize.FLOAT,

        },
        Generico6 : {
        type: Sequelize.FLOAT,

        },
        Generico7 : {
        type: Sequelize.FLOAT,

        },
        Generico8 : {
        type: Sequelize.FLOAT,

        },
        Generico9 : {
        type: Sequelize.FLOAT,

        },
        Generico10 : {
        type: Sequelize.FLOAT,

        },
        Generico11 : {
        type: Sequelize.FLOAT,

        },
        Generico12 : {
        type: Sequelize.FLOAT,

        },
        Generico13 : {
        type: Sequelize.FLOAT,

        },
        Generico14 : {
        type: Sequelize.FLOAT,

        },
        Generico15 : {
        type: Sequelize.FLOAT,

        },
        Generico16 : {
        type: Sequelize.FLOAT,

        },
        Generico17 : {
        type: Sequelize.FLOAT,

        },
        Generico18 : {
        type: Sequelize.FLOAT,

        },
        Generico19 : {
        type: Sequelize.FLOAT,

        },
        Generico20 : {
        type: Sequelize.FLOAT,

        },
        Generico21 : {
        type: Sequelize.FLOAT,

        },
        Generico22 : {
        type: Sequelize.FLOAT,

        },
        Generico23 : {
        type: Sequelize.FLOAT,

        },
        Generico24 : {
        type: Sequelize.FLOAT,

        },
        Generico25 : {
        type: Sequelize.FLOAT,

        },
        Generico26 : {
        type: Sequelize.FLOAT,

        },
        Generico27 : {
        type: Sequelize.FLOAT,

        },
        Generico28 : {
        type: Sequelize.FLOAT,

        },
        Generico29 : {
        type: Sequelize.FLOAT,

        },
        Generico30 : {
        type: Sequelize.FLOAT,

        },
        Generico31 : {
        type: Sequelize.FLOAT,

        },
        Generico32 : {
        type: Sequelize.FLOAT,

        },
      
},{
    
     sequelize,
    tableName: 'motorRegRx',
    timestamps: false,

});

 //Vehiculo.hasMany(Regrx);
MotorRegrx.belongsTo(Vehiculo, {foreignKey: 'Vehiculo_VIN', targetKey: 'VIN'});
//Vehiculo.hasMany(Regrx,{foreignKey: 'VIN'});

MotorRegrx.sync();

module.exports = MotorRegrx;
