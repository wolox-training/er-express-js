const jwt = require('jsonwebtoken');
const moment = require('moment');
const logger = require('../logger');
const config = require('../../config').common;
const { authError, authorizationError } = require('../errors');
const { AUTH_ERROR, AUTHORIZATION_ERROR } = require('../../config/messageError');

exports.validateAuth = (req, res, next) => {
  try {
    logger.info(`middleware Auth start, request: ${req.headers.token}`);
    const { token } = req.headers;
    const payload = jwt.decode(token, config.session.keyToken);
    if (!req.headers.token) return next(authError(AUTH_ERROR));
    else if (payload.exp <= moment().unix()) return next(authError(AUTH_ERROR));
    else if (payload.role === 'admin') return next();
    throw authorizationError(AUTHORIZATION_ERROR);
  } catch (error) {
    logger.error(error);
    throw authorizationError(AUTHORIZATION_ERROR);
  }
};
