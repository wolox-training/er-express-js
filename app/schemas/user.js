const { checkSchema } = require('express-validator');
const { EMAIL_ERROR, USER_ERROR } = require('../../config/messageError');
const { findUserByEmail } = require('../services/user');

exports.schemaUser = checkSchema({
  password: {
    exists: {
      errorMessage: 'Password is required'
    },
    isAlphanumeric: true,
    matches: {
      options: /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/,
      errorMessage: 'The password must be alphanumeric'
    },
    isLength: {
      errorMessage: 'Password should be at least 8 chars long',
      options: { min: 8 }
    }
  },
  email: {
    custom: {
      options: value =>
        findUserByEmail(value).then(user => {
          if (user) throw new Error(USER_ERROR);
        })
    },
    exists: {
      errorMessage: 'Email is required'
    },
    matches: {
      options: /^\w+([\\.-]?\w+)*@(?:|wolox)\.(?:|co)+$/,
      errorMessage: EMAIL_ERROR
    },
    isEmail: {
      bail: true
    }
  },
  name: {
    exists: {
      errorMessage: 'name is required'
    }
  },
  lastName: {
    exists: {
      errorMessage: 'lastName is required'
    }
  }
});
