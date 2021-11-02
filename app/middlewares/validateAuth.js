const jwt = require('jsonwebtoken');
const logger = require('../logger');
const config = require('../../config').common;
const { authError, authorizationError } = require('../errors');
const { AUTH_ERROR, AUTHORIZATION_ERROR } = require('../../config/messageError');

exports.validateAuth = (req, res, next) => {
  try {
    logger.info(`middleware Auth start, request: ${req.headers.token}`);
    const { token } = req.headers;
    if (!token) return next(authError(AUTH_ERROR));
    const payload = jwt.verify(token, config.session.keyToken, (err, decoded) => {
      if (!err) return decoded;
      logger.error(err.message);
      return next(authError(AUTH_ERROR));
    });
    if (payload) return next();
    throw authorizationError(AUTHORIZATION_ERROR);
  } catch (error) {
    logger.error(error);
    throw authorizationError(AUTHORIZATION_ERROR);
  }
};
