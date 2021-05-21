'use strict'

var Preoperacional = require('../Models/preoperacional');

function savePreo(req, res) {
    var preoperacional = new Preoperacional();
    var params = req.body;
    preoperacional.cedula = params.cedula;
    preoperacional.empresa = params.empresa;
    preoperacional.kilo_inicial = params.kil_start;
    preoperacional.kilo_final= params.kil_end
    preoperacional.kilo_recorridos = params.kil_Total;
    preoperacional.ubicacion = params.location;
    preoperacional.date = params.date;
    preoperacional.driver = params.driver;
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
    });
}

module.exports = {
    savePreo
};