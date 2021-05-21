'use strict'
var Formulario = require('../Models/formulario')
var Car = require('../Models/car')

function saveForm(req, res) {
    var formulario = new Formulario();
    var params = req.body;
    formulario.name = params.name;
    formulario.description = params.description;
    formulario.fechaVigencia = params.fechaVigencia;
    formulario.vehiculo = params.vehiculo;
    formulario.preguntas = params.preguntas;

    formulario.save((err, formStorage) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (!formStorage) {
                res.status(404).send({ message: 'No se ha guardado el Formulario' });
            }
            res.status(200).send({ formulario: formStorage })
        }
    });
}
function getForm(req, res) {

    var carId = req.params.id;
    Car.findById(carId).populate({ path: 'user' }).exec((err, car) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!car) {
                res.status(404).send({ message: 'El vehiculo no existe' });
            } else {
                if (car.clase != 'TRACTO CAMION' && car.clase != 'TRACTO MULA') {
                    Formulario.find({ vehiculo: 'Liviano' }).exec((err, formulario) => {
                        if (err) {
                            res.status(500).send({ message: 'Error en la petición' });
                        } else {
                            if (!formulario) {
                                res.status(404).send({ message: 'El vehiculo no existe' });
                            } else {
                                res.status(200).send({ formulario });
                            }
                        }

                    })
                }else{
                    res.status(200).send({ message: 'formulario para tracto camion' })
                }

            } 
        }

    });
    


}
module.exports = {
    saveForm,
    getForm
}