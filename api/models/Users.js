const mongoose = require('mongoose');
// Definir nuestros modelos
const Schema = mongoose.Schema
// Platos de cómida
const Users = mongoose.model('User', new Schema({
	email: String,
	password: String,
	salt: String // password encriptada
}));

module.exports = Users;