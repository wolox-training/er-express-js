const { User } = require('../models/index');
const logger = require('../logger');
const { databaseError } = require('../errors');
const { DB_ERROR } = require('../../config/messageError');

exports.registerUser = async (nombre, apellido, email, contraseña) => {
  try {
    const user = await User.create({
      nombre,
      apellido,
      email,
      contraseña
    });
    return user;
  } catch (error) {
    logger.error(error.message);
    throw databaseError(DB_ERROR);
  }
};
