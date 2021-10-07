const { registerUser, validateUser } = require('../services/user');
const { verifyEmail, verifyPassword, encriptPassword } = require('../helpers/user');
const logger = require('../logger');

exports.createUser = async (req, res, next) => {
  try {
    const { name, last_name, email } = req.body;
    await verifyEmail(email);
    await validateUser(email);
    await verifyPassword(req.body.password);
    const password = await encriptPassword(req.body.password);
    const user = await registerUser(name, last_name, email, password);
    return res
      .status(201)
      .json({ name: user.name, last_name: user.last_name, email: user.email, password: user.password });
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};
