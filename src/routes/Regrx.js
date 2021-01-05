const router = require('express').Router();
const Regrx = require('../models/Regrx');


router.get('/', async(req,res)=>{
    
    try {
        const regrx= await Regrx.findAll({
        where:{
            Vehiculo_VIN: "1M1AW07Y0JM089058",
            Generico_CodGenerico: 25,
            
        },
        limit: 49
    })
       
    res.json(regrx)

    } catch(e){
        console.log(e)
        res.status(500).json({
            message:'Something goes wrong',
            data:{}
        })

    }
       
});



module.exports = router; 