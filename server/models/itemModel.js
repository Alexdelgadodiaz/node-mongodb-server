const mongoose = require('mongoose');

// Definimos los valores posibles del campo "type"
const itemTypeEnum = ['free', 'premium', 'exclusive'];

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  itemDescription: {
    type: String,
    required: true,
  },
  isPremium: {
    type: Boolean,
    default: false, 
  },
  type: {
    type: String,
    enum: itemTypeEnum, 
    required: true,
  },
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;