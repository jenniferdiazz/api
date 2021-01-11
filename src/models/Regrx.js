const Sequelize  = require("sequelize");
const sequelize = require('../database/db');
console.log("MODEL")
console.log(sequelize)



const Regrx = sequelize.define('RegRx',{
    CodRegRx:{ 
        type: Sequelize.INTEGER,
        primaryKey:true,
    },
    Vehiculo_VIN:{ 
        type: Sequelize.TEXT
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
    // sequelize,
    tableName: 'RegRx',
    // modelName: 'RegRx',
    //freezeTableName: true,
    timestamps: false
});

Regrx.sync();



module.exports = Regrx;
