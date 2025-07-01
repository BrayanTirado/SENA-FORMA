const prisma = require('../config/database');

exports.getAllFichas = async (req, res) => {
  try {
    const fichas = await prisma.ficha.findMany({
      include: {
        programa: true,
        instructor: { select: { nombres: true, apellidos: true } },
        coordinador: { select: { nombres: true, apellidos: true } },
      },
    });
    res.json(fichas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching fichas', error: error.message });
  }
};

exports.deleteFicha = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.ficha.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Ficha eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ficha', error: error.message });
  }
};
