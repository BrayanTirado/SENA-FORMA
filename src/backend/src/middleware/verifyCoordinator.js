const verifyCoordinator = (req, res, next) => {
  if (req.user.rol !== 'coordinador') {
    return res.status(403).json({ message: 'Acceso denegado, solo coordinadores' });
  }
  next();
};

module.exports = verifyCoordinator;
