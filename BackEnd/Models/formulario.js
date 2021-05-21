'use strict'
var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var formSchema= Schema({
  name:String,
  description:String,
  fechaVigencia:String,
  vehiculo:String,
  preguntas:Array,
});
module.exports = mongoose.model('Fomulario', formSchema);