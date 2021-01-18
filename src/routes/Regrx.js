const router = require('express').Router();
const Regrx = require('../models/Regrx');
const Vehiculo = require('../models/Vehiculo');
const Sequelize  = require("sequelize");
const {Op} = require("sequelize");
const DataTypes = require('sequelize/lib/data-types')
const MotorRegrx = require('../models/MotorRegrx');

DataTypes.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options)
  return date.format('YYYY-MM-DD HH:mm:ss.SSS')
}

router.get('/', async(req,res)=>{
    require= req.query
    console.log(require.generico)
    if(require.patente === null || require.patente===undefined){
        require.patente=""
    }
    if(require.endDate===undefined || require.endDate===null){
        require.endDate=""
    }
    if(require.startedDate===undefined || require.startedDate===null){
        require.startedDate=""
    }
    if(require.generico===undefined || require.generico===null){
        require.generico=""
    }
    try {
        if (require.generico == ""){
            if(require.patente != ""){
                if(require.endDate=="" && require.startedDate==""){
                    const regrx= await Regrx.findAll({
                        include:{
                            model: Vehiculo,
                            where:{
                            Patente: {[Op.eq]: require.patente }
                            }
                        },
                        order: [
                            ['Fecha_Hora']
                        ],
                        limit: 10
                    })
                    
                    res.json({data: regrx})
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
                            CodFecha: {[Op.between]:[require.startedDate, require.endDate]}
                        },
                        order: [
                            ['Fecha_Hora']
                          ],
                        limit: 10
                    })
              
                    res.json({data: regrx})
                }
            }
            else{
                if(require.endDate=="" && require.startedDate==""){
                    const regrx= await Regrx.findAll({
                        where:{
                            Vehiculo_VIN: require.vin,
                        },
                        order: [
                            ['Fecha_Hora']
                        ],
                        limit: 10
                    })
                    res.json({data : regrx})
                }else{
                    const regrx= await Regrx.findAll({
                        where:{
                            Vehiculo_VIN: require.vin,
                            CodFecha: {[Op.between]:[require.startedDate, require.endDate]}
                        },
                        order: [
                            ['Fecha_Hora']
                        ],
                        limit: 10
                    })
               
                res.json({data: regrx})
                }
            }
        }
        else if(require.generico=="25"){
            if(require.patente != ""){
                if(require.endDate=="" && require.startedDate==""){
                    const regrx= await Regrx.findAll({
                        include:{
                            model: Vehiculo,
                            where:{
                            Patente: {[Op.eq]: require.patente }
                        }
                    },
                    where:{
                    Generico_CodGenerico: 25,
                    },
                    order: [
                        ['Fecha_Hora']
                    ],
                    limit: 10
                })
                
                res.json({data: regrx})
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
                            Generico_CodGenerico: 25,
                            CodFecha: {[Op.between]:[require.startedDate, require.endDate]}
                        },
                        order: [
                            ['Fecha_Hora']
                        ],
                        limit: 10
                    })
                  
                    res.json({data: regrx})
                }
            }
            else{
                if(require.endDate=="" && require.startedDate==""){
                const regrx= await Regrx.findAll({
                where:{
                    Vehiculo_VIN: require.vin,
                    //Vehiculo_VIN: "1M1AW07Y0JM089058",
                    Generico_CodGenerico: require.generico,
                    //Generico_CodGenerico: 25,
                },
                order: [
                    ['Fecha_Hora']
                  ],
                limit: 5
                })
                res.json({data : regrx})
                }else{
                    const regrx= await Regrx.findAll({
                        where:{
                            Vehiculo_VIN: require.vin,
                            Generico_CodGenerico: 25,
                            CodFecha: {[Op.between]:[require.startedDate, require.endDate]}
                        },
                        order: [
                            ['Fecha_Hora']
                        ],
                        limit: 10
                    })
                    
                    res.json({data: regrx})
                }
            }
        }
        else if(require.generico=="54"){
            if(require.patente != ""){
                if(require.endDate=="" && require.startedDate==""){
                    const motorregrx= await MotorRegrx.findAll({
                        include:{
                            model: Vehiculo,
                            where:{
                            Patente: {[Op.eq]: require.patente }
                        }
                    },
                    where:{
                    Generico_CodGenerico: 54,
                    },
                    order: [
                        ['Fecha_Hora']
                    ],
                    limit: 10
                })
                res.json({data: motorregrx})
                }else{
                    const motorregrx= await MotorRegrx.findAll({
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
                            Generico_CodGenerico: 54,
                            CodFecha: {[Op.between]:[require.startedDate, require.endDate]}
                        },
                        order: [
                            ['Fecha_Hora']
                        ],
                        limit: 10
                    })
                    res.json({data: motorregrx})
                }
            }
            else{
                if(require.endDate=="" && require.startedDate==""){
                const motorregrx= await MotorRegrx.findAll({
                where:{
                    Vehiculo_VIN: require.vin,
                    Generico_CodGenerico: 54,
                },
                order: [
                    ['Fecha_Hora']
                  ],
                limit: 5
                })
                res.json({data : motorregrx})
                }else{
                    const motorregrx= await MotorRegrx.findAll({
                        where:{
                            Vehiculo_VIN: require.vin,
                            Generico_CodGenerico: 54,
                            CodFecha: {[Op.between]:[require.startedDate, require.endDate]}
                        },
                        order: [
                            ['Fecha_Hora']
                        ],
                        limit: 10
                    })
                    res.json({data: motorregrx})
                }
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