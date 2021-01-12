const router = require('express').Router();
const Regrx = require('../models/Regrx');
const Sequelize  = require("sequelize");
const {Op} = require("sequelize");
const DataTypes = require('sequelize/lib/data-types')

DataTypes.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options)
  return date.format('YYYY-MM-DD HH:mm:ss.SSS')
}

router.get('/', async(req,res)=>{
    console.log("vehiculo:")
    
    console.log(req.query.startedDate)
    console.log(req.query.endDate)
 
    const startedDate = "2020-06-01 01:03:50"
    const endDate = "2020-06-10 00:00:00"
    try {
        const regrx= await Regrx.findAll({
        where:{
            
            Vehiculo_VIN: req.query.vin,
            Generico_CodGenerico: 25,
            Fecha_Hora: {[Op.between]:[startedDate, endDate]}

            
        },
        limit: 4
    })
       
    res.json(regrx)

    } catch(e){
        console.log(e)
        res.status(500).json({
            message:'No Search Results. Something goes wrong. try again',
            data:e
        })

    }
      
});



module.exports = router; 