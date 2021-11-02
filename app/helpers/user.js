const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const logger = require('../logger');
const config = require('../../config').common;
const { hashError, tokenError, requestError } = require('../errors');
const { HASH_ERROR, TOKEN_ERROR, SESSION_ERROR } = require('../../config/messageError');

exports.encriptPassword = pwd => {
  try {
    logger.info('password encript');
    return bcrypt.hash(pwd, parseInt(config.bcrypt.lengthHash));
  } catch (error) {
    logger.error(error.message);
    throw hashError(HASH_ERROR);
  }
};

exports.validatePassword = async (userPassword, password) => {
  try {
    logger.info('password validate');
    const match = await bcrypt.compare(password, userPassword);
    if (match) return logger.info('validate password success');
    throw requestError(SESSION_ERROR);
  } catch (error) {
    logger.error(error.message);
    throw requestError(SESSION_ERROR);
  }
};

exports.createToken = (id, name, email, role) => {
  try {
    logger.info('creating token');
    const payload = {
      id,
      name,
      email,
      role,
      iat: moment().unix(),
      exp: moment()
        .add(config.session.timeToken, 'hours')
        .unix()
    };
    logger.info('token created');
    return jwt.sign(payload, config.session.keyToken);
  } catch (error) {
    logger.error(error.message);
    throw tokenError(TOKEN_ERROR);
  }
};
