const {Model, Datatypes} = require('sequelize');
const sequelize = require('../database/db');
class Usuario extends Model {}
Usuario.init({
    CodUsuario: Datatypes.INT,
    Empresa_CodEmpresa : Datatypes.INT,
    Perfil_CodPerfil : Datatypes.INT,
    Alias :  Datatypes.STRING,
    Nombre: Datatypes.STRING,
    Apellido: Datatypes.STRING,
    Contrasena : Datatypes.STRING,
    Correo: Datatypes.STRING,
    Telefono: Datatypes.STRING,

},{
    sequelize,
    //freezeTableName: true,
    tableName: 'Usuario',
    modelName: 'Usuario',
    timestamps: false
});

module.exports = Usuario;
