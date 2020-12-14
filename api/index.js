const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// crear app de express
const app = express();
// agregamos pluggins/librerias a app
app.use(bodyParser.json());
app.use(cors());

// Conexion de base de datos con Mongoose 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//Rutas
app.get('*', (req, resp) => {
    resp.send('soy carlos')
});


module.exports = app;
