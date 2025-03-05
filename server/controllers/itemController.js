const mongoose = require('mongoose');
const Item = require('../models/itemModel');

const getAllItems = async (req, res) => {
  try {
    // Recuperar todos los ítems de la base de datos
    const items = await Item.find();

    // Ahora puedes devolver el nuevo token junto con los ítems
    res.status(200).json({
      message: 'Ítems recuperados con éxito',
      items,
      token: req.newToken, // Aquí está el token actualizado
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los ítems', error });
  }
};

module.exports = { getAllItems };