const Sequelize  = require("sequelize");
const sequelize = require('../database/db');
const Usuario = sequelize.define('Usuario',{
    CodUsuario:{ 
        type: Sequelize.INTEGER,
        primaryKey:true,
    },
    Empresa_CodEmpresa:{ 
        type: Sequelize.INTEGER,
        
    },
    Perfil_CodPerfil:{ 
        type: Sequelize.INTEGER,
        
    },
    Alias:{ 
        type: Sequelize.TEXT,
        
    },
    
    Contrasena:{ 
        type: Sequelize.TEXT,
        
    },
    Correo:{ 
        type: Sequelize.TEXT,
        
    },
    

},{
    sequelize,
    
    tableName: 'Usuario',
  
    timestamps: false
});

module.exports = Usuario;
