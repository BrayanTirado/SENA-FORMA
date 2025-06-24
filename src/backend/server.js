const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/api/test-connection', async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json({ message: 'Conexión exitosa a Contabo', usuarios });
  } catch (error) {
    res.status(500).json({ error: 'Error de conexión: ' + error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://tu-ip-contabo:${PORT}`));