const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
    console.log('Conexión a MongoDB exitosa');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;