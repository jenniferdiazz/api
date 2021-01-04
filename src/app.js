const express = require('express');
const app = express();
const sequelize = require('./src/db');
//const User = require('./database/models/User');

//setting
const PORT = process.env.PORT || 3000;

//rutas
app.get('/', function(req,res){
    res.send('Hello wordl!')
});

app.listen(PORT, function(){
    console.log(`La app ha arrancado en el puerto${PORT}`);
    sequelize.authenticate().then(()=>{
        console.log("Nos hemos conectado a la base de datos");
    }).catch(error =>{
        console.log('se ha producido un error', error)
    })
})