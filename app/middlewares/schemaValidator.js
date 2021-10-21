const { validationResult } = require('express-validator');
const { requestError } = require('../errors');

exports.schemaValidations = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(requestError(errors.mapped()));
  }
  return next();
};
