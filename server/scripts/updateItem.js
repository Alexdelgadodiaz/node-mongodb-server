const mongoose = require('mongoose');
const Item = require('../models/itemModel'); // Ajusta la ruta según donde esté el modelo
require('dotenv').config({ path: '../../.env' });

console.log('DB_NAME:', process.env.DB_NAME);

const main = async () => {
  try {
    // Conecta a la base de datos
    await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`, {
      useUnifiedTopology: true,
    });

    // Ejemplo: actualizar todos los ítems premium a exclusive
    const result = await Item.updateMany(
      { isPremium: true }, // Filtro: ítems que sean premium
      { type: 'exclusive' } // Cambiar su tipo a exclusive
    );

    console.log(`Ítems actualizados: ${result.modifiedCount}`);
  } catch (err) {
    console.error('Error actualizando ítems:', err);
  } finally {
    mongoose.connection.close();
  }
};

main().catch((err) => {
  console.error('Error ejecutando el script:', err);
  mongoose.connection.close();
});