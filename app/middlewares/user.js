const { checkSchema, validationResult } = require('express-validator');

exports.dataUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  return next();
};

exports.schemaUser = checkSchema({
  password: {
    exists: true,
    errorMessage: 'Password is required',
    isLength: {
      errorMessage: 'Password should be at least 8 chars long',
      options: { min: 8 }
    }
  },
  email: {
    exists: true,
    errorMessage: 'Email is required',
    isEmail: {
      errorMessage: 'Email is invalid',
      bail: true
    }
  },
  name: {
    exists: true,
    errorMessage: 'name is required'
  },
  lastName: {
    exists: true,
    errorMessage: 'lastName is required'
  }
});
