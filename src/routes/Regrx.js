const router = require('express').Router();
const Regrx = require('../models/Regrx');
const Vehiculo = require('../models/Vehiculo');
const Sequelize  = require("sequelize");
const {Op} = require("sequelize");
const DataTypes = require('sequelize/lib/data-types')

DataTypes.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options)
  return date.format('YYYY-MM-DD HH:mm:ss.SSS')
}

router.get('/', async(req,res)=>{
    require= req.query
    console.log(require.patente)
    if(require.patente === null || require.patente===undefined){
        require.patente=""
    }
    try {
        if(require.patente != ""){
        {
            if((require.endDate=="" || require.endDate==undefined) && (require.startedDate=="" || require.startedDate==undefined)){
            const regrx= await Regrx.findAll({
                include:{
                    model: Vehiculo,
                    where:{
                        Patente: {[Op.eq]: require.patente }
                    }
                },
                where:{
                    
                    Generico_CodGenerico: require.generico,
                },
                order: [
                    ['Fecha_Hora']
                  ],
                limit: 10
            })
            console.log("lleno patente")
            res.json({
                data: regrx
            })
            }else{
                const regrx= await Regrx.findAll({
                    include:{
                        model: Vehiculo,
                        where:{
                            Patente: {[Op.eq]: require.patente }
                        },
                        order: [
                            ['Fecha_Hora']
                          ],
                    },
                    where:{
                        Generico_CodGenerico: require.generico,
                        CodFecha: {[Op.between]:[require.startedDate, require.endDate]}
                    },
                    order: [
                        ['Fecha_Hora']
                      ],
                    limit: 10
                })
                console.log("lleno patente")
                res.json({
                    data: regrx
                })

            }

        }}
        else{
            if((require.endDate=="" || require.endDate==undefined) && (require.startedDate=="" || require.startedDate==undefined)){
            const regrx= await Regrx.findAll({
                where:{
                    Vehiculo_VIN: require.vin,
                    Generico_CodGenerico: require.generico,
                },
                order: [
                    ['Fecha_Hora']
                  ],
                limit: 10
            })
            res.json({
                data : regrx})
            
    
            }else{
            const regrx= await Regrx.findAll({
                where:{
                    Vehiculo_VIN: require.vin,
                    Generico_CodGenerico: require.generico,
                   CodFecha: {[Op.between]:[require.startedDate, require.endDate]}
                },
                order: [
                    ['Fecha_Hora']
                  ],
                limit: 10
            })
            console.log("lleno fecha")
            res.json({
                data: regrx
            })
    
            }
        }
       
    } catch(e){
        console.log(e)
        res.status(500).json({
            message:'No Search Results. Something goes wrong. try again',
            error: e

        })

    }
      
});


module.exports = router; 