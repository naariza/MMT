'use strict'

var Preoperacional = require('../Models/preoperacional');
var nodemailer = require('nodemailer');
var Driver = require('../Models/user');
var Car = require('../Models/car')

function savePreo(req, res) {
    var preoperacional = new Preoperacional();
    var params = req.body;
    preoperacional.cedula = params.cedula;
    preoperacional.empresa = params.empresa;
    preoperacional.kilo_inicial = params.kil_start;
    preoperacional.ubicacion = params.location;
    preoperacional.date = params.date;
    preoperacional.driver = params.driver;
    preoperacional.car = params.car;
    preoperacional.formulario = params.formulario;
    preoperacional.respuesta = params.respuestas;


    preoperacional.save((err, preoStorage) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (!preoStorage) {
                res.status(404).send({ message: 'No se ha guardado el preoperacional' });
            }
            res.status(200).send({ preoperacional: preoStorage })

        }
        sendMessage(preoperacional);

    });

}
function sendMessage(preoperacional, res) {
    Car.findById(preoperacional.car).exec((err, car) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!car) {
                res.status(404).send({ message: 'El conductor no existe' });
            }

            Driver.findById(preoperacional.driver).populate({ path: 'car' }).exec((err, driver) => {
                if (err) {
                    res.status(500).send({ message: 'Error en la petición' });
                } else {
                    if (!driver) {
                        res.status(404).send({ message: 'El conductor no existe' });
                    }
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'sistemasmmtltda@gmail.com', // Cambialo por tu email
                            pass: 'Mmtltda2021' // Cambialo por tu password
                        }
                    });
                    const mailOptions = {
                        from: `”${driver.name} ”`,
                        to: 'jodase26@gmail.com', // Cambia esta parte por el destinatario
                        subject: 'PREOPERACIONAL',
                        html: `
                <h2>Tecnicos En Montajes Mecanicos Y Civiles Ltda</h2> <br/>
                <h3>Coordial Saludo,</h3>
               <p style="text-transform: uppercase; text-align: justify;">
               Buen dia,Yo <strong>${driver.name}</strong> identificado con cedula de ciudad <strong>${preoperacional.cedula}</strong> hago entrega del reporte de preoperacional para el vehiculo <strong>${car.clase}</strong> con un kilometraje inicial de <strong>${preoperacional.kilo_inicial}</strong>  Km y un kilometraje final de <strong>${preoperacional.kilo_final}</strong> km dando una diferencia de <strong>${preoperacional.kilo_recorridos}</h3></strong> Km recorridos durante el servicio.
               </p>
                
                `
                    };
                    transporter.sendMail(mailOptions, function (err, info) {
                        if (err)
                            res.status(500).send({ message: 'Error en la peticion' })
                        else
                            res.status(200).send({ message: 'El reporte se genero correctamente' })
                    });

                }
            });
        }

    });

}
function getPreoperacionales(req, res) {
    let carId = req.params.id;

    Preoperacional.find({ car: carId }).sort({ date: -1 }).exec((err, preoperacionales) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' })
        } else {
            if (!preoperacionales) {
                res.status(404).send({ message: 'No hay preoperacionales' });
            } else {
                res.status(200).send({ preoperacionales })
            }
        }

    });
}
function getPreoperacionalDriver(req, res) {
    let driverId = req.params.id;
    let car;
    Preoperacional.find({ driver: driverId }).sort({ date: -1 }).limit(1).exec((err, preoperacional) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' })
        } else {
            if (!preoperacional) {
                res.status(404).send({ message: 'No hay preoperacionales' });
            } else {
                preoperacional.forEach(element => {
                    car = element.car;
                });
                Car.findById(car).exec((err, car) => {
                    if (err) {
                        res.status(500).send({ message: 'Error en la petición' });
                    } else {
                        if (!car) {
                            res.status(404).send({ message: 'El vehiculo no existe' });
                        } else {
                            res.status(200).send(car)
                        }
                    }
                });
            }
        }
    });
}

module.exports = {
    savePreo,
    sendMessage,
    getPreoperacionales,
    getPreoperacionalDriver
};