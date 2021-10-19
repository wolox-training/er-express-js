const { registerUser, findUserByEmail } = require('../services/user');
const {
  verifyEmail,
  verifyPassword,
  encriptPassword,
  validatePassword,
  createToken
} = require('../helpers/user');
const logger = require('../logger');
const { userError, userFindError } = require('../errors');
const { USER_ERROR, USER_FIND_ERROR } = require('../../config/messageError');

exports.createUser = async (req, res, next) => {
  try {
    logger.info('Creating user...');
    const { name, lastName, email } = req.body;
    await verifyEmail(email);
    const userExist = await findUserByEmail(email);
    if (userExist) throw userError(USER_ERROR);
    await verifyPassword(req.body.password);
    const password = await encriptPassword(req.body.password);
    const user = await registerUser(name, lastName, email, password);
    logger.info('user created');
    return res.status(201).json({
      name: user.name,
      lastName: user.lastName,
      email: user.email
    });
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    logger.info('Do signIn');
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) throw userFindError(USER_FIND_ERROR);
    await validatePassword(user.password, password);
    const token = await createToken(user.name, user.email);
    return res.status(200).json(token);
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};
