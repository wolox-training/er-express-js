const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.EMAIL_ERROR = 'domain_invalid';
exports.emailError = message => internalError(message, exports.EMAIL_ERROR);

exports.PASSWORD_ERROR = 'password_invalid';
exports.passwordError = message => internalError(message, exports.PASSWORD_ERROR);

exports.HASH_ERROR = 'bycript_error';
exports.hashError = message => internalError(message, exports.HASH_ERROR);

exports.USER_ERROR = 'exist_user';
exports.userError = message => internalError(message, exports.USER_ERROR);

exports.WEET_API_ERROR = 'api_error';
exports.weetApiError = message => internalError(message, exports.WEET_API_ERROR);
