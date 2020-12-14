const mongoose = require(mongoose);
// Definir nuestros modelos
const Schema = mongoose.Schema
// Platos de cómida
const Meals = mongoose.model('Meal', new Schema({
  name: String,
  description: String
}));

module.exports = Meals;