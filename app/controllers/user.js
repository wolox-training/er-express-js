const { registerUser, findUserByEmail } = require('../services/user');
const { verifyEmail, verifyPassword, encriptPassword } = require('../helpers/user');
const logger = require('../logger');
const { userError } = require('../errors');
const { USER_ERROR } = require('../../config/messageError');

exports.createUser = async (req, res, next) => {
  try {
    const { name, lastName, email } = req.body;
    await verifyEmail(email);
    const userExist = await findUserByEmail(email);
    if (userExist) throw userError(USER_ERROR);
    await verifyPassword(req.body.password);
    const password = await encriptPassword(req.body.password);
    const user = await registerUser(name, lastName, email, password);
    logger.info('user created');
    return res.status(201).json({ name: user.name, lastName: user.lastName, email: user.email });
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};
