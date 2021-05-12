'use strict'

var mongoose=require('mongoose');
const {model}=require('./car')
var Schema = mongoose.Schema;

var userSchema= Schema({
    name:String,
    surName:String,
    email:String,
    password: String,
    role:String,
    image:String,
    car:{type:Schema.ObjectId,ref:'Car'}
});
module.exports = mongoose.model('User', userSchema);