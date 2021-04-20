'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret="MmtLtda"

exports.createtoken=function(user){
var payload={
    sub:user._id,
    name:user.name,
    surname:user.surName,
    email:user.email,
    role:user.role,
    image:user.image,
    iat:moment().unix(),
    exp:moment().add(20,'days').unix
};

return jwt.encode(payload, secret);
};