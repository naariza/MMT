'use strict'

var mongoose=require('mongoose');
const {model}=require('./user');
const {modelo}=require('./formulario');
var Schema = mongoose.Schema;

var preoperacionalSchema= Schema({
    cedula:String,
    empresa:String,
    kilo_inicial:Number,
    kilo_final: Number,
    kilo_recorridos :Number,
    ubicacion:String,
    date:String,
    driver:{type:Schema.ObjectId,ref:'User'},
    formulario:{type:Schema.ObjectId,ref:'Formulario'},
    respuesta:Array
    

});
module.exports = mongoose.model('Preoperacional', preoperacionalSchema);