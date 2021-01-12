const { Sequelize }= require('sequelize');
const {database} = require('../config');

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password,{
        host:database.host,
        dialect:'mssql',
        dialectOptions: {
            options: {
              
                encrypt: false,
                validateBulkLoadParameters: true,
                "requestTimeout": 300000
            }
        }
    }
);
module.exports = sequelize