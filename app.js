const express = require('express');
// Body Parser lee el jason que trae la peticion 
const bodyParser = require('body-parser');
//hacer la conexion a mongodb atravez del archivo connect 
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();
require('dotenv').config();
const { auth, requiresAuth } = require('express-openid-connect');
//config for the auth 
const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL,
  clientID:process.env.CLIENT_ID,
  issuerBaseURL:process.env.ISSUER_BASE_URL,
  secret:process.env.SECRET,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
});

app.get('/profile', requiresAuth(), (req, res) =>{
  res.send(JSON.stringify(req.oidc.user));
})

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