const Sequelize  = require("sequelize");
const sequelize = require('../database/db');
const Usuario = sequelize.define('Usuario',{
    CodUsuario:{ 
        type: Sequelize.INTEGER,
        primaryKey:true,
    },
    Empresa_CodEmpresa:{ 
        type: Sequelize.INTEGER,
        primaryKey:true,
    },
    Perfil_CodPerfil:{ 
        type: Sequelize.INTEGER,
        primaryKey:true,
    },
    Alias:{ 
        type: Sequelize.TEXT,
        primaryKey:true,
    },
    Nombre:{ 
        type: Sequelize.TEXT,
        primaryKey:true,
    },
    Apellido:{ 
        type: Sequelize.TEXT,
        primaryKey:true,
    },
    Contrasena:{ 
        type: Sequelize.TEXT,
        primaryKey:true,
    },
    Correo:{ 
        type: Sequelize.TEXT,
        primaryKey:true,
    },
    Telefono:{ 
        type: Sequelize.INTEGER,
        primaryKey:true,
    },

},{
    sequelize,
    //freezeTableName: true,
    tableName: 'Usuario',
  
    timestamps: false
});

module.exports = Usuario;
