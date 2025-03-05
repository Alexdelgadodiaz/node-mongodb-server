const mongoose = require('mongoose');
const User = require('../models/userModel'); // Ajusta la ruta según dónde esté el modelo
require('dotenv').config({ path: '../../.env' });

console.log('DB_NAME:', process.env.DB_NAME);

const main = async () => {
  try {
    // Conectar a la base de datos
    await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

    const users = await User.find();
    console.log(users);

    /************************
    UPDATE ALL USERS WITH NEW PARAM
    **************************/
    const result = await User.updateMany({}, { isPremium: true });
    
    console.log('Resultado de la actualización:', result);

  } catch (err) {
    console.error('Error actualizando los usuarios:', err);
  } finally {
    mongoose.connection.close();
  }
};

main().catch((err) => {
  console.error('Error ejecutando el script:', err);
  mongoose.connection.close();
});