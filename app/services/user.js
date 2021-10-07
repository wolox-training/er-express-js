const { user } = require('../models/index');
const logger = require('../logger');
const { databaseError, userError } = require('../errors');
const { DB_ERROR, USER_ERROR } = require('../../config/messageError');

exports.registerUser = async (name, last_name, email, password) => {
  try {
    const createUser = await user.create({
      name,
      last_name,
      email,
      password
    });
    return createUser;
  } catch (error) {
    logger.error(error.message);
    throw databaseError(DB_ERROR);
  }
};

exports.validateUser = async email => {
  try {
    const userExist = await user.findOne({ where: { email } });
    if (userExist) throw userError(USER_ERROR);
  } catch (error) {
    logger.error(error.message);
    throw userError(USER_ERROR);
  }
};
