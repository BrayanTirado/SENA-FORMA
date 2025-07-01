require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

function generarContrasenaAleatoria(length = 10) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
  let contrasena = '';
  for (let i = 0; i < length; i++) {
    contrasena += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return contrasena;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// LOGIN
const login = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const user = await prisma.usuario.findUnique({ where: { correo } });
    if (!user) return res.status(401).json({ message: 'Correo inválido' });

    const match = await bcrypt.compare(contrasena, user.contrasena);
    if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({
      token,
      cambiarContrasena: false, // Ajusta si usas cambiar_contrasena
      usuario: {
        id: user.id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        correo: user.correo,
        rol: user.rol,
      },
    });
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ message: 'Error interno al iniciar sesión' });
  }
};

// REGISTER
const register = async (req, res) => {
  const { nombres, apellidos, correo, rol } = req.body;

  try {
    if (!Object.values(['coordinador', 'instructor', 'aprendiz']).includes(rol)) {
      return res.status(400).json({ message: 'Rol no válido' });
    }

    const existingUser = await prisma.usuario.findUnique({ where: { correo } });
    if (existingUser) return res.status(400).json({ message: 'Correo ya registrado' });

    const defaultPassword = generarContrasenaAleatoria();
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nombres,
        apellidos,
        correo,
        contrasena: hashedPassword,
        rol, // Usa el enum directamente
      },
    });

    await transporter.sendMail({
      from: `"Sistema SENA" <${process.env.EMAIL_USER}>`,
      to: correo,
      subject: 'Bienvenido al Sistema SENA',
      text: `Bienvenido ${nombres} ${apellidos},\n\nTu cuenta ha sido creada. Usa estas credenciales:\nUsuario: ${correo}\nContraseña: ${defaultPassword}\nCambia tu contraseña al iniciar sesión.\n\n[Mensaje legal omitido por brevedad]`,
    });

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      usuario: {
        id: usuario.id,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error('❌ Error en register:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

// RECUPERAR CONTRASEÑA
const recuperarContrasena = async (req, res) => {
  const { correo } = req.body;

  try {
    const user = await prisma.usuario.findUnique({ where: { correo } });
    if (!user) return res.status(404).json({ message: 'Correo no encontrado' });

    const nuevaPassword = generarContrasenaAleatoria();
    const hashedPassword = await bcrypt.hash(nuevaPassword, 10);

    await prisma.usuario.update({
      where: { id: user.id },
      data: { contrasena: hashedPassword },
    });

    await transporter.sendMail({
      from: `"Sistema SENA" <${process.env.EMAIL_USER}>`,
      to: correo,
      subject: 'Recuperación de contraseña - Sistema SENA',
      text: `Estimado ${user.nombres} ${user.apellidos},\n\nTu contraseña temporal es: ${nuevaPassword}\nInicia sesión y cámbiala.\n\n[Mensaje legal omitido]`,
    });

    res.json({ message: 'Se envió una nueva contraseña al correo registrado.' });
  } catch (error) {
    console.error('❌ Error en recuperar contraseña:', error);
    res.status(500).json({ message: 'Error al recuperar contraseña' });
  }
};

// CAMBIAR CONTRASEÑA
const cambiarContrasena = async (req, res) => {
  const { id } = req.user;
  const { nuevaContrasena } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
    await prisma.usuario.update({
      where: { id },
      data: { contrasena: hashedPassword },
    });
    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('❌ Error al cambiar contraseña:', error);
    res.status(500).json({ message: 'Error al actualizar contraseña' });
  }
};

module.exports = { login, register, cambiarContrasena, recuperarContrasena };
