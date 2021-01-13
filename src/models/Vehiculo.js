const Sequelize  = require("sequelize");
const sequelize = require('../database/db');
const Regrx = require("./Regrx");
const Vehiculo = sequelize.define('Vehiculo',{
    VIN:{ 
        type: Sequelize.STRING,
        primaryKey:true,
        allowNull: false, 
    },
    // Modelo_CodModelo:{ 
    //     type: Sequelize.INTEGER,
        
    // },
    // Empresa_CodEmpresa:{ 
    //     type: Sequelize.INTEGER,
        
    // },
    // Patente:{ 
    //     type: Sequelize.TEXT,
        
    // },
    // EstIgnicion:{ 
    //     type: Sequelize.INTEGER,
        
    // },
    // EstadoServicio:{ 
    //     type: Sequelize.INTEGER,
        
    // },
    

},{
    sequelize,
    
    tableName: 'Vehiculo',
  
    timestamps: false
});


// Vehiculo.hasMany(Regrx,{foreignKey: 'VIN'});
//Regrx.belongsTo(Vehiculo);


module.exports = Vehiculo;
