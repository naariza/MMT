'use strict'
 var mongoose= require('mongoose');
 var app = require('./app');
 var port = process.env.PORT || 3000;
 mongoose.Promise= global.Promise;
 mongoose.connect('mongodb+srv://nicolas:12345@cluster0.xtwal.mongodb.net/MantenimientoDeVehiculosMmtLtda?retryWrites=true&w=majority',
 {useUnifiedTopology:true,
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false},
(err,res)=>{
     if(err){
         throw err;
     }else{
         console.log('La base de datos esta conectada...')
         app.listen(port, function(){
             console.log('El api de Mantenimiento de Vehiculos esta escuchando el puerto http://localhost:'+port);
         })
     }
    });