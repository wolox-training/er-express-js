const bcrypt = require('bcryptjs');
const logger = require('../logger');
const { emailDomain, errorPassword, errorHash } = require('../errors');
const { EMAIL_DOMAIN, ERROR_PASSWORD, ERROR_HASH } = require('../../config/messageError');

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
    logger.error(ERROR_PASSWORD);
    throw errorPassword(ERROR_PASSWORD);
  } catch (error) {
    logger.error(error.message);
    throw errorPassword(ERROR_PASSWORD);
  }
};

exports.encriptPassword = pwd => {
  try {
    return bcrypt.hash(pwd, 15);
  } catch (error) {
    logger.error(error.message);
    throw errorHash(ERROR_HASH);
  }
};
