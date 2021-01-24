const router = require('express').Router();
const Regrx = require('../models/Regrx');
const Vehiculo = require('../models/Vehiculo');
const Sequelize  = require("sequelize");
Serializer = require('sequelize-to-json')
const {Op} = require("sequelize");
const DataTypes = require('sequelize/lib/data-types')
const MotorRegrx = require('../models/MotorRegrx');
const fs = require('fs')


DataTypes.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options)
  return date.format('YYYY-MM-DD HH:mm:ss.SSS')
}

router.get('/', async(req,res)=>{
    require= req.query
   
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
                            },
                            order: [
                                ['Fecha_Hora','DESC']
                            ],
                        },
                        order: [
                            ['Fecha_Hora','DESC']
                        ],
                        limit: 499
                    })
                    
                    res.json(regrx)
                }else{
                    const regrx= await Regrx.findAll({
                        include:{
                            model: Vehiculo,
                            where:{
                                Patente: {[Op.eq]: require.patente }
                            },
                            order: [
                                ['Fecha_Hora','DESC']
                              ],
                        },
                        where:{
                            CodFecha: {[Op.between]:[require.startedDate, require.endDate]}
                        },
                        order: [
                            ['Fecha_Hora','DESC']
                          ],
                        limit: 499
                    })
              
                    res.json(regrx)
                }
            }
            else{
                if(require.endDate=="" && require.startedDate==""){
                    const regrx= await Regrx.findAll({
                        where:{
                            Vehiculo_VIN: require.vin,
                        },
                        order: [
                            ['Fecha_Hora','DESC'] 
                        ],
                        limit: 499
                    })
                    res.json(regrx)
                }else{
                    const regrx= await Regrx.findAll({
                        where:{
                            Vehiculo_VIN: require.vin,
                            CodFecha: {[Op.between]:[require.startedDate, require.endDate]}
                        },
                        order: [
                            ['Fecha_Hora','DESC']
                        ],
                        limit: 499
                    })
               
                res.json(regrx)
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
                        },
                        order: [
                            ['Fecha_Hora','DESC']
                        ],
                    },
                    where:{
                    Generico_CodGenerico: 25,
                    },
                    order: [
                        ['Fecha_Hora','DESC']
                    ],
                    limit: 499
                })
                
                res.json(regrx)
                }else{
                    const regrx= await Regrx.findAll({
                        include:{
                            model: Vehiculo,
                            where:{
                                Patente: {[Op.eq]: require.patente }
                            },
                            order: [
                                ['Fecha_Hora','DESC']
                            ],
                        },
                        where:{
                            Generico_CodGenerico: 25,
                            CodFecha: {[Op.between]:[require.startedDate, require.endDate]}
                        },
                        order: [
                            ['Fecha_Hora','DESC']
                        ],
                        limit: 499
                    })
                  
                    res.json(regrx)
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
                    ['Fecha_Hora','DESC']
                  ],
                limit: 499
                })
                res.json(regrx)
                }else{
                    const regrx= await Regrx.findAll({
                        where:{
                            Vehiculo_VIN: require.vin,
                            Generico_CodGenerico: 25,
                            CodFecha: {[Op.between]:[require.startedDate, require.endDate]}
                        },
                        order: [
                            ['Fecha_Hora','DESC']
                        ],
                        limit: 499
                    })
                    
                    res.json(regrx)
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
                        },
                        order: [
                            ['Fecha_Hora','DESC']
                        ],
                    },
                    where:{
                    Generico_CodGenerico: 54,
                    },
                    order: [
                        ['Fecha_Hora','DESC']
                    ],
                    limit: 499
                }).then(function(resp){
                    json="["
                  
                  for(i=0; i<resp.length; i++){
                    json= json+
                        '{ "Vehiculo_VIN": "'+ resp[i].Vehiculo_VIN +
                         '", "Generico_CodGeenerico": "'+ resp[i].Generico_CodGenerico+
                         '", "Fecha_Hora": "'+resp[i].Fecha_Hora+ 
                         '", "Lat": "' + resp[i].Lat +
                         '", "Lon": "'+ resp[i].Lon +
                         '", "Generico": { "Generico1": "'+ resp[i].Generico1+
                         '", "Generico2": "'+ resp[i].Generico2+
                         '", "Generico3": "'+ resp[i].Generico3+
                         '", "Generico4": "'+ resp[i].Generico4+
                         '", "Generico5": "'+ resp[i].Generico5+
                         '", "Generico6": "'+ resp[i].Generico6+
                         '", "Generico7": "'+ resp[i].Generico7+
                         '", "Generico8": "'+ resp[i].Generico8+
                         '", "Generico9": "'+ resp[i].Generico9+
                         '", "Generico10": "'+ resp[i].Generico10+
                         '", "Generico11": "'+ resp[i].Generico11+
                         '", "Generico12": "'+ resp[i].Generico12+
                         '", "Generico13": "'+ resp[i].Generico13+
                         '", "Generico14": "'+ resp[i].Generico14+
                         '", "Generico15": "'+ resp[i].Generico15+
                         '", "Generico16": "'+ resp[i].Generico16+
                         '", "Generico17": "'+ resp[i].Generico17+
                         '", "Generico18": "'+ resp[i].Generico18+
                         '", "Generico19": "'+ resp[i].Generico19+
                         '", "Generico20": "'+ resp[i].Generico20+
                         '", "Generico21": "'+ resp[i].Generico21+
                         '", "Generico22": "'+ resp[i].Generico22+
                         '", "Generico23": "'+ resp[i].Generico23+
                         '", "Generico24": "'+ resp[i].Generico24+
                         '", "Generico25": "'+ resp[i].Generico25+
                         '", "Generico26": "'+ resp[i].Generico26+
                         '", "Generico27": "'+ resp[i].Generico27+
                         '", "Generico28": "'+ resp[i].Generico28+
                         '", "Generico29": "'+ resp[i].Generico29+
                         '", "Generico30": "'+ resp[i].Generico30+
                         '", "Generico31": "'+ resp[i].Generico31+
                         '", "Generico32": "'+ resp[i].Generico32+
                         '" }, "Estado": "'+ resp[i].Estado+ '" }, '
                              
                  }
                  
                  cadena = json.slice(0,-2);
                  cadena= cadena+" ]"
                  
                    respuesta= JSON.parse(cadena)
                    res.json(respuesta) 
                    })
                }else{
                    const motorregrx= await MotorRegrx.findAll({
                        include:{
                            model: Vehiculo,
                            where:{
                                Patente: {[Op.eq]: require.patente }
                            },
                            order: [
                                ['Fecha_Hora', 'DESC']
                            ],
                        },
                        where:{
                            Generico_CodGenerico: 54,
                            CodFecha: {[Op.between]:[require.startedDate, require.endDate]}
                        },
                        order: [
                            ['Fecha_Hora','DESC']
                        ],
                        limit: 499
                    }).then(function(resp){
                        json="["
                      
                      for(i=0; i<resp.length; i++){
                        json= json+
                            '{ "Vehiculo_VIN": "'+ resp[i].Vehiculo_VIN +
                             '", "Generico_CodGeenerico": "'+ resp[i].Generico_CodGenerico+
                             '", "Fecha_Hora": "'+resp[i].Fecha_Hora+ 
                             '", "Lat": "' + resp[i].Lat +
                             '", "Lon": "'+ resp[i].Lon +
                             '", "Generico": { "Generico1": "'+ resp[i].Generico1+
                             '", "Generico2": "'+ resp[i].Generico2+
                             '", "Generico3": "'+ resp[i].Generico3+
                             '", "Generico4": "'+ resp[i].Generico4+
                             '", "Generico5": "'+ resp[i].Generico5+
                             '", "Generico6": "'+ resp[i].Generico6+
                             '", "Generico7": "'+ resp[i].Generico7+
                             '", "Generico8": "'+ resp[i].Generico8+
                             '", "Generico9": "'+ resp[i].Generico9+
                             '", "Generico10": "'+ resp[i].Generico10+
                             '", "Generico11": "'+ resp[i].Generico11+
                             '", "Generico12": "'+ resp[i].Generico12+
                             '", "Generico13": "'+ resp[i].Generico13+
                             '", "Generico14": "'+ resp[i].Generico14+
                             '", "Generico15": "'+ resp[i].Generico15+
                             '", "Generico16": "'+ resp[i].Generico16+
                             '", "Generico17": "'+ resp[i].Generico17+
                             '", "Generico18": "'+ resp[i].Generico18+
                             '", "Generico19": "'+ resp[i].Generico19+
                             '", "Generico20": "'+ resp[i].Generico20+
                             '", "Generico21": "'+ resp[i].Generico21+
                             '", "Generico22": "'+ resp[i].Generico22+
                             '", "Generico23": "'+ resp[i].Generico23+
                             '", "Generico24": "'+ resp[i].Generico24+
                             '", "Generico25": "'+ resp[i].Generico25+
                             '", "Generico26": "'+ resp[i].Generico26+
                             '", "Generico27": "'+ resp[i].Generico27+
                             '", "Generico28": "'+ resp[i].Generico28+
                             '", "Generico29": "'+ resp[i].Generico29+
                             '", "Generico30": "'+ resp[i].Generico30+
                             '", "Generico31": "'+ resp[i].Generico31+
                             '", "Generico32": "'+ resp[i].Generico32+
                             '" }, "Estado": "'+ resp[i].Estado+ '" }, '
                                  
                      }
                      
                      cadena = json.slice(0,-2);
                      cadena= cadena+" ]"
                      
                        respuesta= JSON.parse(cadena)
                        res.json(respuesta) 
                        })
                   
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
                    ['Fecha_Hora', 'DESC']
                  ],
                limit: 499,
                
                }).then(function(resp){
                json="["
              
              for(i=0; i<resp.length; i++){
                json= json+
                    '{ "Vehiculo_VIN": "'+ resp[i].Vehiculo_VIN +
                     '", "Generico_CodGeenerico": "'+ resp[i].Generico_CodGenerico+
                     '", "Fecha_Hora": "'+resp[i].Fecha_Hora+ 
                     '", "Lat": "' + resp[i].Lat +
                     '", "Lon": "'+ resp[i].Lon +
                     '", "Generico": { "Generico1": "'+ resp[i].Generico1+
                     '", "Generico2": "'+ resp[i].Generico2+
                     '", "Generico3": "'+ resp[i].Generico3+
                     '", "Generico4": "'+ resp[i].Generico4+
                     '", "Generico5": "'+ resp[i].Generico5+
                     '", "Generico6": "'+ resp[i].Generico6+
                     '", "Generico7": "'+ resp[i].Generico7+
                     '", "Generico8": "'+ resp[i].Generico8+
                     '", "Generico9": "'+ resp[i].Generico9+
                     '", "Generico10": "'+ resp[i].Generico10+
                     '", "Generico11": "'+ resp[i].Generico11+
                     '", "Generico12": "'+ resp[i].Generico12+
                     '", "Generico13": "'+ resp[i].Generico13+
                     '", "Generico14": "'+ resp[i].Generico14+
                     '", "Generico15": "'+ resp[i].Generico15+
                     '", "Generico16": "'+ resp[i].Generico16+
                     '", "Generico17": "'+ resp[i].Generico17+
                     '", "Generico18": "'+ resp[i].Generico18+
                     '", "Generico19": "'+ resp[i].Generico19+
                     '", "Generico20": "'+ resp[i].Generico20+
                     '", "Generico21": "'+ resp[i].Generico21+
                     '", "Generico22": "'+ resp[i].Generico22+
                     '", "Generico23": "'+ resp[i].Generico23+
                     '", "Generico24": "'+ resp[i].Generico24+
                     '", "Generico25": "'+ resp[i].Generico25+
                     '", "Generico26": "'+ resp[i].Generico26+
                     '", "Generico27": "'+ resp[i].Generico27+
                     '", "Generico28": "'+ resp[i].Generico28+
                     '", "Generico29": "'+ resp[i].Generico29+
                     '", "Generico30": "'+ resp[i].Generico30+
                     '", "Generico31": "'+ resp[i].Generico31+
                     '", "Generico32": "'+ resp[i].Generico32+
                     '" }, "Estado": "'+ resp[i].Estado+ '" }, '
                          
              }
              
              cadena = json.slice(0,-2);
              cadena= cadena+" ]"
              
                respuesta= JSON.parse(cadena)
                res.json(respuesta) 
                })
              
                }else{
                    const motorregrx= await MotorRegrx.findAll({
                        where:{
                            Vehiculo_VIN: require.vin,
                            Generico_CodGenerico: 54,
                            CodFecha: {[Op.between]:[require.startedDate, require.endDate]}
                        },
                        order: [
                            ['Fecha_Hora', 'DESC']
                        ],
                        limit: 499
                    }).then(function(resp){
                        json="["
                      
                      for(i=0; i<resp.length; i++){
                        json= json+
                            '{ "Vehiculo_VIN": "'+ resp[i].Vehiculo_VIN +
                             '", "Generico_CodGeenerico": "'+ resp[i].Generico_CodGenerico+
                             '", "Fecha_Hora": "'+resp[i].Fecha_Hora+ 
                             '", "Lat": "' + resp[i].Lat +
                             '", "Lon": "'+ resp[i].Lon +
                             '", "Generico": { "Generico1": "'+ resp[i].Generico1+
                             '", "Generico2": "'+ resp[i].Generico2+
                             '", "Generico3": "'+ resp[i].Generico3+
                             '", "Generico4": "'+ resp[i].Generico4+
                             '", "Generico5": "'+ resp[i].Generico5+
                             '", "Generico6": "'+ resp[i].Generico6+
                             '", "Generico7": "'+ resp[i].Generico7+
                             '", "Generico8": "'+ resp[i].Generico8+
                             '", "Generico9": "'+ resp[i].Generico9+
                             '", "Generico10": "'+ resp[i].Generico10+
                             '", "Generico11": "'+ resp[i].Generico11+
                             '", "Generico12": "'+ resp[i].Generico12+
                             '", "Generico13": "'+ resp[i].Generico13+
                             '", "Generico14": "'+ resp[i].Generico14+
                             '", "Generico15": "'+ resp[i].Generico15+
                             '", "Generico16": "'+ resp[i].Generico16+
                             '", "Generico17": "'+ resp[i].Generico17+
                             '", "Generico18": "'+ resp[i].Generico18+
                             '", "Generico19": "'+ resp[i].Generico19+
                             '", "Generico20": "'+ resp[i].Generico20+
                             '", "Generico21": "'+ resp[i].Generico21+
                             '", "Generico22": "'+ resp[i].Generico22+
                             '", "Generico23": "'+ resp[i].Generico23+
                             '", "Generico24": "'+ resp[i].Generico24+
                             '", "Generico25": "'+ resp[i].Generico25+
                             '", "Generico26": "'+ resp[i].Generico26+
                             '", "Generico27": "'+ resp[i].Generico27+
                             '", "Generico28": "'+ resp[i].Generico28+
                             '", "Generico29": "'+ resp[i].Generico29+
                             '", "Generico30": "'+ resp[i].Generico30+
                             '", "Generico31": "'+ resp[i].Generico31+
                             '", "Generico32": "'+ resp[i].Generico32+
                             '" }, "Estado": "'+ resp[i].Estado+ '" }, '
                                  
                      }
                      
                      cadena = json.slice(0,-2);
                      cadena= cadena+" ]"
                      
                        respuesta= JSON.parse(cadena)
                        res.json(respuesta) 
                        })
                    
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