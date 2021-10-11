const bcrypt = require('bcryptjs');
const logger = require('../logger');
const { emailError, passwordError, hashError } = require('../errors');
const { EMAIL_ERROR, PASSWORD_ERROR, HASH_ERROR } = require('../../config/messageError');

exports.verifyEmail = email => {
  try {
    const verify = /^\w+([\\.-]?\w+)*@(?:|wolox)\.(?:|co)+$/;
    if (verify.test(email)) return logger.info('validated email domain');
    logger.error(EMAIL_ERROR);
    throw emailError(EMAIL_ERROR);
  } catch (error) {
    logger.error(error.message);
    throw emailError(EMAIL_ERROR);
  }
};
exports.verifyPassword = pwd => {
  try {
    const password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (password.test(pwd)) return logger.info('validated password');
    logger.error(PASSWORD_ERROR);
    throw passwordError(PASSWORD_ERROR);
  } catch (error) {
    logger.error(error.message);
    throw passwordError(PASSWORD_ERROR);
  }
};

exports.encriptPassword = pwd => {
  try {
    logger.info('password encript');
    return bcrypt.hash(pwd, parseInt(process.env.LENGTH_HASH));
  } catch (error) {
    logger.error(error.message);
    throw hashError(HASH_ERROR);
  }
};
