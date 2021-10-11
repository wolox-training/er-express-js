const { registerUser, validateUser } = require('../services/user');
const { verifyEmail, verifyPassword, encriptPassword } = require('../helpers/user');
const logger = require('../logger');

exports.createUser = async (req, res, next) => {
  try {
    const { name, lastName, email } = req.body;
    await verifyEmail(email);
    await validateUser(email);
    await verifyPassword(req.body.password);
    const password = await encriptPassword(req.body.password);
    const user = await registerUser(name, lastName, email, password);
    return res
      .status(201)
      .json({ name: user.name, lastName: user.lastName, email: user.email, password: user.password });
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};
