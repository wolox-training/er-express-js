const bcrypt = require('bcryptjs');
const logger = require('../logger');
const { emailDomain, passwordError, hashError } = require('../errors');
const { EMAIL_DOMAIN, PASSWORD_ERROR, HASH_ERROR } = require('../../config/messageError');

exports.verifyEmail = email => {
  try {
    const verify = /^\w+([\\.-]?\w+)*@(?:|wolox)\.(?:|co)+$/;
    if (verify.test(email)) return logger.info('validated email domain');
    logger.error(EMAIL_DOMAIN);
    throw emailDomain(EMAIL_DOMAIN);
  } catch (error) {
    logger.error(error.message);
    throw emailDomain(EMAIL_DOMAIN);
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
    return bcrypt.hash(pwd, 15);
  } catch (error) {
    logger.error(error.message);
    throw hashError(HASH_ERROR);
  }
};
