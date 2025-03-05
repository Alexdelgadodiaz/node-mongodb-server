const express = require('express');
const { loginUser } = require('../controllers/userController');
const { getAllItems } = require('../controllers/itemController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', loginUser);
router.get('/items', authenticate, getAllItems);


// Usar el middleware en rutas que requieren autenticación
router.get('/protected', authenticate, (req, res) => {
  res.status(200).json({ message: 'Acceso permitido' });
});

module.exports = router;