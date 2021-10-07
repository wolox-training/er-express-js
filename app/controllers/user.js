const { registerUser } = require('../services/user');
const { verifyEmail, verifyPassword, encriptPassword } = require('../helpers/user');
const logger = require('../logger');

exports.createUser = async (req, res, next) => {
  try {
    const { nombre, apellido, email } = req.body;
    await verifyEmail(email);
    await verifyPassword(req.body.contraseña);
    // if (!pwd) res.status(422).json('La contraseña debe tener minimo 8 caracteres y ser alfanumerica');
    const password = await encriptPassword(req.body.contraseña);
    const { nombre: name, email: em } = await registerUser(nombre, apellido, email, password);
    // console.log(name, em);
    return res.status(201).json({ name, em });
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};
