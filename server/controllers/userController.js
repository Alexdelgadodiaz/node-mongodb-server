const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/userModel');


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Generar el token inicial al momento del login
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
        message: 'Inicio de sesión exitoso',
        userId: user._id,
        token,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        isPremium: user.isPremium
    });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

module.exports = { loginUser };