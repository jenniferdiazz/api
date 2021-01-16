const Sequelize  = require("sequelize");
const sequelize = require('../database/db');
const Vehiculo = require("./Vehiculo");

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
    },
    Lat: {
        type: Sequelize.INTEGER,
    },
    Lon: {
        type: Sequelize.INTEGER,
    },
   

},{
     sequelize,
    tableName: 'motorRegRx',
    timestamps: false
});

 //Vehiculo.hasMany(Regrx);
MotorRegrx.belongsTo(Vehiculo, {foreignKey: 'Vehiculo_VIN', targetKey: 'VIN'});
//Vehiculo.hasMany(Regrx,{foreignKey: 'VIN'});

MotorRegrx.sync();



module.exports = MotorRegrx;
