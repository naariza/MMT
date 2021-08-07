'use strict'

var fs = require('fs');
var path = require('path');
var User = require('../Models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../Service/jwt');
var User = require('../Models/user');

const { findByIdAndUpdate } = require('../Models/user');
var mongoosePaginate = require('mongoose-pagination');
const { send } = require('process');


function getUser(req, res) {
    var userId = req.params.id;

    User.findById(userId, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!user) {
                res.status(404).send({ message: 'El usuario no existe' });
            } else {
                res.status(200).send({ user });
            }
        }
    })

}
function getUsers(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 3;
    User.find().sort('name').paginate(page, itemsPerPage, function (err, users, total) {
        if (err) {
            res.status(500).send({ message: 'Error al buscar los conductores' });

        } else {
            if (!users) {
                res.status(404).send({ message: 'No hay usuarios' });

            } else {
                return res.status(200).send({
                    pages: total,
                    users: users
                });
            }
        }
    });
}
function getDriver(req,res) {
    var userId = req.params.id;
    User.findById(userId).populate({path:'car'}).exec((err,user)=>{
        if(err){
            res.status(500).send({message:'Error en la petición'});
        }else{
            if(!user){
                res.status(404).send({message:'El conductor no existe'});
            }else{
                res.status(200).send({user});
            }
     }
    });
}

function getDrivers(req,res){
    var carId = req.params.car;
    if(!carId){
        //sacar todos los conductores de la bbdd
        var find =User.find({role:'CONDUCTOR'}).sort('name');
    }else{
        //sacar los conductores de un vehiculo en concreto de la bdd
        var find = User.find({car:carId}).sort('clase');
    }
    User.find({role:'CONDUCTOR'}).sort('name').populate({path:'car'}).exec((err,users)=>{
        if(err){
            res.status(500).send({message:'Error en el servidor'});
        
        }else{
            if(!users){
                res.status(404).send({message:'No hay Conductores'});
           
            }else{
                res.status(200).send({users});
            }
        }
    });
}
function UserSave(req, res) {
    var user = new User();
    var params = req.body;
    user.name = params.name;
    user.surName = params.surName;
    user.email = params.email;
    user.role = params.role;
    user.image = '';
    user.car = params.car;

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
                            res.status(200).send({ user:userStored });
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
function loginAdmin(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({ message: "Error en la petición" })
        } else {
            if (!user) {
                res.status(404).send({ message: 'El Administrador no existe' });
            } else {
                //Comprobar la Contraseña
                bcrypt.compare(password, user.password, (err, check) => {
                    if (check) {
                        //Devolver los datos del usuario logueado
                        if (params.gethash) {
                            //Devolver el Token con jwt
                            res.status(200).send({
                                token: jwt.createtoken(user)
                            })
                        } else {
                            res.status(200).send({ user });
                        }
                    } else {

                    }
                })
            }
        }
    })
}
function loginUser(req, res) {
    var params = req.body;
    var name = params.name;
    var password = params.password

    User.findOne({ name: name }, (err, user) => {
        if (err) {
            res.status(500).send({ message: "Error en la petición" })
        } else {
            if (!user) {
               
                res.status(404).send({ message: 'El Conductor no existe' });
            } else {
                //Comprobar la Contraseña
                bcrypt.compare(password, user.password, (err, check) => {
                    if (check) {
                        //Devolver los datos del usuario logueado
                        if (params.gethash) {
                            //Devolver el Token
                            res.status(200).send({
                                token: jwt.createtoken(user)
                            })
                        } else {
                            res.status(200).send({ user });

                        }
                    } else {
                    }
                })
            }
        }
    })
}
function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar el usuario' });
        } else {
            if (!userUpdate) {
                res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
            }
            res.status(200).send({ user: userUpdate });
        }

    });

}
function uploadImage(req, res) {
    var userId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'PNG' || file_ext == 'JPG' || file_ext == 'jpg' || file_ext == 'JPEG' || file_ext == 'jpeg' || file_ext == 'gif') {
            User.findByIdAndUpdate(userId, { image: file_name }, (err, userUpdated) => {
                if (!userUpdated) {
                    res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
                } else {
                    res.status(200).send({ image: file_name, user: userUpdated });
                }
            });
        } else {
            res.status(200).send({ message: 'La extension del archivo no es valida' });

        }
    } else {
        res.status(200).send({ message: 'No se ha subido ninguna imagen' });
    }
}
function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './Uploads/users/' + imageFile;
    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'No existe la imagen...' });
        }
    });
}
function deleteUser(req, res) {
    var userId = req.params.id;

    User.findByIdAndRemove(userId, (err, userRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error al eliminar el conductor' });
        } else {

            res.status(200).send({ user: userRemoved });

        }

    });

}

module.exports = {
    UserSave,
    loginAdmin,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile,
    getUser,
    getUsers,
    getDriver, 
    deleteUser, 
    getDrivers
};