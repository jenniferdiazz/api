const router = require('express').Router();
const Regrx = require('../models/Regrx');
const Sequelize  = require("sequelize");
const {Op} = require("sequelize");
const DataTypes = require('sequelize/lib/data-types')

DataTypes.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options)
  return date.format('YYYY-MM-DD HH:mm:ss.SSS')
}
const startedDate = "2020-06-01 01:03:50"
const endDate = "2020-06-10 00:00:00"

router.get('/', async(req,res)=>{
    console.log("vehiculo:")
    
    console.log(req.query.startedDate)
    console.log(req.query.endDate)
    console.log(req.query.startedDate > req.query.endDate)
    require= req.query
    
    
    //const startedDate = "2020-06-01 01:03:50"
     //const endDate = "2020-06-10 00:00:00"
    try {
        if((req.query.endDate=="" || req.query.endDate==undefined) && (req.query.startedDate=="" || req.query.startedDate==undefined)){
            const regrx= await Regrx.findAll({
                where:{
                    Vehiculo_VIN: req.query.vin,
                    Generico_CodGenerico: 25,
                },
                limit: 4
            })
            console.log("vacio")
            res.json({
                data: regrx
            })
    
        }else{
            const regrx= await Regrx.findAll({
                where:{
                    
                    Vehiculo_VIN: req.query.vin,
                    Generico_CodGenerico: 25,
                    Fecha_Hora: {[Op.between]:[req.query.startedDate, req.query.endDate]}
                },
                limit: 4
            })
            console.log("no vacio")
            res.json({
                data: regrx
            })
    
        }
       
    } catch(e){
        console.log(e)
        res.status(500).json({
            message:'No Search Results. Something goes wrong. try again',
        })

    }
      
});


module.exports = router; 