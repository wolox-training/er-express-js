const { registerUser } = require('../services/user');
const { encriptPassword } = require('../helpers/user');
const logger = require('../logger');

exports.createUser = async (req, res, next) => {
  try {
    logger.info(`createUser controller start, request: ${req.body}`);
    const { name, lastName, email } = req.body;
    const password = await encriptPassword(req.body.password);
    const user = await registerUser(name, lastName, email, password);
    logger.info('user created');
    return res.status(201).json({ name: user.name, lastName: user.lastName, email: user.email });
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};
