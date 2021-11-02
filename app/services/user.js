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
    return {
      id: createUser.id,
      name: createUser.name,
      lastName: createUser.lastName,
      email: createUser.email,
      role: createUser.role
    };
  } catch (error) {
    logger.error(error.message);
    throw databaseError(DB_ERROR);
  }
};

exports.findUserByEmail = async email => {
  try {
    const findUser = await user.findOne({ where: { email } });
    logger.info('find user');
    return findUser;
  } catch (error) {
    logger.error(error.message);
    throw databaseError(DB_ERROR);
  }
};

exports.getAllUsers = async (offset, limit) => {
  try {
    const users = await user.findAll({ offset, limit });
    logger.info('get users');
    return users;
  } catch (error) {
    logger.error(error);
    throw databaseError(DB_ERROR);
  }
};

exports.userAdmin = async (name, lastName, email, password) => {
  try {
    const userExist = await this.findUserByEmail(email);
    if (userExist) {
      const userAdmin = await user.update(
        { role: 'admin' },
        { where: { email }, returning: true, plain: true }
      );
      return {
        id: userAdmin[1].dataValues.id,
        name: userAdmin[1].dataValues.name,
        lastName: userAdmin[1].dataValues.lastName,
        email: userAdmin[1].dataValues.email,
        role: userAdmin[1].dataValues.role
      };
    }
    const createUser = await user.create({
      name,
      lastName,
      email,
      password,
      role: 'admin'
    });
    return {
      id: createUser.id,
      name: createUser.name,
      lastName: createUser.lastName,
      email: createUser.email,
      role: createUser.role
    };
  } catch (error) {
    logger.error(error);
    throw databaseError(DB_ERROR);
  }
};
