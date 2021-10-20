const bcrypt = require('bcryptjs');
const logger = require('../logger');
const { hashError } = require('../errors');
const { HASH_ERROR } = require('../../config/messageError');

exports.encriptPassword = pwd => {
  try {
    logger.info('password encript');
    return bcrypt.hash(pwd, parseInt(process.env.LENGTH_HASH));
  } catch (error) {
    logger.error(error.message);
    throw hashError(HASH_ERROR);
  }
};
