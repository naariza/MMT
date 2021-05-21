'use strict'

var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var carSchema= Schema({
    clase:String,
    modelo:String,
    chasis:String,
    marca:String,
    capacidad:String,
    placa:String,
    serie_motor:String,
    año_fabrica:String,
    fecha_compra:String,
    rendimiento:String,
    tipo_combustible:String,
    ref_aceite:String,
    ref_rodamiento:String,
    ref_lubricante:String,
    ref_bateria:String,
    ref_llantas:String,
    ref_correas:String,
    ref_aceiteTransmision:String,
    ref_filtroAire:String,
    sis_frenos:String,
    cinturones:String,
    sis_direccion:String,
    airbags:String,
    sis_suspension:String,
    chasis_carroceria:String,
    neumaticos:String,
    cristales:String,
    iluminacion:String,
    apoya_cabeza:String,
    control_estabilidad:String,
    servicio:String,
    hv_vehiculo:String,
    image:String
});
module.exports = mongoose.model('Car', carSchema);