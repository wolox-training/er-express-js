const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.DOMAIN_ERROR = 'domain_error';
exports.domainError = message => internalError(message, exports.ERROR_DOMAIN);

exports.EMAIL_DOMAIN = 'domain_invalid';
exports.emailDomain = message => internalError(message, exports.DOMAIN_ERROR);

exports.PASSWORD_ERROR = 'password_invalid';
exports.passwordError = message => internalError(message, exports.PASSWORD_ERROR);

exports.HASH_ERROR = 'bycript_error';
exports.hashError = message => internalError(message, exports.HASH_ERROR);

exports.USER_ERROR = 'exist_user';
exports.userError = message => internalError(message, exports.USER_ERROR);
