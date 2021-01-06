const express = require('express');
const morgan= require('morgan');
const app = express();
const sequelize = require('../src/database/db');
const base = require('../src/models/Regrx')
const path = require('path');
const bodyParser = require('body-parser')


//const Regrx = require('../src/routes/Regrx')

//setting
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
//motor de plantilla ejs
app.set('view engine', 'ejs');
//middlewares: funciones que se ejecutan antes de que lleguen a las rutas, para usarlas usamos morgan
app.use(morgan('dev'));
//entiende los datos html
app.use(bodyParser.urlencoded({extended:false}));

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