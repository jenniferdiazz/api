const router = require('express').Router();
const Regrx = require('../models/Regrx');


// router.get('/home',(req,res)=>{
//     //render recibe ejs y transforma a html
//     res.render('index')


// });





router.get('/', async(req,res)=>{
    
    console.log(req.query.vin)
    //render recibe ejs y transforma a html
    
    try {
        const regrx= await Regrx.findAll({
        where:{
            Vehiculo_VIN: req.query.vin,
            Generico_CodGenerico: 25,
            
        },
        limit: 9
    })
       
    res.json(regrx)

    } catch(e){
        console.log(e)
        res.status(500).json({
            message:'No Search Results. Something goes wrong. try again',
            data:{}
        })

    }
    
       
});



module.exports = router; 