const { user } = require('../models/index');
const logger = require('../logger');
const { databaseError } = require('../errors');
const { DB_ERROR } = require('../../config/messageError');

exports.registerUser = async (name, lastName, email, password) => {
  try {
    const createUser = await user.create({
      name,
      lastName,
      email,
      password
    });
    return createUser;
  } catch (error) {
    logger.error(error.message);
    throw databaseError(DB_ERROR);
  }
};

exports.findUserByEmail = async email => {
  try {
    const userExist = await user.findOne({ where: { email } });
    logger.info('find user');
    return userExist;
  } catch (error) {
    logger.error(error.message);
    throw databaseError(DB_ERROR);
  }
};
