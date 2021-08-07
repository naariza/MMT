'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var User = require('../Models/user');
var Car = require('../Models/car');
const { send } = require('process');
var nodemailer = require('nodemailer');

function getCar(req, res) {
    var carClase = req.params.clase
    if(carClase==1){
       var find= Car.find({}).sort('modelo')
    }else{
        var find= Car.find({clase:carClase}).sort('modelo')
    }    
    find.exec((err, car) => {
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
    var carId = req.params.id;
    Car.findById(carId).populate({ path: 'user' }).exec((err, car) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!car) {
                res.status(404).send({ message: 'El vehiculo no existe' });
            } else {
                res.status(200).send({car})
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
function sendMessage(authorization,res){
    var params = authorization.body
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'sistemasmmtltda', // Cambialo por tu email
        pass: 'Mmtltda2021' // Cambialo por tu password
        }
        });
       const mailOptions = {
        from: `”${params.driver} ”`,
        to: 'jodase26@gmail.com', // Cambia esta parte por el destinatario
        subject: 'AUTORIZACION VEHICULAR',
        html: `
        <h2>Tecnicos En Montajes Mecanicos Y Civiles Ltda</h2> <br/>
        <h3>Coordial Saludo,</h3>
       <p style="text-transform: uppercase; text-align: justify;">
       Buen dia,Yo <strong>${params.driver}</strong> desempeñandome con el cargo de conductor, reporto salida del vehiculo <strong>${params.clase}</strong> modelo <strong>${params.modelo}</strong> con placa <strong>${params.placa}</strong> para realizar la actividad <strong>${params.activity}</strong> para <strong>${params.zone}</strong> con fecha y hora <strong>${params.date}</strong>  autorizado por <strong>${params.authorize}</strong>.
       </p>
        
        `
        };
       transporter.sendMail(mailOptions, function (err, info) {
        if (err){
        res.status(500).send({message:'Error en la peticion'})
        // console.log(err)
        }else
        res.status(200).send({message:'El reporte se genero correctamente'})
        });


}
module.exports = {
    getCar,
    saveCar,
    getCars,
    updateCar,
    deleteCar,
    uploadImage,
    getImageFile,
    sendMessage
};