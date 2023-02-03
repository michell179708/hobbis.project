const express = require('express');
// Body Parser lee el jason que trae la peticion 
const bodyParser = require('body-parser');
//hacer la conexion a mongodb atravez del archivo connect 
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();



app.use(bodyParser.json())
.use((req, res, next) =>{
    //esta instruccion es una medida  de seguridad no sabemos donde va incluida 
    // que el asterisco es un parametro de access control permitiendonos acceder a toda la aplicacion
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
}).use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });