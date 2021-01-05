const express = require('express');
const app = express();
const sequelize = require('../src/database/db');
const base = require('../src/models/Regrx')
console.log(base)

//const Regrx = require('../src/routes/Regrx')

//setting
const PORT = process.env.PORT || 3000;

//rutas
//router
//app.use('/api', Regrx);


app.listen(PORT, function(){
    console.log(`La app ha arrancado en el puerto${PORT}`);
    sequelize.sync().then(()=>{
        console.log("Nos hemos conectado a la base de datos");
    }).catch(error =>{
        console.log('se ha producido un error', error)
    })
})

const Regrx = require('../src/routes/Regrx')
 app.use('/api', Regrx);