require('dotenv').config({ path: '../.env' });

const morgan = require('morgan');
const express = require('express');
const connectDB = require('./db/database');
const apiRoutes = require('./routes/index');

const app = express();
app.use(morgan('combined'));

const PORT = 3000;

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(express.json());

// Usar las rutas
app.use('/api', apiRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});