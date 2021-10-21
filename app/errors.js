const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.HASH_ERROR = 'bycript_error';
exports.hashError = message => internalError(message, exports.HASH_ERROR);

exports.WEET_API_ERROR = 'api_error';
exports.weetApiError = message => internalError(message, exports.WEET_API_ERROR);

exports.REQUEST_ERROR = 'request_error';
exports.requestError = message => internalError(message, exports.REQUEST_ERROR);

exports.TOKEN_ERROR = 'token_error';
exports.tokenError = message => internalError(message, exports.TOKEN_ERROR);
