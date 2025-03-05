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

    // Precarga de ítems
    const items = [
      { title: 'Item 1', itemDescription: 'Descripción del Item 1', isPremium: false, type: 'free' },
      { title: 'Item 2', itemDescription: 'Descripción del Item 2', isPremium: true, type: 'premium' },
      { title: 'Item 3', itemDescription: 'Descripción del Item 3', isPremium: false, type: 'free' },
      { title: 'Item 4', itemDescription: 'Descripción del Item 4', isPremium: true, type: 'premium' },
      { title: 'Item 5', itemDescription: 'Descripción del Item 5', isPremium: true, type: 'exclusive' },
    ];

    // Guardar los ítems en la base de datos
    await Item.insertMany(items);
    console.log('Ítems precargados exitosamente.');
  } catch (err) {
    console.error('Error precargando ítems:', err);
  } finally {
    mongoose.connection.close();
  }
};

main().catch((err) => {
  console.error('Error ejecutando el script:', err);
  mongoose.connection.close();
});