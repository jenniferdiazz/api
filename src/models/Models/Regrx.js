const {Model, Datatypes} = require('sequelize');
const sequelize = require('../db');
class Regrx extends Model {}
Regrx.init({
    CodRegRx: Datatypes.INT,
    Vehiculo_VIN: Datatypes.STRING,
    Lugar_CodLugar : Datatypes.INT,
    Generico_CodGenerico: Datatypes.INT,
    Fecha_Hora: Datatypes.DATE,
    Lat: Datatypes.INT,
    Lon: Datatypes.INT,
    CodFecha: Datatypes.INT,
    Estado: Datatypes.INT,
    Generico1: Datatypes.INT,
    Generico2: Datatypes.INT,
    Generico3: Datatypes.INT,
    Generico4: Datatypes.INT,
    Generico5: Datatypes.INT,

},{
    sequelize,
    freezeTableName: true,
    timestamps: false
});

module.exports = Regrx;
