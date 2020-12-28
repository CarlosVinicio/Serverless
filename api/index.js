const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Routes
const meals = require('./routes/meals')
const orders = require('./routes/orders')
const auth = require('./routes/auth');

// crear app de express
const app = express();
// agregamos pluggins/librerias a app
app.use(bodyParser.json());
app.use(cors());

// Conexion de base de datos con Mongoose 
mongoose.connect("mongodb+srv://Carlos:88DwaybVQYLN2JV@cluster0.wwgsz.mongodb.net/Almuerzi?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useUnifiedTopology: true
  }
);


//Rutas
app.use('/api/meals', meals );
app.use('/api/orders', orders );
app.use('/api/auth', auth);

module.exports = app;
