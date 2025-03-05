const mongoose = require('mongoose');
const User = require('../models/userModel'); // Ajusta la ruta según dónde esté el modelo
require('dotenv').config({ path: '../../.env' });

console.log('DB_NAME:', process.env.DB_NAME);

const main = async () => {
  // Conectar a la base de datos
  await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`, {
  //     useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Crear el usuario "test"
  const testUser = new User({
    name: 'test',
    email: 'test@example.com',
    password: 'pass', // Se cifrará automáticamente gracias al middleware
    role: 'user',
    isPremium:true,
  });

  // Crear el usuario "admin"
  const adminUser = new User({
    name: 'admin',
    email: 'admin@example.com',
    password: 'pass', // Se cifrará automáticamente
    role: 'admin',
    isPremium:true,
  });

  // Guardar ambos usuarios en la base de datos
  await testUser.save();
  await adminUser.save();

  console.log('Usuarios creados exitosamente');
  mongoose.connection.close();
};

main().catch((err) => {
  console.error('Error inicializando usuarios:', err);
  mongoose.connection.close();
});