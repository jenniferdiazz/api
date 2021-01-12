const express = require('express');
const morgan= require('morgan');
const app = express();
const sequelize = require('../src/database/db');
const path = require('path');
const bodyParser = require('body-parser');
const auth = require('../src/routes/auth');
const Regrx = require('../src/routes/Regrx');
const router = require('express').Router();
const jwtAuth = require('../src/middleware/jwtAuth');


//setting
const PORT = process.env.PORT || 3000;
 
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
//middlewares: funciones que se ejecutan antes de que lleguen a las rutas, para usarlas usamos morgan
app.use(morgan('dev'));
//entiende los datos html
app.use(bodyParser.urlencoded({extended:false}));

//rutas
//router
//app.use('/api', Regrx);


app.listen(PORT, function(){
    console.log(`The application has started on the port${PORT}`);
    sequelize.sync().then(()=>{
        console.log("Connected to the database");
    }).catch(error =>{
        console.log('A fatal error has occurred', error)
    })
})

app.use(express.static(__dirname + "/public"));

app.use('/api', auth);
app.use('/api', jwtAuth,Regrx);
 
 