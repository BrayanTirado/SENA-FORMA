const express = require('express');
const router = express.Router();
const { login, register, cambiarContrasena, recuperarContrasena } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

router.post('/login', login);
router.post('/register', register); // Público, no necesita verifyToken
router.post('/cambiar-contrasena', verifyToken, cambiarContrasena);
router.post('/recuperar', recuperarContrasena);

module.exports = router;
