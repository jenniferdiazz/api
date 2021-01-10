const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// router.get('/home',(req,res)=>{
//     //render recibe ejs y transforma a html
//     res.render('index')


// });
router.get('/login',(req,res)=>{
    //res.json("holaa")
    //render recibe ejs y transforma a html
    res.render('login')


});
router.post('/login', async(req,res, next)=>{
    const {Alias, Contrasena} = req.body;
    console.log(req.body)
    try {
        const user= await User.findOne({
        where:{
            Alias
            
        },
        if (user) {
            return res.status(400).json({
                error: "User with that email does not exist. Please signup"
            });
        }
        
        
    })
    if (user == null){
        return res.status(401).json({
            error: "User not exist "
        });

    }
   
    // if user is found make sure the email and password match
    // create authenticate method in user model
    else if (user.Contrasena != Contrasena) {
        return res.status(401).json({
            error: "Email and password dont match"
        });
    }
        else{
            let token = jwt.sign({CodUsuario:user.CodUsuario}, process.env.JWT_KEY);
            res.header("auth-token", token).json({
                error: null,
                data:{token}
            })
            //res.json({token});//retornamos solamente el token y es el que 
            //next();
            //usaremos para acceder a nuestra API
       
    //res.json(user)
}

    } catch(e){
        console.log(e)
        res.status(500).json({
            message:'No Search Results. Something goes wrong. try again',
           
        })

    }
    //render recibe ejs y transforma a html
    


});

// router.get('/', async(req,res)=>{
    
//     console.log(req.query.vin)
//     //render recibe ejs y transforma a html
    
//     try {
//         const regrx= await Regrx.findAll({
//         where:{
//             Vehiculo_VIN: req.query.vin,
//             Generico_CodGenerico: 25,
            
//         },
//         limit: 9
//     })
       
//     res.json(regrx)

//     } catch(e){
//         console.log(e)
//         res.status(500).json({
//             message:'No Search Results. Something goes wrong. try again',
//             data:{}
//         })

//     }
    
       
// });

module.exports = router; 

