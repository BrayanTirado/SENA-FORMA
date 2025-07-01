const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient(); // ❌ sin opciones, seguro y estable

module.exports = prisma;

