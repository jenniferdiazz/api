const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.get('/login',(req,res)=>{
    res.json({
        error: null,
        data: {
            title: 'mi ruta protegida',
            //este user viene de la validate-token
            user: req.usuario
        }
    })
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
            error: "Username does not exist"
        });

    }

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
            next();
       
}

    } catch(e){
        console.log(e)
        res.status(500).json({
            message:'No Search Results. Something goes wrong. try again',
           
        })

    }
    


});


module.exports = router; 

