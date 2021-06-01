'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var User = require('../Models/user');
var Car = require('../Models/car');
const { send } = require('process');

function getCar(req, res) {
    var carId = req.params.id;
    Car.findById(carId).populate({ path: 'user' }).exec((err, car) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!car) {
                res.status(404).send({ message: 'El vehiculo no existe' });
            } else {
                res.status(200).send({ car });
            }
        }
    });

}

function getCars(req, res) {
    var userId = req.params.user;
    if (!userId) {
        //sacar todos los vehiculos de la bbdd
        var find = Car.find({}).sort('clase');
    } else {
        //sacar los vehiculos de un conductor en concreto de la bdd
        var find = Car.find({ user: userId }).sort('clase');
    }
    find.populate({ path: 'user' }).exec((err, cars) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
            
        } else {
            if (!cars) {
                res.status(404).send({ message: 'No hay vehiculos' });
                
            } else {
                res.status(200).send({ cars });
            }
        }
    });
}
function saveCar(req, res) {
    var car = new Car();
    var params = req.body;
    car.clase = params.clase;
    car.modelo = params.modelo;
    car.chasis = params.chasis;
    car.marca = params.marca;
    car.capacidad = params.capacidad;
    car.placa = params.placa;
    car.serie_motor = params.serie_motor;
    car.año_fabrica = params.año_fabrica;
    car.fecha_compra = params.fecha_compra;
    car.rendimiento = params.rendimiento;
    car.tipo_combustible = params.tipo_combustible;
    car.ref_aceite = params.ref_aceite;
    car.ref_rodamiento = params.ref_rodamiento;
    car.ref_lubricante = params.ref_lubricante;
    car.ref_bateria = params.ref_bateria;
    car.ref_llantas = params.ref_llantas;
    car.ref_correas = params.ref_correas;
    car.ref_aceiteTransmision = params.ref_aceiteTransmision;
    car.ref_filtroAire = params.ref_filtroAire;
    car.sis_frenos = params.sis_frenos;
    car.cinturones = params.cinturones;
    car.sis_direccion = params.sis_direccion;
    car.airbags = params.airbags;
    car.sis_suspension = params.sis_suspension;
    car.chasis_carroceria = params.chasis_carroceria;
    car.neumaticos = params.neumaticos;
    car.cristales = params.cristales;
    car.iluminacion = params.iluminacion;
    car.apoya_cabeza = params.apoya_cabeza;
    car.control_estabilidad = params.control_estabilidad;
    car.servicio = params.servicio;
    car.hv_vehiculo ='';
    car.image = '';

    car.save((err, carStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (!carStored) {
                res.status(404).send({ message: 'No se ha guardado el vehiculo' });
            }
            res.status(200).send({ car: carStored });
        }
    });
}
function updateCar(req, res) {
    var carId = req.params.id;
    var update = req.body;

    Car.findByIdAndUpdate(carId, update, (err, carUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (!carUpdate) {
                res.status(404).send({ message: 'No hay actualizado el vehiculo' });
            } else {
                res.status(200).send({ car: carUpdate });
            }
        }
    });
}
function deleteCar(req, res) {
    var carId = req.params.id;
    Car.findByIdAndRemove(carId, (err, carRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error al eliminar el vehiculo' });
        } else {
            if (!carRemoved) {
                res.status(404).send({ message: 'El vehiculo no ha sido eliminado' });

            } else {
                res.status(200).send({ car:carRemoved });

            }
        }

    });
}
function uploadImage(req, res) {
    var carId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            Car.findByIdAndUpdate(carId, { image: file_name }, (err, carUpdate) => {
                if (!carUpdate) {
                    res.status(404).send({ message: 'No se ha podido actualizar el vehiculo' });
                } else {
                    res.status(200).send({ car: carUpdate });
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
    var path_file = './Uploads/cars/' + imageFile;
    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'No existe la imagen...' });
        }
    });
}
module.exports = {
    getCar,
    saveCar,
    getCars,
    updateCar,
    deleteCar,
    uploadImage,
    getImageFile
};