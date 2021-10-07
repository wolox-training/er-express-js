const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.ERROR_DOMAIN = 'domain_error';
exports.errorDomain = message => internalError(message, exports.ERROR_DOMAIN);

exports.EMAIL_DOMAIN = 'domain_invalid';
exports.emailDomain = message => internalError(message, exports.EMAIL_DOMAIN);

exports.ERROR_PASSWORD = 'password_invalid';
exports.errorPassword = message => internalError(message, exports.ERROR_PASSWORD);

exports.ERROR_HASH = 'bycript_error';
exports.errorHash = message => internalError(message, exports.ERROR_HASH);
