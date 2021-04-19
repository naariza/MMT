'use strict'


var User = require('../Models/user');
var bcrypt = require('bcrypt-nodejs');
function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando el controlador de usuarios'
    });
}

function UserSave(req, res) {
    var user = new User();
    var params = req.body;
    //console.log(params);
    user.name = params.name;
    user.surName = params.surName;
    user.email = params.email;
    user.role = params.role;
    user.image = 'null';

    if (params.password) {
        //Encriptar la contraseña
        bcrypt.hash(params.password, null, null, function (err, hash) {
            user.password = hash;
            if (user.name != null && user.surName != null && user.email != null) {
                //Guarde el Usuario
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({ message: 'Error al guardar el usuario' });
                    } else {
                        if (!userStored) {
                            res.status(404).send({ message: 'No se ha registrado el usuario' });
                        } else {
                            res.status(200).send({ user, userStored });
                        }
                    }
                })
            } else {
                res.status(200).send({ message: 'Introduce todos los campos' });
            }
        });
    } else {
        res.status(200).send({ message: 'Introduce la contraseña' });
    }
}
function loginUser(req,res){
 var params = req.body;
 var name = params.name;
 var email = params.email;
 var password = params.password

 User.findOne({email:email.toLowerCase()},(err,user)=>{
     if(err){
         res.status(500).send({message:"Error en la petición"})
     }else{
         if(!user){
            res.status(404).send({ message: 'El usuario no existe' });
         }else{
            //Comprobar la Contraseña
            bcrypt.compare(password,user.password,(err,check)=>{
                if(check){
                    //Devolver los datos del usuario logueado
                    if(params.gethash){
                        //Devolver el Token
                    }else{
                        res.status(200).send({user});
                    }
                }else{

                }
            })
         }
     }
 })
}
module.exports = {
    pruebas,
    UserSave,
    loginUser
};