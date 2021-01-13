const Sequelize  = require("sequelize");
const sequelize = require('../database/db');
const Vehiculo = require("./Vehiculo");

const Regrx = sequelize.define('RegRx',{
    CodRegRx:{ 
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
    tableName: 'RegRx',
    
    timestamps: false
});

 //Vehiculo.hasMany(Regrx);
Regrx.belongsTo(Vehiculo, {foreignKey: 'Vehiculo_VIN', targetKey: 'VIN'});
//Vehiculo.hasMany(Regrx,{foreignKey: 'VIN'});

Regrx.sync();



module.exports = Regrx;
