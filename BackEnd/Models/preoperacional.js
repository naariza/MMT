'use strict'

var mongoose=require('mongoose');
const {model}=require('./car')
const {model}=require('./user');
var Schema = mongoose.Schema;

var preoperacionalSchema= Schema({
    // cedula:String,
    // empresa:String,
    // kilo_inicial:Number,
    // kilo_final: Number,
    // kilo_recorridos :String,
    // color:String,
    // ubicacion:String,
    // date:String,
    // image:String,
    // user:{type:Schema.ObjectId,ref:'User'},
    // formulario:{
    //     id,
    //     nombre,
    //     desscripcion,
    //     fechaCreacion,
    //     tipoCarrito,
    //     preguntas:[
    //         {
    //             nombre,
    //             desscripcion,
    //             valores:["si"=1,"no"=]
    //         }
    //     ],
    // },
    // respuestaFormulario:{
    //     id,
    //     id_usuario,
    //     fechaCreacion,
    //     fechaPresentacion,
    //     Fechalimite,
    //     id_formulario,
    //     respuestas:[
    //         {
    //             pregunta,
    //             valor
    //         }
    //     ]
    // }

});
module.exports = mongoose.model('Preoperacional', preoperacionalSchema);