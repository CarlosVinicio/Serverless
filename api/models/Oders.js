const mongoose = require(mongoose);
// Definir nuestros modelos
const Schema = mongoose.Schema

const Orders = mongoose.model('Order', new Schema({
  meal_id: { type: Schema.Types.ObjectId, ref: 'Meal' }, // ref: referencia de un objeto MEAL
  user_id:	String
}));

module.exports = Orders;